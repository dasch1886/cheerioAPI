import * as express from 'express';
import { unit } from '../models/Unit';
import { notFoundError, internalServerError } from './ErrorHandler';
import { tokenVerify } from './Auth';

const unitRouter = express.Router();

unitRouter.get('/units', tokenVerify, async (req: express.Request, res: express.Response) => {
    await unit.find({}, (err, doc) => {
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

export { unitRouter };