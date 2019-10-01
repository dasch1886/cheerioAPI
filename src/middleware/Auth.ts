import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import { user } from '../models/User';
import { notFoundError, internalServerError, unauthorizedAccess } from '../handler/ErrorHandler';

export const tokenPrefix = 'Bearer';

export function passLenghtValidator(pass: string): boolean {
    return pass.length >= 8 ? true : false;
}

export function passwordHash(pass: string): string {
    if (passLenghtValidator(pass)) {
        const salt = bcryptjs.genSaltSync(10);
        return bcryptjs.hashSync(pass, salt);
    } else {
        return pass;
    }
}

export function passwordVerify(pass: string, hash: string): boolean {
    return bcryptjs.compareSync(pass, hash);
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