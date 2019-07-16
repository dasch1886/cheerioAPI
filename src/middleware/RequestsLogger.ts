import * as express from 'express';

export const requestLogger = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.info(`${req.method} ${req.originalUrl}`);

    const start = new Date().getTime();
    res.on('finish', () => {
        const end = (new Date().getTime() - start) / 1000;
        console.info(`${req.method} ${req.originalUrl} ${res.statusCode} execute time: ${end} s`);
    });

    next();
};