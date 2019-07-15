import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const recipeIngredientSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name field is required']
    },

    amount: {
        type: String,
        required: [true, 'amount field is required']
    },

    unitName: {
        type: String,
        required: [true, 'unit name field is required']
    }
});