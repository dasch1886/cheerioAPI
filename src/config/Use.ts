import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { requestLogger } from './RequestsLogger';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger);

export { app }; 