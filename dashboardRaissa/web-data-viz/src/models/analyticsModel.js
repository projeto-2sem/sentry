var database = require("../database/config");
const { S3Client, ListObjectsV2Command, GetObjectCommand } = require("@aws-sdk/client-s3");

const s3ClientInstance = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN
    }
});



function buscarKpis(empresaId, regiao) {
    
    var instrucaoSql = `
        SELECT COUNT(*) AS servidoresCriticos 
            FROM servidor 
            WHERE empresaId = ? AND regiao = ? AND status = 0;
          
    `;
    console.log("Executando SQL KPIs: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



async function buscarDadosS3(empresaId, servidorId) {
    const bucketName = "amzn-datalake-medalion-sentry"; 
    const prefixo = `ouro/${empresaId}/${servidorId}/`;

    try {
        const listCommand = new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: prefixo
        });

        const listResponse = await s3ClientInstance.send(listCommand);

        if (!listResponse.Contents || listResponse.Contents.length === 0) {
            throw new Error(`Nenhum arquivo encontrado no S3 para o prefixo: ${prefixo}`);
        }

        const arquivosOrdenados = listResponse.Contents.sort((a, b) => b.LastModified - a.LastModified);
        const ultimaKey = arquivosOrdenados[0].Key; 

        const getCommand = new GetObjectCommand({
            Bucket: bucketName,
            Key: ultimaKey,
        });

        const response = await s3ClientInstance.send(getCommand);
        const str = await response.Body.transformToString();
        return JSON.parse(str);
    } catch (error) {
        console.error("Erro ao buscar dados dinâmicos do S3:", error);
        throw error;
    }
}

function listarServidores(empresaId) {
    var instrucaoSql = `
        SELECT 
            s.idServidor,
            s.apelido,
            s.hostname,
            s.regiao,
            s.status,
            so.nome AS sistemaOperacional
        FROM servidor s
        JOIN sistema_operacional so ON s.sistemaOperacionalId = so.idSistemaOperacional
        WHERE s.empresaId = ${empresaId};
    `;

    console.log("Executando a instrução SQL \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


 function buscarServidoresPorEmpresaERegiao(empresaId,regiao){
    var instrucaoSql=`
    SELECT icServidor, hostname, mac regiao,status
     FROM servidor
      WHERE empresaId= ${empresaId}`;

      if(regiao && regiao !== " " && regiao!== undefined){
        instrucaoSql+= ` AND regiao = '${regiao}'`;
      }

      console.log("Executando SQL para buscar servidores da região: \n" + instrucao)
      return database.executar(instrucaoSql);

 }
    


function buscarTopServidores(regiao) {
    var filtroRegiao = regiao ? `AND s.regiao = '${regiao}'` : '';

    var instrucaoSql = `
        SELECT s.hostname, s.regiao, sm.limiteCritico AS consumoTotal
        FROM servidor_medicao sm
        JOIN servidor s ON sm.servidorId = s.idServidor
        WHERE 1=1 ${filtroRegiao}
        ORDER BY sm.limiteCritico DESC 
        LIMIT 4;
    `;
    console.log("Executando SQL Top Servidores: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarKpis,
    buscarTopServidores,
    buscarDadosS3,
    listarServidores,
    buscarServidoresPorEmpresaERegiao
};