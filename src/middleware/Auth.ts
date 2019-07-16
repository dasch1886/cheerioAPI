import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import { user } from '../models/User';
import { notFoundError, internalServerError, unauthorizedAccess } from '../handler/ErrorHandler';

export const tokenPrefix = 'Bearer';

export async function passwordHash(pass: string): Promise<string> {
    const salt = bcryptjs.genSaltSync(10);
    return await bcryptjs.hash(pass, salt);
}

export async function passwordVerify(pass: string, hash: string): Promise<boolean> {
    return await bcryptjs.compare(pass, hash);
}

export function tokenGenerate(email: string, key: string): string {
    return jwt.sign(
        {
            email: email,
        },
        key,
        {
            expiresIn: '1h'
        });
}

export async function tokenVerify(req: express.Request, res: express.Response, next: express.NextFunction) {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const bearerToken = bearerHeader.split(' ')[1];
        const nickname = req.body.nickname;

        await user.findOne({
            nickname: nickname
        }).then(
            doc => {
                if (doc) {
                    jwt.verify(bearerToken, doc.toObject().password, err => {
                        if (err) unauthorizedAccess(res);
                        next();
                    });
                } else {
                    notFoundError(res);
                }
            },
            err => {
                internalServerError(err, res);
            });
    } else {
        unauthorizedAccess(res);
    }
}