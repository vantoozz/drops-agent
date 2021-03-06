import {StorageInterface} from './StorageInterface';
import {ServiceProvider} from '../ServiceProvider';
import {interfaces} from 'inversify';
import {Logged} from './Logged';
import {LoggerType} from '../Logger/LoggerInterface';
import {Buffered} from './Buffered';
import {ElasticsearchStorage} from './ElasticsearchStorage';
import {Client} from 'elasticsearch';
import {DummyStorage} from './DummyStorage';
import {BufferedStorageType} from "./BufferedStorageInterface";
import Context = interfaces.Context;

export class StorageServiceProvider extends ServiceProvider {

    public register(): void {
        this.container.bind(BufferedStorageType).toDynamicValue((context: Context) => {

            let storage: StorageInterface;

            storage = StorageServiceProvider.makeStorage(
                String(process.env.STORAGE_DRIVER),
                context
            );

            storage = new Logged(storage, context.container.get(LoggerType));

            return new Buffered(storage, Number(process.env.BUFFER_MAX_SIZE) || 1000);
        }).inSingletonScope();
    }

    private static makeStorage(driver: string, context: Context): StorageInterface {
        if ('elasticsearch' === driver) {
            return new ElasticsearchStorage(
                new Client({host: process.env.ELASTICSEARCH_URL}),
                String(process.env.ELASTICSEARCH_INDEX)
            );
        }

        return context.container.resolve(DummyStorage);
    }
}
