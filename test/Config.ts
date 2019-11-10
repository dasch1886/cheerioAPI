import * as request from 'supertest';
import { server } from '../src/Index';

export const loginData = {
    email: 'test@mail.com',
    nickname: 'test',
    password: 'testtest',
};

export function getToken() {
    return request(server).get('/api/user')
        .send({
            login: loginData.nickname,
            password: loginData.password
        }).then(res => {
            return res.body.access_token;
        });
};