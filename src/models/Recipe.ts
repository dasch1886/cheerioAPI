import * as mongoose from 'mongoose';
import { recipeIngredientSchema } from './RecipeIngredient'

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name field is required']
    },

    author: {
        type: String,
        required: [true, 'author field is required']
    },

    desc: {
        type: String,
        required: [true, 'description field is required']
    },

    ingredients: {
        type: [recipeIngredientSchema],
        required: [true, 'ingredients field is required']
    }
});

export const recipe = mongoose.model('recipe', recipeSchema, 'recipes');
