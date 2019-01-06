import {LoggerInterface} from "./LoggerInterface";

export class Labeled implements LoggerInterface {

    constructor(private readonly _logger: LoggerInterface) {
    }

    debug(message: string): void {
        this._logger.debug('[DEBUG] ' + message);
    }

    error(message: string): void {
        this._logger.error('[ERROR] ' + message);
    }

    info(message: string): void {
        this._logger.info('[INFO] ' + message);
    }

    warn(message: string): void {
        this._logger.warn('[WARN] ' + message);
    }
}