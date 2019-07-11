import * as express from 'express';
import { unit } from '../models/Unit';
import { notFoundError, internalServerError } from './ErrorHandler';

const unitRouter = express.Router();

unitRouter.get('/units', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await unit.find({}, (err, doc) => {
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

export { unitRouter };