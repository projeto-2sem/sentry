const jwt = require("jsonwebtoken");

/*
 JWT
 O objetivo dele é funcionar como um "segurança na porta":
 Se o token for válido, ele deixa a requisição passar para o Controller (`next()`).
 Se não for, ele bloqueia e retorna um erro 401 (Não autorizado). Ele é uma questão de segurança para que nínguem consiga 
 deletar nem usar a dashboard sem a permissão que ele deve ter para fazer certas ações na dashboard.
 escrevi meio que um passo a passo de como funciona esse processo.
 */
function autenticarToken(req, res, next) {
    // 1. Pega o cabeçalho de autorização enviado na requisição, ou seja, as credenciais daquele usuário
    const authHeader = req.headers.authorization;

    // Se o cabeçalho não existir o usuario nem se autenticou
    if (!authHeader) {
        return res.status(401).json({ erro: "Token não enviado" });
    }

    // 2. O padrão da Web para o header é enviar "Bearer <token>"
    // O comando .split(" ") divide a string em um array: ["Bearer", "seu_token_aqui"]
    // Pegamos a posição [1] para isolar apenas a string do token. Pois só queremos o token, a palavra "Bearer"
    // vem do inglês de portador, ele serve apenas para identificarmos quem é o dono daquele token e validá-lo com base exclusivamente
    // no token desse portador.
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ erro: "Token inválido" });
    }

    try {
        // 3. Valida o token usando a chave secreta guardada nas variáveis de ambiente (.env) que é o JWT
        // Se o token estiver expirado ou foi alterado, essa função vai gerar um erro , vai cair no catch
        const verificacao = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Anexa os dados do usuário decodificados dentro do objeto 'req'
        // Dessa forma o controller sabe exatamente quem está fazendo essa requisição,
        // de forma mais simples o JWT meio que força o usuário passar pelo controller de validar login duas vezes
        // porém agora com uma camada de segurança a mais com o token.
        req.user = {
            id: verificacao.id,
            email: verificacao.email,
            username: verificacao.username
        };

        // 5. Se o token for válido a função next é iniciada e o a validação segue para o fluxo que já conhecemos do controller.
        next();

    } catch (err) {
        // Se a verificação falhar token expirado ou adulterado, a requisição é barrada aqui
        return res.status(401).json({ erro: "Token inválido ou expirado" });
    }
}

module.exports = autenticarToken;