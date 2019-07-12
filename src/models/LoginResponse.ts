import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const loginResponseSchema = new Schema({
    nickname: String,
    token_type: String,
    access_token: String
});

const loginResponse = mongoose.model('loginResponse', loginResponseSchema);

export { loginResponse };