import mongoose from 'mongoose';
const { Schema } = mongoose;

const SuggestionSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        age: {
            type: String,
            required: true
        }    
})

SuggestionSchema.index({ name: 1, age: 1 }, { unique: true });

export default SuggestionSchema;