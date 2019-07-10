import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const registerSchema = new Schema({
    email: {
        type: String,
        required: [true, 'name field is required'],
        match: [emailRegExp]
    },

    password: {
        type: String,
        required: [true, 'password field is required']
    },

    nickname: {
        type: String,
        required: [true, 'nickname field is required']
    }
});

const register = mongoose.model('register', registerSchema);

export { register };