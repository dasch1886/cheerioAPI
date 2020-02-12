import * as mongoose from 'mongoose';
import { recipeIngredientSchema } from './RecipeIngredient'

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'name field is required'],
        text: true
    },

    author: {
        type: String,
        required: [true, 'author field is required'],
        text: true
    },

    desc: {
        type: String,
        required: [true, 'description field is required'],
        text: true
    },

    ingredients: {
        type: [recipeIngredientSchema],
        required: [true, 'ingredients field is required']
    },

    imgPath: {
        type: String
    },

    executionTime: {
        type: String
    },

    difficultyLevel: {
        type: String
    },

    comments: {
        type: [{
            author: {
                type: String,
                required: [true, 'author field is required']
            },
            value: {
                type: String,
                required: [true, 'value field is required']
            }
        }]
    }
});

export const recipe = mongoose.model('recipe', recipeSchema, 'recipes');
