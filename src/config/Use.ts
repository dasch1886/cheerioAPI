import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { requestLogger } from './RequestsLogger';
import { ingredientRouter } from '../handler/IngredientHandler';
import { unitRouter } from '../handler/UnitHandler';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger);
app.use('/api', ingredientRouter, unitRouter);

export { app }; 