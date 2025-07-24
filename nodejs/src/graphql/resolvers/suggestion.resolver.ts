import SuggestionModel from '../../db/model/suggestion.model.js';
import { Lambda } from '../../aws/lambda.js';

const resolver = {
    suggestions() {
        lambdaClient().track('List suggestions');
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
        lambdaClient().track('Insert suggestions');
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
        lambdaClient().track('Delete suggestions');
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
        lambdaClient().track('Schedule suggestions');
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

const lambdaClient = () => {
    return new Lambda(process.env.AWS_PROFILE);
}

export default resolver;