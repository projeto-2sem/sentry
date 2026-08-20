-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE sentry;
USE sentry;

create table endereco(
	idEndereco int auto_increment,
    
	cep char(9) not null unique,
	numero varchar(20) not null,
	complemento varchar(45),
	logradouro varchar(150) not null, 
	bairro varchar(150) not null,
	cidade varchar(150) not null,
	estado char(2) not null,
	pais varchar(150) not null,
    
	data_criacao datetime default current_timestamp,
	data_atualizacao datetime default current_timestamp on update current_timestamp,
    
	primary key (idEndereco)
);

CREATE TABLE empresa (
	idEmpresa INT AUTO_INCREMENT,
    nome_fantasia VARCHAR(255),
    razao_social VARCHAR(255),
    cnpj VARCHAR(18) NOT NULL UNIQUE,
    codigo_ativacao CHAR(10),
    enderecoId INT NOT NULL,
    
	data_criacao datetime default current_timestamp,
	data_atualizacao datetime default current_timestamp on update current_timestamp,
    
    PRIMARY KEY (idEmpresa),
    CONSTRAINT fk_endereco_empresa FOREIGN KEY (enderecoId) REFERENCES endereco(idEndereco)
);

CREATE TABLE usuario (
	idUsuario INT AUTO_INCREMENT,
    nome VARCHAR(255),
    email VARCHAR(255),
    senha VARCHAR(255),
    empresaId INT,
    papel_usuario VARCHAR(30) NOT NULL DEFAULT 'Analista',
    
	data_criacao datetime default current_timestamp,
	data_atualizacao datetime default current_timestamp on update current_timestamp,
    
    PRIMARY KEY (idUsuario),
    CONSTRAINT fk_usuario_plataforma FOREIGN KEY (empresaId) REFERENCES empresa(idEmpresa),
    CONSTRAINT fk_check_papel CHECK (papel_usuario IN ('administrador', 'analista'))
);


CREATE TABLE modelo_servidor (
	idModelo INT AUTO_INCREMENT,
    nome VARCHAR(100),
    fabricante VARCHAR(50),
    cpu VARCHAR(100),
    gb_ram INT,
	armazenamento_gb INT,
    
    PRIMARY KEY (idModelo),
    
	data_criacao datetime default current_timestamp,
	data_atualizacao datetime default current_timestamp on update current_timestamp
);

CREATE TABLE servidor (
	idServidor INT AUTO_INCREMENT,
    hostName VARCHAR(255),
    mac VARCHAR(17),
    empresaId INT,
    modeloId INT,
    
	data_criacao datetime default current_timestamp,
	data_atualizacao datetime default current_timestamp on update current_timestamp,
    
    PRIMARY KEY (idServidor),
    CONSTRAINT fk_servidor_empresa FOREIGN KEY (empresaId) REFERENCES empresa(idEmpresa),
    CONSTRAINT fk_modelo_servidor FOREIGN KEY (modeloId) REFERENCES modelo_servidor(idModelo)
);

CREATE TABLE metrica (
	idMetrica INT AUTO_INCREMENT,
	porcentagem_cpu DECIMAL(10,2),
    porcentagem_disco DECIMAL(10,2),
    porcentagem_memoria DECIMAL(10,2),
    servidorId INT,
    
	data_criacao datetime default current_timestamp,
	data_atualizacao datetime default current_timestamp on update current_timestamp,
    
    PRIMARY KEY (idMetrica),
    CONSTRAINT FOREIGN KEY (servidorId) REFERENCES servidor(idServidor)
);

insert into endereco (cep, numero, complemento, logradouro, bairro, cidade, estado, pais) values
('01001-000', '100', null, 'Praça da Sé', 'Sé', 'São Paulo', 'SP', 'Brasil'),
('20040-020', '200', 'Sala 101', 'Rua da Assembleia', 'Centro', 'Rio de Janeiro', 'RJ', 'Brasil'),
('30130-110', '300', null, 'Av. Afonso Pena', 'Centro', 'Belo Horizonte', 'MG', 'Brasil');

insert into empresa (enderecoId, codigo_ativacao, razao_social, nome_fantasia, cnpj) values
(1, 'A1B2C3', 'SCADA LTDA', 'SCADA SOCIAL', '12345678000101'),
(2, 'ED145B', 'SCADA LTDA MG', 'SCADA MJ', '12345678000102'),
(3, 'AZ235D', 'Petrobras', 'Petrobras SP', '12345678000103');

INSERT INTO usuario (nome, email, senha, empresaId, papel_usuario) VALUES
("Vinicius Faria", "vinicius@gmail.com", "12345ASC@", 1, 'Administrador'),
("Rafael Santana", "rafa@gmail.com", "12345ASC@", 1, 'Analista'),
("Mariana Xavier", "mariana@gmail.com", "12345ASC@", 2, 'Administrador'),
("Daniel", "daniel@gmail.com", "12345ASC@", 2, 'Analista'),
("Marianne", "marianne@gmail.com", "12345ASC@", 2, 'Administrador'),
("Yagho", "yagho@gmail.com", "12345ASC@", 2, 'Analista');

INSERT INTO modelo_servidor (nome, fabricante, cpu, gb_ram, armazenamento_gb) VALUES 
('PowerEdge R750', 'Dell', '2x Intel Xeon Gold 6330 - 28 núcleos cada', 512, 7680 ),
('ProLiant DL380 Gen10', 'HPE', '2x Intel Xeon Gold 6230R - 26 núcleos cada', 384, 7680 ),
('ThinkSystem SR650', 'Lenovo', '2x Intel Xeon Gold 6248R - 24 núcleos cada', 256, 3840 );

INSERT INTO servidor (hostName, mac, empresaId, modeloId) VALUES
("Servidor-A12B", "A1:B2:C3:D4:E5:F6", 1, 1),
("Servidor-A12C", "A1:B2:C3:D4:E5:F7", 1, 1),
("Servidor-A12D", "A1:B2:C3:D4:E5:F8", 2, 2),
("Servidor-A12E", "A1:B2:C3:D4:E5:F9", 2, 2),
("Servidor-A12F", "A1:B2:C3:D4:E5:F1", 3, 3);

INSERT INTO metrica (porcentagem_cpu, porcentagem_disco, porcentagem_memoria, servidorId) VALUES
(10, 30, 40, 1),
(12, 40, 41, 1),
(13, 40, 42, 1),
(14, 40, 43, 1);
