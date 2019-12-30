import * as express from 'express';
import { recipe } from '../models/Recipe';
import { notFoundError, internalServerError } from './ErrorHandler';
import { tokenVerify } from '../middleware/Auth';
import { author } from '../models/Author';

export const recipeRouter = express.Router();

recipeRouter.get('/recipes', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await recipe.find({}).then(
        doc => {
            if (doc.length !== 0) res.json({
                listSize: doc.length,
                recipes: doc
            });
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

recipeRouter.get('/recipe', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const id = req.query.id;

    await recipe.findById(id).then(
        doc => {
            if (doc) res.json(doc);
            else notFoundError(res);
        },
        err => {
            internalServerError(err, res);
        }
    );
    next();
});

recipeRouter.post('/recipe/comment', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const id = req.body._id;
    const author = req.body.author;
    const value = req.body.value;

    await recipe.update(
        {
            _id: id
        },
        {
            $push: {
                comments: {
                    author: author,
                    value: value,
                }
            }
        }).then(
            doc => {
                if (doc) res.json({
                    success: true,
                    data: doc
                });
                else notFoundError(res);
            },
            err => {
                internalServerError(err, res);
            }
        );
    next();
});

recipeRouter.get('/recipe/comment', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const id = req.query.id;

    await recipe.findById(id).then(
        doc => {
            if (doc) res.json(doc.get('comments'));
            else notFoundError(res);
        },
        err => {
            internalServerError(err, res);
        }
    );
    next();
});


recipeRouter.get('/recipes/filter', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const text = new RegExp(req.query.text);

    await recipe.find({
        $or: [
            {
                name: {
                    $regex: text
                }
            },
            {
                author: {
                    $regex: text
                }
            },
            {
                desc: {
                    $regex: text
                }
            }
        ]
    }).then(
        doc => {
            if (doc) res.json(doc);
            else notFoundError(res);
        },
        err => {
            internalServerError(err, res);
        }
    );
    next();
});

recipeRouter.get('/recipes/filterAdvanced', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const author = req.query.author ? new RegExp(req.query.author) : '';
    const array = req.query.array ? JSON.parse(req.query.array) : new RegExp('[a-zA-Z0-9]');

    await recipe.find({
        $and: [
            {
                author: {
                    $regex: author
                }
            },
            {
                "ingredients.name": {
                    $in: array
                }
            }
        ]
    }).then(
        doc => {
            if (doc) res.json(doc);
            else notFoundError(res);
        },
        err => {
            internalServerError(err, res);
        }
    );
    next();
});

recipeRouter.get('/recipes/authors', async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    await author.find({}).then(
        doc => {
            if (doc) res.json(doc);
            else notFoundError(res);
        },
        err => {
            internalServerError(err, res);
        }
    );
    next();
});