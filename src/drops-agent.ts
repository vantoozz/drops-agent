import {Message} from './Message';
import {StoreMessage} from './Commands/StoreMessage';
import {container} from './bootstrap';
import {LoggerInterface, LoggerType} from './Logger/LoggerInterface';
import {AddressInfo} from 'net';
import dgram = require('dgram');

const command = container.resolve(StoreMessage);
const logger = <LoggerInterface>container.get(LoggerType);

const server = dgram.createSocket('udp4');

server.on('error', (e) => {
    server.close();
    throw e;
});

server.on('listening', () => {
    const address = <AddressInfo>server.address();
    logger.info(`Listening for UDP at ${address.address}:${address.port} (${address.family})`);
});

server.on('message', (input: Uint8Array) => {
    command.handle(new Message(input.toString(), new Date));
});

server.bind(Number(process.env.UDP_PORT));