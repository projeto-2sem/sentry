CREATE DATABASE if not exists sentry;
USE sentry;

drop table if exists endereco;
drop table if exists empresa;
drop table if exists usuario;
drop table if exists codigo_ativacao;
drop table if exists tipo_medicao;
drop table if exists servidor_medicao;
drop table if exists servidor;

CREATE TABLE endereco (
  idEndereco INT PRIMARY KEY AUTO_INCREMENT,
  cep CHAR(9) NOT NULL,
  numero VARCHAR(20) NOT NULL,
  complemento VARCHAR(45),
  logradouro VARCHAR(150) NOT NULL,
  bairro VARCHAR(150) NOT NULL,
  cidade VARCHAR(150) NOT NULL,
  estado CHAR(2) NOT NULL,
  data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE empresa (
  idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
  nome_fantasia VARCHAR(255),
  razao_social VARCHAR(255),
  cnpj VARCHAR(18) NOT NULL UNIQUE,
  enderecoId INT NOT NULL,
  data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (enderecoId) REFERENCES endereco(idEndereco)
);

CREATE TABLE codigo_ativacao (
  idCodigo INT PRIMARY KEY,
  codigo_ativacao VARCHAR(10),
  data_criacao DATETIME,
  usado TINYINT,
  empresa_idEmpresa INT NOT NULL,
  FOREIGN KEY (empresa_idEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE servidor (
  idServidor INT PRIMARY KEY AUTO_INCREMENT,
  apelido VARCHAR(255),
  hostname VARCHAR(255),
  mac VARCHAR(17),
  empresaId INT,
  modeloId INT,
  data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (empresaId) REFERENCES empresa(idEmpresa)
);

CREATE TABLE tipo_medicao (
  idTipoMedicao INT PRIMARY KEY,
  nome VARCHAR(45),
  unidade_medida VARCHAR(45),
  comando_apelido VARCHAR(45),
  descricao TEXT
);

CREATE TABLE servidor_medicao (
  servidorId INT,
  medicaoId INT,
  intervalo INT,
  ativo TINYINT,
  alerta INT,
  PRIMARY KEY (servidorId, medicaoId),
  FOREIGN KEY (servidorId) REFERENCES servidor(idServidor),
  FOREIGN KEY (medicaoId) REFERENCES tipo_medicao(idTipoMedicao)
);

CREATE TABLE usuario (
  idUsuario INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255),
  email VARCHAR(255),
  senha VARCHAR(255),
  empresaId INT,
  papel_usuario VARCHAR(30) NOT NULL DEFAULT 'Analista',
  responsavel INT,
  data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (responsavel) REFERENCES usuario(idUsuario),
  FOREIGN KEY (empresaId) REFERENCES empresa(idEmpresa)
);