import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'name field is required']
    }
});

export const author = mongoose.model('author', authorSchema, 'authors');