import {Container} from "inversify";
import {StorageServiceProvider} from "./Storage/StorageServiceProvider";
import {LoggerServiceProvider} from "./Logger/LoggerServiceProvider";
import {ServiceProvider} from "./ServiceProvider";

const container = new Container;

const serviceProviders = [
    LoggerServiceProvider,
    StorageServiceProvider,
];

for (const serviceProvider of serviceProviders) {
    (<ServiceProvider>new serviceProvider(container)).register();
}


export {container};
