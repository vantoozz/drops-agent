import {ServiceProvider} from "../ServiceProvider";
import {Client} from "elasticsearch";

export class ElasticsearchServiceProvider extends ServiceProvider {

    public register(): void {
        this._container.bind(Client).toDynamicValue(() => {
            return new Client({
                host: process.env.ELASTICSEARCH_URL
            });
        });
    }
}
