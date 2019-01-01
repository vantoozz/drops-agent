import {Container} from "inversify";

export abstract class ServiceProvider {
    constructor(protected _container: Container) {
    }
}