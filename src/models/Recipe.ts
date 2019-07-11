import * as mongoose from 'mongoose';
import { recipeIngredientSchema } from './RecipeIngredient'

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name field is required']
    },

    author: {
        type: String
    },

    description: {
        type: String
    },

    recipeIngredientSet: {
        type: [recipeIngredientSchema]
    }
});

const recipe = mongoose.model('recipe', recipeSchema);

export { recipe };