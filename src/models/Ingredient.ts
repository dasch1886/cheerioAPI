import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name field is required']
    }
});

const ingredient = mongoose.model('ingredient', ingredientSchema)

export { ingredient };