import { graphqlHTTP } from 'express-graphql';
import schema  from './schema/suggestion.schema.js'
import resolver from './resolvers/suggestion.resolver.js'

export class GragphqlClient {

    app: any;

    constructor(app) {
        this.app = app;
    }

    async start() {
        this.app.use('/graphql', graphqlHTTP({
            schema: schema,
            rootValue: resolver,
            graphiql: true
        }));
    }
}