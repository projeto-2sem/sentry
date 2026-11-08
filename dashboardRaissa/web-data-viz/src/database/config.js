var mysql = require("mysql2");

// 1. Definimos o objeto de configuração do banco usando as variáveis de ambiente
const mySqlConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 3306,
    connectionLimit: 10
};

// 2. Criamos o pool de conexões usando a configuração acima
var pool = mysql.createPool(mySqlConfig);

// 3. Função que executa as instruções SQL no banco
function executar(instrucao) {

    if (process.env.AMBIENTE_PROCESSO !== "producao" && process.env.AMBIENTE_PROCESSO !== "desenvolvimento") {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM .env OU dev.env OU app.js\n");
        return Promise.reject("AMBIENTE NÃO CONFIGURADO EM .env");
    }

    return new Promise(function (resolve, reject) {
        // Usa o pool para obter uma conexão de forma eficiente
        pool.getConnection(function (err, conexao) {
            if (err) {
                console.error("❌ Erro ao obter conexão do pool:", err.sqlMessage || err);
                return reject(err);
            }

            conexao.query(instrucao, function (erro, resultados) {
                conexao.release(); // Devolve a conexão ao pool
                
                if (erro) {
                    console.error("❌ Erro na query:", erro.sqlMessage);
                    return reject(erro);
                }
                
                console.log("📊 Resultados:", resultados);
                resolve(resultados);
            });
        });
    });
}

module.exports = {
    executar
};