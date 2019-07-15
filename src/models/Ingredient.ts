import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'name field is required'],
        lowercase: true,
        text: true
    }
});

export const ingredient = mongoose.model('ingredient', ingredientSchema, 'ingredients');