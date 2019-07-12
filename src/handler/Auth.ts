import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import { user } from '../models/User';
import { notFoundError, internalServerError } from './ErrorHandler';

const tokenPrefix = 'Bearer'

function passwordHash(pass: string): string {
    const salt = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(pass, salt);
}

function passwordVerify(pass: string, hash: string): boolean {
    return bcryptjs.compareSync(pass, hash);
}

function tokenGenerate(email: string, key: string): string {
    return jwt.sign(
        {
            email: email,
        },
        key,
        {
            expiresIn: '1min'
        });
}

function tokenVerify(req: express.Request, res: express.Response, next: express.NextFunction) {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const bearerToken = bearerHeader.split(' ')[1];
        user.findOne({
            nickname: req.body.nickname
        }, (err, doc) => {
            if (err) {
                internalServerError(err, res);
            } else {
                if (doc) {
                    jwt.verify(bearerToken, doc.toObject().password, (err) => {
                        if (err) {
                            res.status(401).json({ message: 'unauthorized access' });
                        } else {
                            next();
                        }
                    });
                } else {
                    notFoundError(res);
                }
            }
        });
    }
}

export { passwordHash, passwordVerify, tokenGenerate, tokenPrefix, tokenVerify };