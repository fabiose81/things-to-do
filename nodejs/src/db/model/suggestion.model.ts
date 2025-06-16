import mongoose from 'mongoose';
import SuggestionSchema from '../schema/suggestion.schema.js';

const SuggestionModel = mongoose.model('Suggestion', SuggestionSchema);

export default SuggestionModel;