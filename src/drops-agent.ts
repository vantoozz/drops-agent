import {Message} from "./Message";
import {StoreMessage} from "./Commands/StoreMessage";
import {container} from "./bootstrap";
import dgram = require("dgram");

const command = container.resolve(StoreMessage);

const server = dgram.createSocket('udp4');

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('listening', () => {
    const address = server.address();
    console.log(address);
});

server.on('message', (msg) => {
    command.handle(new Message(msg.toString('utf8'), new Date));
});

server.bind(41234);
