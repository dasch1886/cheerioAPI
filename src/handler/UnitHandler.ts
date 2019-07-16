import * as express from 'express';
import { unit } from '../models/Unit';
import { notFoundError, internalServerError } from './ErrorHandler';
import { tokenVerify } from '../middleware/Auth';

export const unitRouter = express.Router();

unitRouter.get('/units', tokenVerify, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await unit.find({}).then(
        doc => {
            if (doc.length !== 0) res.json(doc);
            else notFoundError(res);
        },
        err => {
            internalServerError(err, res);
        });
    next();
});