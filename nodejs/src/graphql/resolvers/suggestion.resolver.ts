import SuggestionModel from '../../db/model/suggestion.model.js';

const resolver = {
    suggestions: () => {
        return SuggestionModel.find()
            .then(suggestions => {
                return suggestions.map(suggestion => {
                    return suggestion;
                });
            })
            .catch(err => {
                throw err;
            });
    },
    insertSuggestion: args => {
        const results = [];
        args.suggestions.forEach(e => {
            const suggestion = new SuggestionModel({
                name: e.name,
                description: e.description,
                age: e.age
            })

            results.push(suggestion
                .save()
                .then(res => {
                    return parse(true, null, res.name);
                })
                .catch(err => {
                    return parse(false, err, suggestion.name);
                }));
        });
        return results;
    },
    deleteSuggestion: args => {
        const results = [];
        args.suggestions.forEach(suggestion => {
            results.push(SuggestionModel.findByIdAndDelete(suggestion._id)
                .then(res => {
                    return parse(true, null, suggestion.name);
                })
                .catch(err => {
                    return parse(false, err, suggestion._id);
                }));
        });
        return results;
    }
}

const parse = (success, error, name) => {
    return {
        success: success,
        error: error,
        name: name
    };
}

export default resolver;