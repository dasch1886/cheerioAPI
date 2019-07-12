import * as bcryptjs from 'bcryptjs';

function passwordHash(pass: string): string {
    const salt = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(pass, salt);
}

function passwordVerify(pass: string, hash: string): boolean {
    return bcryptjs.compareSync(pass, hash);
}

export { passwordHash, passwordVerify };