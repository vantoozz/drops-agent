import {Container} from "inversify";
import {StorageServiceProvider} from "./Storage/StorageServiceProvider";
import {LoggerServiceProvider} from "./Logger/LoggerServiceProvider";

const container = new Container;

const serviceProviders = [
    LoggerServiceProvider,
    StorageServiceProvider,
];

for (const serviceProvider of serviceProviders) {
    (new serviceProvider(container)).register();
}


export {container};
