import {Container} from 'inversify';

export abstract class ServiceProvider {
    constructor(protected container: Container) {
    }

    public abstract register(): void;
}
