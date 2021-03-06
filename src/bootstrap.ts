import {Container} from 'inversify';
import {StorageServiceProvider} from './Storage/StorageServiceProvider';
import {LoggerServiceProvider} from './Logger/LoggerServiceProvider';
import {ServiceProvider} from './ServiceProvider';
import * as Sentry from '@sentry/node';

require('dotenv').config();

Sentry.init({
    dsn: process.env.SENTRY_DSN,
});

const container = new Container;

const serviceProviders = [
    LoggerServiceProvider,
    StorageServiceProvider,
];

for (const serviceProvider of serviceProviders) {
    (<ServiceProvider>new serviceProvider(container)).register();
}


export {container};
