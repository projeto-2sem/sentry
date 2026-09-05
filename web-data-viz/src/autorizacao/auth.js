const jwt = require("jsonwebtoken");

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