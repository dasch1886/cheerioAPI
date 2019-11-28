import * as express from 'express';
import { internalServerError } from './ErrorHandler';
import * as fs from 'fs';
import { imagesPath } from '../scrapper/SplitData';

export const imgRouter = express.Router();

imgRouter.get('/public/:path', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const path = imagesPath + req.params.path;

    try {
        if (fs.existsSync(path)) {
            const data = fs.readFileSync(path, { encoding: 'binary' });
            res.contentType('image/jpeg');
            res.end(data, 'binary');
        }
    } catch (err) {
        internalServerError(err, res);
    }
    next();
});