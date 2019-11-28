import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { requestLogger } from '../middleware/RequestsLogger';
import { ingredientRouter } from '../handler/IngredientHandler';
import { unitRouter } from '../handler/UnitHandler';
import { userRouter } from '../handler/UserHandler';
import { recipeRouter } from '../handler/RecipeHandler';
import { imgRouter } from '../handler/ImgHandler';

export const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger);
app.use('/api', ingredientRouter, unitRouter, userRouter, recipeRouter, imgRouter);