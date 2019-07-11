import * as express from 'express';

function notFoundError(res: express.Response) {
    res.status(404).json({ message: 'entries not found' });
}

function internalServerError(err: any, res: express.Response) {
    console.error(err);
    res.status(500).json({
        error: err,
    });
}

export { notFoundError, internalServerError };