import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {

    let { description, size, artStyle } = req.body;
    let errorMessage = false;

    const sizes = ['256x256', '512x512', '1024x1024']

    const complition = await openai.createImage({
        model: "image-alpha-001",
        prompt: `Um personagem ${description} em um fundo branco, Estilo: ${artStyle}`,
        size: size,
        response_format: 'url',
        n: 1,
    }).catch(err => {
        console.log('errrrrrrr');
        console.log(err.response.data)
        res.status(400).json({ message: err.response.data.error.message });
    });


    //console.log(complition.data);
    const result = complition.data.data[0].url;
    res.status(200).json({ resposta: result });
}