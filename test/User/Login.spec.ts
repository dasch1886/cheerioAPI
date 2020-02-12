import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { server } from '../../src/Index';
import { expect } from 'chai';
import { tokenPrefix } from '../../src/middleware/Auth';
import { loginData } from '../Config';

// describe('GET /user - login', () => {
//     const endPoint = '/api/user';

//     it('empty login', (done) => {
//         request(server).get(endPoint)
//             .send({
//                 login: '',
//                 password: loginData.password
//             }).then(res => {
//                 expect(res.status).to.be.equal(400);
//                 expect(res.body).have.property('message');
//                 done();
//             }).catch(done);
//     });

//     it('empty password', (done) => {
//         request(server).get(endPoint)
//             .send({
//                 login: loginData.nickname,
//                 password: ''
//             }).then(res => {
//                 expect(res.status).to.be.equal(400);
//                 expect(res.body).have.property('message');
//                 done();
//             }).catch(done);
//     });

//     it('sign in by nickname', (done) => {
//         request(server).get(endPoint)
//             .send({
//                 login: loginData.nickname,
//                 password: loginData.password
//             }).then(res => {
//                 expect(res.status).to.be.equal(200);
//                 expect(res.body).have.property('nickname');
//                 expect(res.body).have.property('token_type');
//                 expect(res.body).have.property('access_token');
//                 expect(res.body.nickname).to.be.equal(loginData.nickname);
//                 expect(res.body.token_type).to.be.equal(tokenPrefix);
//                 done();
//             }).catch(done);
//     });

//     it('sign in by email', (done) => {
//         request(server).get(endPoint)
//             .send({
//                 login: loginData.email,
//                 password: loginData.password
//             }).then(res => {
//                 expect(res.status).to.be.equal(200);
//                 expect(res.body).have.property('nickname');
//                 expect(res.body).have.property('token_type');
//                 expect(res.body).have.property('access_token');
//                 expect(res.body.nickname).to.be.equal(loginData.nickname);
//                 expect(res.body.token_type).to.be.equal(tokenPrefix);
//                 done();
//             }).catch(done);
//     });

//     after(async () => {
//         await mongoose.connection.close();
//         await server.close();
//     });
// });