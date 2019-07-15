import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const emailRegExp = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'name field is required'],
        match: [emailRegExp],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'password field is required']
    },

    nickname: {
        type: String,
        required: [true, 'nickname field is required'],
        unique: true
    }
});

export const user = mongoose.model('user', userSchema, 'users');