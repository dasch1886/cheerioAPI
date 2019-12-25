import * as express from 'express';
import { user } from '../models/User';
import { internalServerError } from './ErrorHandler';
import { passwordHash, passwordVerify, tokenGenerate, tokenPrefix } from '../middleware/Auth';
import { loginResponse } from '../models/LoginResponse';

export const userRouter = express.Router();

userRouter.post('/user', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const emailValue = req.body.email;
    const nicknameValue = req.body.nickname;
    const passwordValue = req.body.password;

    await user.create({
        email: emailValue,
        password: passwordHash(passwordValue),
        nickname: nicknameValue
    }).then(
        doc => {
            res.status(201).json({
                register: true,
                message: 'register successfully'
            });
        },
        err => {
            res.status(400).json({
                register: false,
                message: err,
            });
        }
    );
    next();
});

userRouter.get('/user', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const loginValue = req.query.login;
    const passwordValue = req.query.password;

    await user.findOne({
        $or: [
            {
                email: loginValue
            },
            {
                nickname: loginValue
            }
        ]
    }).then(
        doc => {
            if (doc) {
                const userValue = doc.toObject();
                if (passwordVerify(passwordValue, userValue.password)) {
                    const response: loginResponse = {
                        nickname: userValue.nickname,
                        token_type: tokenPrefix,
                        access_token: tokenGenerate(userValue.email, userValue.password)
                    }
                    res.json(response);

                } else res.status(400).json({ message: 'email or nickname is invalid' });

            } else res.status(400).json({ message: 'email or nickname is invalid' });
        },
        err => {
            internalServerError(err, res);
        }
    );
    next();
});