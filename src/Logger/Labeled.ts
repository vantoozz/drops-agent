import {LoggerInterface} from './LoggerInterface';

export class Labeled implements LoggerInterface {

    constructor(private readonly logger: LoggerInterface) {
    }

    debug(message: string): void {
        this.logger.debug(`[DEBUG] ${message}`);
    }

    error(message: string): void {
        this.logger.error(`[ERROR] ${message}`);
    }

    info(message: string): void {
        this.logger.info(`[INFO] ${message}`);
    }

    warn(message: string): void {
        this.logger.warn(`[WARN] ${message}`);
    }
}
