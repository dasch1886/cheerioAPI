import * as express from 'express';
import { ingredient } from '../models/Ingredient';
import { notFoundError, internalServerError } from './ErrorHandler';

const ingredientRouter = express.Router();

ingredientRouter.get('/ingredients', async (req: express.Request, res: express.Response) => {
    await ingredient.find({}, (err, doc) => {
        if (err) {
            internalServerError(err, res);
        } else {
            if (doc.length !== 0) {
                res.json(doc);
            } else {
                notFoundError(res);
            }
        }
    });
});

ingredientRouter.post('/ingredient', async (req: express.Request, res: express.Response) => {
    await ingredient.create({
        name: req.body.name
    }, (err, doc) => {
        if (err) {
            internalServerError(err, res);
        } else {
            res.status(201).json(doc);
        }
    });
});

ingredientRouter.get('/ingredient', async (req: express.Request, res: express.Response) => {
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
                internalServerError(err, res);
            } else {
                if (doc.length !== 0) {
                    res.json(doc);
                } else {
                    notFoundError(res);
                }
            }
        });
});

export { ingredientRouter };