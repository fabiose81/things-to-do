import SuggestionModel from '../../db/model/suggestion.model.js';

const resolver = {
    suggestions() {
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
        args.suggestion.forEach(e => {
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
                    return parse(false, err, e.name);
                }));
        });
        return results;
    },
    deleteSuggestion: args => {
        const results = [];
        args.suggestion.forEach(s => {
            results.push(SuggestionModel.findByIdAndDelete(s._id)
                .then(() => {
                    return parse(true, null, s.name);
                })
                .catch(err => {
                    return parse(false, err, s._id);
                }));
        });
        return results;
    },
    scheduleSuggestion: args => {
        const suggestion = args.suggestion;   
        return SuggestionModel.findByIdAndUpdate(suggestion._id, suggestion)
            .then(() => {
                return {
                    success: true,
                    name: suggestion.name,
                    date: suggestion.date,
                    error: null
                }
            })
            .catch(err => {
                return {
                    success: false,
                    name: suggestion.name,
                    date: suggestion.date,
                    error: err
                }
            })
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