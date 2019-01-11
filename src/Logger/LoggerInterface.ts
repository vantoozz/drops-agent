export interface LoggerInterface {
    error(message: string): void;

    warn(message: string): void;

    info(message: string): void;

    debug(message: string): void;
}

export const LoggerType = Symbol.for('LoggerInterface');
