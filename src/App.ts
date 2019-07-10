import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

export { app }; 