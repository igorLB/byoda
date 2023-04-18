import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {

    if (!prompt) {
        return res.status(400).json({ error: "Prompt missigng" })
    }

    const complition = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Faça alguma coisa \n
        Nessa outra linha tbm \n
        E aqui, obrigado
        `,
        max_tokens: 500,
        temperature: 1, //criatividade
        presence_penalty: 0,
        frequency_penalty: 0,
    });


    const result = complition.data.choices[0].text;

    res.status(200).json({ resposta: result });
}