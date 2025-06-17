import { Constants } from '../../utils/Constants'

export const BodyRequest = (param, action) => {

    var query;
    switch (action) {
        case Constants.INSERT: {
            query = `mutation InsertSuggestion($suggestion: [SuggestionInput]) {
                    insertSuggestion(suggestion: $suggestion), {
                        success,
                        name,
                        error
                    }
                } `;

            break;
        }
        case Constants.DELETE: {
            query = `mutation DeleteSuggestion($suggestion: [SuggestionInput]) {
                deleteSuggestion(suggestion: $suggestion), {
                    success,
                    _id,
                    error
                }
            }`;

            break;
        }
        case Constants.SCHEDULE: {
            query = `mutation ScheduleSuggestion($suggestion: SuggestionInput) {
                scheduleSuggestion(suggestion: $suggestion), {
                    success,
                    name,
                    date,
                    error
                }
            }`;
            break;
        }
        default: {
            query = `query { 
                suggestions {
                   _id,
                   name,
                   description,
                   age,
                   date
                }
            }`;
        }
    }

    return JSON.stringify({
        query,
        variables: {
            suggestion: param
        }
    })
}