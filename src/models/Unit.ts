import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const unitSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name field is required']
    }
});

const unit = mongoose.model('unit', unitSchema);

export { unit };