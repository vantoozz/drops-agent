import {container} from './bootstrap';
import {StoreMessage} from './Commands/StoreMessage';
import {LoggerInterface, LoggerType} from './Logger/LoggerInterface';
import {AddressInfo} from 'net';
import {FlushBuffer} from "./Commands/FlushBuffer";

const storeCommand = container.resolve(StoreMessage);
const flushCommand = container.resolve(FlushBuffer);
const logger = container.get<LoggerInterface>(LoggerType);
const server = require('dgram').createSocket('udp4');

let shuttingDown = false;

const flushInterval = setInterval(() => {
    flushCommand.handle();
}, Number(process.env.BUFFER_FLUSH_INTERVAL_MS) || 1000);

server.on('message', (input: Uint8Array) => {
    if (shuttingDown) {
        return;
    }
    logger.debug(`Message got: ${input.toString()}`);
    storeCommand.handle(input.toString());
});

server.on('listening', () => {
    const address = <AddressInfo>server.address();
    logger.info(`Listening for UDP at ${address.address}:${address.port} (${address.family})`);
});

server.on('error', (e) => {
    logger.error(e.toString());
    server.close();
    throw e;
});

server.on('close', () => {
    logger.info('UDP server stopped');
});

server.bind(Number(process.env.UDP_PORT));

const shutDown = signal => {
    logger.info(`${signal} signal received`);
    shuttingDown = true;
    server.close(() => {
        clearInterval(flushInterval);
        flushCommand.handle();
        process.exit(0);
    });
};

process.on('SIGINT', shutDown);
process.on('SIGTERM', shutDown);

