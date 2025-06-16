import express, { Express } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { DbConfig } from './db/dbConfig.js';
import { GragphqlClient } from './graphql/graphqlClient.js';
import route from './route/app.route.js';
import cors from 'cors';

dotenv.config();

const PORT = process.env.SERVER_PORT;
const app: Express = express();

app.use(bodyParser.json());
app.use(cors());
route(app);

const dbConfig = new DbConfig();
dbConfig.connect()
.then(() => {
    app.listen(PORT, () => {  
        const gragphqlClient = new GragphqlClient(app);
        gragphqlClient.start();

        return console.log(`Express is listening at http://localhost:${PORT}`);
     });

}).catch(error => console.error(error));