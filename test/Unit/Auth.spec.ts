import { passwordHash, passwordVerify, passLenghtValidator, tokenGenerate, tokenVerify, tokenPrefix } from "../../src/middleware/Auth";
import * as jwt from 'jsonwebtoken';
import { expect } from 'chai';

describe('Auth unit tests', () => {

    it('Is password hashed', () => {
        // less than 8 signs isn't hashed
        const wrongPass = 'pass';
        const goodPass = 'goodpass';
        const wrongPassHashed = passwordHash(wrongPass);
        const goodPassHashed = passwordHash(goodPass);

        expect(wrongPassHashed).to.be.a('string');
        expect(wrongPassHashed).to.be.equal(wrongPass);

        expect(goodPassHashed).to.be.a('string');
        expect(goodPassHashed).to.be.not.equal(wrongPass);
    });

    it('Is token good generated', () => {
        const exampleMail = 'example@mail.com';
        const exampleRole = 'user';

        const token = tokenGenerate(exampleMail, exampleRole, 'key');
        const tokenDecoded = jwt.decode(token);

        expect(token).to.be.a('string');
        expect(tokenDecoded).to.be.a('object');
        expect(tokenDecoded).have.property('email');
        expect(tokenDecoded).property('email').to.be.equal(exampleMail);
        expect(tokenDecoded).have.property('role');
        expect(tokenDecoded).property('role').to.be.equal(exampleRole);

    });
});
