const jwt = require("jsonwebtoken");

// aqui é aonde o codigo checa se o token que foi enviado pelo frontend é valido, se for valido
// ele continua indo para os controllers, se nao, a requisição nao continua


function autenticarToken(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ erro: "Token não enviado" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ erro: "Token inválido" });
    }
    try {
        const verificacao = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id: verificacao.id,
            email: verificacao.email,
            username: verificacao.username
        };

        next();

    } catch (err) {
        return res.status(401).json({ erro: "Token inválido ou expirado" });
    }
}

module.exports = autenticarToken;