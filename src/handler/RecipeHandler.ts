import * as express from 'express';
import { recipe } from '../models/Recipe';
import { notFoundError, internalServerError } from './ErrorHandler';
import { tokenVerify } from '../middleware/Auth';

export const recipeRouter = express.Router();

recipeRouter.get('/recipes', tokenVerify, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await recipe.find({}).then(
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

recipeRouter.post('/recipe', tokenVerify, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const name = req.body.name;
    const author = req.body.nickname;
    const desc = req.body.desc;
    const ingredients = req.body.ingredients;

    await recipe.create({
        name: name,
        author: author,
        desc: desc,
        ingredients: ingredients
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

recipeRouter.get('/recipe', tokenVerify, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const name = req.body.name;
    const author = req.body.author;
    const desc = req.body.desc;

    await recipe.find({
        $or: [
            {
                name: name
            },
            {
                author: author
            },
            {
                desc: desc
            }
        ]
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