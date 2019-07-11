import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const recipeIngredientSchema = new Schema({
    ingredientId: {
        type: String
    },

    name: {
        type: String,
        required: [true, 'name field is required']
    },

    unitId: {
        type: String
    }
});

const recipeIngredient = mongoose.model('recipeIngredient', recipeIngredientSchema);

export { recipeIngredient, recipeIngredientSchema };