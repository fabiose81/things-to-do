import { GptClient } from '../chatgpt/gptClient.js';

const generate = async (req, res) => {
    const age = req.params.age;
    const gptClient = new GptClient(age);
    const data = await gptClient.search();

    res.json(data);
}

export default generate;