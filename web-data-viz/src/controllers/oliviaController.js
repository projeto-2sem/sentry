const { GoogleGenAI } = require("@google/genai");
const chatIA = new GoogleGenAI({ apiKey: process.env.CHAVE_OLIVIA });

async function perguntar(req, res) {
    const pergunta = req.body.pergunta;
    console.log(pergunta)
    try {
        const resultado = await gerarResposta(pergunta);
        console.log(resultado)
        res.json({ resultado });
    } catch (error) {
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}

async function gerarResposta(mensagem) {

    try {
        // gerando conteúdo com base na pergunta
        const modeloIA = chatIA.models.generateContent({
            model: "gemini-3.8-flash",
            contents: `Em um paragráfo responda: ${mensagem}`

        });
        const resposta = (await modeloIA).text;
        const tokens = (await modeloIA).usageMetadata;

        console.log(resposta);
        console.log("Uso de Tokens:", tokens);

        return resposta;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { perguntar };