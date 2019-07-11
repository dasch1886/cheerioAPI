import * as express from 'express';

function notFoundError(res: express.Response, next: express.NextFunction) {
    res.status(404).json({ message: 'entries not found' });
    next();
}

function internalServerError(err: any, res: express.Response, next: express.NextFunction) {
    console.error(err);
    res.status(500).json({
        error: err,
    });
    next();
}

export { notFoundError, internalServerError };