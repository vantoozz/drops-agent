import {container} from './bootstrap';
import {StoreMessage} from './Commands/StoreMessage';
import {LoggerInterface, LoggerType} from './Logger/LoggerInterface';
import {AddressInfo} from 'net';

const command = container.resolve(StoreMessage);
const logger = <LoggerInterface>container.get(LoggerType);

const server = require('dgram').createSocket('udp4');

server.on('error', (e) => {
    logger.error(e.toString());
    server.close();
    throw e;
});

server.on('listening', () => {
    const address = <AddressInfo>server.address();
    logger.info(`Listening for UDP at ${address.address}:${address.port} (${address.family})`);
});

server.on('message', (input: Uint8Array) => {
    // logger.debug(`Message got: ${input.toString()}`);
    command.handle(input.toString());
});

server.bind(Number(process.env.UDP_PORT));
