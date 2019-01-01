import {Message} from "./Message";
import {StoreMessage} from "./Commands/StoreMessage";
import {container} from "./bootstrap";

const message = new Message('lalala', new Date);
const command = container.resolve<StoreMessage>(StoreMessage);
command.handle(message);
