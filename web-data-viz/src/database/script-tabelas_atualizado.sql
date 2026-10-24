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
  dataCriacao datetime default current_timestamp,
  dataAtualizacao datetime default current_timestamp on update current_timestamp
);
 
CREATE TABLE empresa (
  idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
  nomeFantasia VARCHAR(255),
  razaoSocial VARCHAR(255),
  cnpj VARCHAR(18) NOT NULL UNIQUE,
  enderecoId INT NOT NULL,
  dataCriacao datetime default current_timestamp,
  dataAtualizacao datetime default current_timestamp on update current_timestamp,
  FOREIGN KEY (enderecoId) REFERENCES endereco(idEndereco)
);

CREATE TABLE cargo(
	idCargo INT PRIMARY KEY AUTO_INCREMENT,
    nomeCargo VARCHAR(30)
);

CREATE TABLE codigo_ativacao (
  idCodigo INT PRIMARY KEY AUTO_INCREMENT,
  codigoAtivacao VARCHAR(10) NOT NULL,
  usado TINYINT NOT NULL,
  dataCriacao datetime default current_timestamp,
  dataAtualizacao datetime default current_timestamp on update current_timestamp,
  fkEmpresa INT,
  fkCargo INT,
  FOREIGN KEY (fkCargo) REFERENCES cargo(idCargo),
  FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE usuario (
  idUsuario INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255),
  email VARCHAR(255),
  senha VARCHAR(255),
  fkEmpresa INT NOT NULL,
  fkCargo INT DEFAULT 1,
  dataCriacao datetime default current_timestamp,
  dataAtualizacao datetime default current_timestamp on update current_timestamp,
  FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
  FOREIGN KEY (fkCargo) REFERENCES cargo(idCargo)
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
  dataCriacao datetime default current_timestamp,
  dataAtualizacao datetime default current_timestamp on update current_timestamp,
  status TINYINT,
  FOREIGN KEY (sistemaOperacionalId) REFERENCES sistema_operacional(idSistemaOperacional),
  FOREIGN KEY (empresaId) REFERENCES empresa(idEmpresa)
);
 
CREATE TABLE tipo_medicao (
  idTipoMedicao INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  unidadeMedida VARCHAR(45),
  apelido VARCHAR(45) NOT NULL,
  descricao TEXT
);

CREATE TABLE servidor_medicao (
  servidorId INT,
  tipoMedicaoId INT,
  ativo TINYINT,
  limiteCritico DECIMAL(10,2),
  limiteAtencao DECIMAL(10,2),
  PRIMARY KEY (servidorId, tipoMedicaoId),
  FOREIGN KEY (servidorId) REFERENCES servidor(idServidor),
  FOREIGN KEY (tipoMedicaoId) REFERENCES tipo_medicao(idTipoMedicao)
);
 
 INSERT INTO cargo (nomeCargo) VALUE ("analista");
 INSERT INTO cargo (nomeCargo) VALUES ("gestor");