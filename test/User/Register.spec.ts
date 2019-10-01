import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { server } from '../../src/Index';
import { expect } from 'chai';

describe('POST /user - register', () => {
    const email = 'test@mail.com';
    const nickname = 'test';
    const password = 'testtest';
    const endPoint = '/api/user';

    it('empty email', (done) => {
        request(server).post(endPoint)
            .send({
                email: '',
                nickname: nickname,
                password: password
            }).then(res => {
                expect(res.status).to.be.equal(400);
                expect(res.body.errors).have.property('email');
                done();
            }).catch(done);
    });

    it('empty nickname', (done) => {
        request(server).post(endPoint)
            .send({
                email: email,
                nickname: '',
                password: password
            }).then(res => {
                expect(res.status).to.be.equal(400);
                expect(res.body.errors).have.property('nickname');
                done();
            }).catch(done);
    });

    it('empty password', (done) => {
        request(server).post(endPoint)
            .send({
                email: email,
                nickname: nickname,
                password: ''
            }).then(res => {
                expect(res.status).to.be.equal(400);
                expect(res.body.errors).have.property('password');
                done();
            }).catch(done);
    });

    it('bad email', (done) => {
        request(server).post(endPoint)
            .send({
                email: 'test@pl',
                nickname: nickname,
                password: password
            }).then(res => {
                expect(res.status).to.be.equal(400);
                expect(res.body.errors).have.property('email')
                    .have.property('kind').to.be.equal('regexp');
                done();
            }).catch(done);
    });

    it('too short password', (done) => {
        request(server).post(endPoint)
        .send({
            email: email,
            nickname: nickname,
            password: 'test'
        }).then(res => {
            expect(res.status).to.be.equal(400);
            expect(res.body.errors).have.property('password')
                .have.property('kind').to.be.equal('minlength');
            done();
        }).catch(done);
    });

    after(async () => {
        await mongoose.connection.close();
        await server.close();
    });
});