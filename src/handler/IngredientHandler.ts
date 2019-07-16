import * as express from 'express';
import { ingredient } from '../models/Ingredient';
import { notFoundError, internalServerError } from './ErrorHandler';
import { tokenVerify } from '../middleware/Auth';

export const ingredientRouter = express.Router();

ingredientRouter.get('/ingredients', tokenVerify, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await ingredient.find({}).then(
        doc => {
            if (doc.length !== 0) res.json(doc);
            else notFoundError(res);
        },
        err => {
            internalServerError(err, res);
        }
    );
    next();
});

ingredientRouter.post('/ingredients', tokenVerify, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const name = req.body.name;

    await ingredient.create({
        name: name
    }).then(
        doc => {
            res.status(201).json(doc);
        },
        err => {
            internalServerError(err, res);
        }
    );
    next();
});

ingredientRouter.get('/ingredient', tokenVerify, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const name = req.body.name;

    await ingredient.find({
        'name': {
            '$in': [
                new RegExp(name)
            ]
        }
    }).then(
        doc => {
            if (doc.length !== 0) res.json(doc);
            else notFoundError(res);
        },
        err => {
            internalServerError(err, res);
        }
    );
    next();
});