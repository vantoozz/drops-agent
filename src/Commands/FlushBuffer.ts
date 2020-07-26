import {inject, injectable} from 'inversify'
import 'reflect-metadata';
import {LoggerInterface, LoggerType} from '../Logger/LoggerInterface';
import {BufferedStorageInterface, BufferedStorageType} from "../Storage/BufferedStorageInterface";

@injectable()
export class FlushBuffer {

    constructor(
        @inject(BufferedStorageType) private readonly storage: BufferedStorageInterface,
        @inject(LoggerType) private readonly logger: LoggerInterface,
    ) {
    }

    public handle(): void {
        this.logger.debug(`Flushing message buffer`);
        this.storage.flush().catch((e) => {
            this.logger.error(e.toString());
        });
    }
}
