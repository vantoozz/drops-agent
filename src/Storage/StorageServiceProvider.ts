import {StorageInterface, StorageType} from './StorageInterface';
import {DummyStorage} from './DummyStorage';
import {ServiceProvider} from '../ServiceProvider';
import {interfaces} from 'inversify';
import {Logged} from './Logged';
import {LoggerType} from '../Logger/LoggerInterface';
import {Buffered} from './Buffered';
import Context = interfaces.Context;

export class StorageServiceProvider extends ServiceProvider {

    public register(): void {
        this._container.bind(StorageType).toDynamicValue((context: Context) => {
            let storage = <StorageInterface>context.container.resolve(DummyStorage);

            storage = new Logged(storage, context.container.get(LoggerType));
            storage = new Buffered(storage, 5, 4500);

            return storage;
        });
    }
}
