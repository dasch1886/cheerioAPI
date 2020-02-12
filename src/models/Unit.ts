import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const unitSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name field is required'],
        unique: true,
    }
});

export const unit = mongoose.model('unit', unitSchema, 'units');