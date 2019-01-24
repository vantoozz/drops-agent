import {ServiceProvider} from '../ServiceProvider';
import {LoggerType} from './LoggerInterface';
import * as winston from "winston";
import {WinstonLogger} from "./WinstonLogger";

export class LoggerServiceProvider extends ServiceProvider {

    public register(): void {
        this._container.bind(LoggerType).toDynamicValue(() => {

            const options = require('command-line-args')([
                {name: 'verbose', alias: 'v', type: Boolean}
            ]);

            const winstonLogger = winston.createLogger({
                level: options.verbose ? 'debug' : 'info',
                format: winston.format.json(),
                transports: [
                    new winston.transports.Console({
                        stderrLevels: ['error']
                    })
                ]
            });

            return new WinstonLogger(winstonLogger);
        });
    }
}
