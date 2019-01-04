import {Container} from "inversify";

export abstract class ServiceProvider {
    constructor(protected _container: Container) {
    }

    public abstract register(): void;
}
