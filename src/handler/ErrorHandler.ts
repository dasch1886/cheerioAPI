import * as express from 'express';

export function notFoundError(res: express.Response) {
    res.status(404).json({ message: 'entries not found' });
}

export function internalServerError(err: express.ErrorRequestHandler, res: express.Response) {
    console.error(err);
    res.status(500).json({ error: err });
}

export function unauthorizedAccess(res: express.Response) {
    res.status(401).json({ message: 'unauthorized access' });
}