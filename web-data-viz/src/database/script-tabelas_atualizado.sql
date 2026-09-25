DROP DATABASE IF EXISTS sentry;

CREATE DATABASE if not exists sentry;
USE sentry;

CREATE TABLE endereco (
  idEndereco INT PRIMARY KEY AUTO_INCREMENT,
  cep CHAR(9) NOT NULL,
  numero VARCHAR(20) NOT NULL,
  complemento VARCHAR(45),
  logradouro VARCHAR(150) NOT NULL,
  bairro VARCHAR(150) NOT NULL,
  cidade VARCHAR(150) NOT NULL,
  estado CHAR(2) NOT NULL,
  data_criacao datetime default current_timestamp,
  data_atualizacao datetime default current_timestamp on update current_timestamp
);
 
CREATE TABLE empresa (
  idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
  nome_fantasia VARCHAR(255),
  razao_social VARCHAR(255),
  cnpj VARCHAR(18) NOT NULL UNIQUE,
  enderecoId INT NOT NULL,
  data_criacao datetime default current_timestamp,
  data_atualizacao datetime default current_timestamp on update current_timestamp,
  FOREIGN KEY (enderecoId) REFERENCES endereco(idEndereco)
);

CREATE TABLE codigo_ativacao (
  idCodigo INT PRIMARY KEY AUTO_INCREMENT,
  codigo_ativacao VARCHAR(10) NOT NULL UNIQUE,
  usado TINYINT NOT NULL,
  empresaId INT NOT NULL,
  data_criacao datetime default current_timestamp,
  data_atualizacao datetime default current_timestamp on update current_timestamp,
  FOREIGN KEY (empresaId) REFERENCES empresa(idEmpresa)
);


CREATE TABLE usuario (
  idUsuario INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255),
  email VARCHAR(255),
  senha VARCHAR(255),
  empresaId INT NOT NULL,
  cargo VARCHAR(30) DEFAULT 'Analista',
  responsavel INT,
  data_criacao datetime default current_timestamp,
  data_atualizacao datetime default current_timestamp on update current_timestamp,
  FOREIGN KEY (empresaId) REFERENCES empresa(idEmpresa),
  FOREIGN KEY (responsavel) REFERENCES usuario(idUsuario),
  CONSTRAINT fk_check_papel CHECK (cargo IN ('Administrador', 'Analista'))
);

CREATE TABLE sistema_operacional (
  idSistemaOperacional INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL
);

CREATE TABLE servidor (
  idServidor INT PRIMARY KEY AUTO_INCREMENT,
  sistemaOperacionalId INT NOT NULL,
  empresaId INT NOT NULL,
  apelido VARCHAR(255),
  hostname VARCHAR(255),
  mac VARCHAR(17),
  modelo VARCHAR(45),
  data_criacao datetime default current_timestamp,
  data_atualizacao datetime default current_timestamp on update current_timestamp,
  status TINYINT,
  FOREIGN KEY (sistemaOperacionalId) REFERENCES sistema_operacional(idSistemaOperacional),
  FOREIGN KEY (empresaId) REFERENCES empresa(idEmpresa)
);
 
CREATE TABLE tipo_medicao (
  idTipoMedicao INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  unidade_medida VARCHAR(45),
  apelido VARCHAR(45) NOT NULL,
  descricao TEXT
);

CREATE TABLE servidor_medicao (
  servidorId INT,
  tipoMedicaoId INT,
  ativo TINYINT,
  parametro INT,
  PRIMARY KEY (servidorId, tipoMedicaoId),
  FOREIGN KEY (servidorId) REFERENCES servidor(idServidor),
  FOREIGN KEY (tipoMedicaoId) REFERENCES tipo_medicao(idTipoMedicao)
);
 
