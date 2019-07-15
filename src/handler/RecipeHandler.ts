import * as express from 'express';
import { recipe } from '../models/Recipe';
import { notFoundError, internalServerError } from './ErrorHandler';
import { tokenVerify } from './Auth';

const recipeRouter = express.Router();

recipeRouter.get('/recipes', tokenVerify, async (req: express.Request, res: express.Response) => {
    await recipe.find({}, (err, doc) => {
        if (err) {
            internalServerError(err, res);
        } else if (doc.length !== 0) {
            res.json(doc);
        } else {
            notFoundError(res);
        }
    });
});

recipeRouter.post('/recipe', tokenVerify, async (req: express.Request, res: express.Response) => {
    const name = req.body.name;
    const author = req.body.nickname;
    const desc = req.body.desc;
    const ingredients = req.body.ingredients;

    await recipe.create({
        name: name,
        author: author,
        desc: desc,
        ingredients: ingredients
    }, (err, doc) => {
        if (err) {
            internalServerError(err, res);
        } else {
            res.status(201).json(doc);
        }
    });
});

recipeRouter.get('/recipe', tokenVerify, async (req: express.Request, res: express.Response) => {
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
    }, (err, doc) => {
        if (err) {
            internalServerError(err, res);
        } else if (doc.length !== 0) {
            res.json(doc);
        } else {
            notFoundError(res);
        }
    });
});

export { recipeRouter };