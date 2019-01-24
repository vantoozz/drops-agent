import {LoggerInterface} from "./LoggerInterface";
import {Logger} from "winston";

export class WinstonLogger implements LoggerInterface {

    constructor(private readonly _winston: Logger) {
    }

    debug(message: string): void {
        this._winston.debug(message);
    }

    error(message: string): void {
        this._winston.error(message);
    }

    info(message: string): void {
        this._winston.info(message);
    }

    warn(message: string): void {
        this._winston.warn(message);
    }

}