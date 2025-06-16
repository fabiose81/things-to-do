import { buildSchema } from "graphql"

const schema = buildSchema(`
                type Suggestion {
                    _id: ID!
                    name: String!
                    description: String!
                    age: String!
                }

                input SuggestionInput {
                    _id: ID
                    name: String!
                    description: String!
                    age: String!
                }
                    
                type InsetItemPayload {
                    success: Boolean!
                    name: String
                    error: String
                }

                type DeleteItemPayload {
                    success: Boolean!
                    _id: ID
                    error: String
                }

                type RootQuery {
                    suggestions: [Suggestion!]!
                }

                type RootMutation {
                    insertSuggestion(suggestions: [SuggestionInput]): [InsetItemPayload]
                    deleteSuggestion(suggestions: [SuggestionInput]): [DeleteItemPayload]
                }

                schema {
                    query: RootQuery
                    mutation: RootMutation
                }
        `);
        
export default schema;