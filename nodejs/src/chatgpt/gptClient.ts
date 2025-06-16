import OpenAI from 'openai';

export class GptClient {

    openAiClient: OpenAI;
    age: string;

    constructor(age: string) {
        const apiKey = process.env.OPENAI_API_KEY;
        this.openAiClient = new OpenAI({ apiKey });
        this.age = age;
    }

    async search() {
        try {
            const model = process.env.CHAT_GPT_MODEL;
            const content = process.env.CHAT_GPT_MESSAGE_CONTENT.replace('%age', this.age);

            const completion = await this.openAiClient.chat.completions.create({
                model: model,
                messages: [
                    {
                        role: 'user',
                        content: content
                    },
                ],
            });

            var response = completion.choices[0].message.content;
            if (response) {
                response = response.substring(
                    response.indexOf("```json") + 7,
                    response.lastIndexOf("```")
                );
                return JSON.parse(response);
            }
            return [];
        } catch (error) {
            console.error(error);
        }
    }
}