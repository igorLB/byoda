import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {

    let { genero, resumo, loucura } = req.body;

    if (genero && resumo && genero.length < 25 && resumo.length < 200) {
        console.log('fazendo chamada para a API da OpenAI')

        if (!loucura || (loucura < 0 || loucura > 1)) {
            loucura = 0.8;
        }

        let prompt = `Baseado no genêro '${genero}' e no resumo '${resumo}' me dê 3 sugestões ou inspirações curtas de como prosseguir essa história.`

        const complition = await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            max_tokens: 400,
            temperature: loucura,
            presence_penalty: 0,
            frequency_penalty: 0,
        });

        const result = complition.data.choices[0].text;


        // const result = "1. uma menina delicada\n\n2. uma menida grossa\n\n3.uma menina linda";

        const arrayResult = result.split('\n');
        const finalResult = arrayResult.filter(item => item.length > 5)

        const myObj = { resposta: finalResult };
        res.status(200).json(myObj);
    } else {
        res.status(400).json({ error: 'Ops, parametros inválidos!' });
    }
}