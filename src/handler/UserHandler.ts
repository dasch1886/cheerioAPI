import * as express from 'express';
import { user } from '../models/User';
import { internalServerError } from './ErrorHandler';
import { passwordHash, passwordVerify, tokenGenerate, tokenPrefix } from './Auth';

const userRouter = express.Router();

userRouter.post('/user', async (req: express.Request, res: express.Response) => {
    const emailValue = req.body.email;
    const nicknameValue = req.body.nickname;
    const passwordValue = req.body.password;
    await user.create({
        email: emailValue,
        password: passwordHash(passwordValue),
        nickname: nicknameValue
    },
        (err, doc) => {
            if (doc) {
                res.status(201).json({ message: 'register successfully' })
            } else {
                internalServerError(err, res);
            }
        });
});

userRouter.get('/user', async (req: express.Request, res: express.Response) => {
    const loginValue = req.body.login;
    const passwordValue = req.body.password;
    await user.findOne({
        $or: [
            {
                email: loginValue
            },
            {
                nickname: loginValue
            }
        ]
    },
        (err, doc) => {
            if (err) {
                internalServerError(err, res);
            } else {
                if (doc) {
                    const userValue = doc.toObject();
                    if (passwordVerify(passwordValue, userValue.password)) {
                        res.json(
                            {
                                nickname: userValue.nickname,
                                token_type: tokenPrefix,
                                access_token: tokenGenerate(userValue.email, userValue.password)
                            });
                    } else {
                        res.status(400).json({ message: 'invalid password' });
                    }
                } else {
                    res.status(400).json({ message: 'email or nickname is invalid' });
                }
            }
        });
});

export { userRouter };