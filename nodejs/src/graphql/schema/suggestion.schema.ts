import { buildSchema } from "graphql"

const schema = buildSchema(`
                scalar Date

                type Suggestion {
                    _id: ID!
                    name: String!
                    description: String!
                    age: String!
                    date: Date
                }

                input SuggestionInput {
                    _id: ID
                    name: String!
                    description: String!
                    age: String!
                    date: Date
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

                type UpdateItemPayload {
                    success: Boolean!
                    name: String
                    date: Date
                    error: String
                }

                type RootQuery {
                    suggestions: [Suggestion!]!
                }

                type RootMutation {
                    insertSuggestion(suggestion: [SuggestionInput]): [InsetItemPayload]
                    deleteSuggestion(suggestion: [SuggestionInput]): [DeleteItemPayload]
                    scheduleSuggestion(suggestion: SuggestionInput): UpdateItemPayload
                }

                schema {
                    query: RootQuery
                    mutation: RootMutation
                }
        `);
        
export default schema;