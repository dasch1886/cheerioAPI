import * as express from 'express';
import { ingredient } from '../models/Ingredient';
import { notFoundError, internalServerError } from './ErrorHandler';

const ingredientRouter = express.Router();

ingredientRouter.get('/ingredients', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await ingredient.find({}, (err, doc) => {
        if (err) {
            internalServerError(err, res, next);
        } else {
            if (doc.length !== 0) {
                res.json(doc);
                next();
            } else {
                notFoundError(res, next);
            }
        }
    });
});

ingredientRouter.post('/ingredient', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await ingredient.create({
        name: req.body.name
    }, (err, doc) => {
        if (err) {
            internalServerError(err, res, next);
        } else {
            res.status(201).json(doc);
            next();
        }
    });
});

ingredientRouter.get('/ingredient', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const param = req.body.name;
    await ingredient.find({
        'name': {
            '$in': [
                new RegExp(param)
            ]
        }
    },
        (err, doc) => {
            if (err) {
                internalServerError(err, res, next);
            } else {
                if (doc.length !== 0) {
                    res.json(doc);
                    next();
                } else {
                    notFoundError(res, next);
                }
            }
        });
});

export { ingredientRouter };