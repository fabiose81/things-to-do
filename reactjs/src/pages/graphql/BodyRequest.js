import { Constants } from '../../utils/Constants'

export const BodyRequest = (suggestionsSelected, action) => {

    var query;

    switch (action) {
        case Constants.INSERT: {
            query = `mutation InsertSuggestion($suggestions: [SuggestionInput]) {
                    insertSuggestion(suggestions: $suggestions),{
                        success,
                        name,
                        error
                    }
                } `;

            break;
        }
        case Constants.DELETE: {
            query = `mutation DeleteSuggestion($suggestions: [SuggestionInput]) {
                deleteSuggestion(suggestions: $suggestions),{
                    success,
                    _id,
                    error
                }
            }`;

            break
        }
        default: {
            query = `query { 
                suggestions {
                   _id,
                   name,
                   description,
                   age
                }
            }`;
        }
    }

    return JSON.stringify({
        query,
        variables: {
            suggestions: suggestionsSelected
        }
    })
}