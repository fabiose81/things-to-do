import { GptClient } from '../chatgpt/gptClient.js';
import { Lambda } from '../aws/lambda.js';

const generate = async (req, res) => {
    const age = req.params.age;
    const gptClient = new GptClient(age);
    const lambda = new Lambda(process.env.AWS_PROFILE);
    lambda.track('GPT request for age : '.concat(age))
    const data = await gptClient.search();

    res.json(data);
}

export default generate;