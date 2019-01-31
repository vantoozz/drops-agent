import {LoggerInterface} from './LoggerInterface';
import {Logger} from 'winston';

export class WinstonLogger implements LoggerInterface {

    constructor(private readonly winston: Logger) {
    }

    debug(message: string): void {
        this.winston.debug(message);
    }

    error(message: string): void {
        this.winston.error(message);
    }

    info(message: string): void {
        this.winston.info(message);
    }

    warn(message: string): void {
        this.winston.warn(message);
    }

}