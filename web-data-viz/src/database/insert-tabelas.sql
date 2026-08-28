insert into endereco (cep, numero, complemento, logradouro, bairro, cidade, estado) VALUES
('01001-000', '100', null, 'Praça da Sé', 'Sé', 'São Paulo', 'SP'),
('20040-020', '200', 'Sala 101', 'Rua da Assembleia', 'Centro', 'Rio de Janeiro', 'RJ'),
('30130-110', '300', null, 'Av. Afonso Pena', 'Centro', 'Belo Horizonte', 'MG');

insert into empresa (enderecoID, razao_social, nome_fantasia, cnpj) VALUES
(1, 'SCADA LTDA', 'SCADA SOCIAL', '12345678000101'),
(2, 'SCADA LTDA MG', 'SCADA MJ', '12345678000102'),
(3, 'Petrobras', 'Petrobras SP', '12345678000103');


INSERT INTO codigo_ativacao (codigo_ativacao, usado, empresaId) VALUES 
('ABCDEF1234', 0, 1 ),
('ABCDEF1236', 1, 1 ),
('ABCDEF1235', 1, 2 );

INSERT INTO usuario (nome, email, senha, empresaId, cargo, responsavel) VALUES
("Vinicius Faria", "vinicius@gmail.com", "12345ASC@", 1, 'Administrador', null),
("Rafael Santana", "rafa@gmail.com", "12345ASC@", 1, 'Analista', 1),
("Mariana Xavier", "mariana@gmail.com", "12345ASC@", 2, 'Administrador', null),
("Daniel", "daniel@gmail.com", "12345ASC@", 2, 'Analista', 3),
("Marianne", "marianne@gmail.com", "12345ASC@", 2, 'Administrador', null),
("Yagho", "yagho@gmail.com", "12345ASC@", 2, 'Analista', 5);

INSERT INTO sistema_operacional (nome) VALUES
("Windows Server"),
("Ubuntu Server");

INSERT INTO servidor (empresaId, sistemaOperacionalId, apelido, hostname, mac, modelo) VALUES
(1, 1,  "Servidor-Scada-01", "Host91", "A1:B2:C3:D4:E5:F6", "PowerEdge R750"),
(1, 1, "Servidor-Scada-02", "Host92", "A1:B2:C3:D4:E5:F7", "PowerEdge R750"),
(2, 1, "Servidor-Scada-01", "Host93", "A1:B2:C3:D4:E5:F8", "PowerEdge R750"),
(2, 2, "Servidor-Scada-02", "Host94", "A1:B2:C3:D4:E5:F9", "PowerEdge R750"),
(3, 2, "Servidor-Scada-05", "Host95", "A1:B2:C3:D4:E5:F5", "PowerEdge R750"),
(3, 2, "Servidor-Scada-06", "Host96", "A1:B2:C3:D4:E5:F4", "PowerEdge R750");

INSERT INTO tipo_medicao (nome, unidade_medida, apelido, descricao) VALUES
("cpu", "%", "cpu_percent", "porcentagem da cpu"),
("cpu", "ms", "cpu_avg", "tempo médio cpu"),
("memoria", "gb", "memory_avaible", "memoria disponivel"),
("memoria", "gb", "memory_free", "memoria livre");

INSERT INTO servidor_medicao (tipoMedicaoId, servidorId, ativo, parametro) VALUES
(1, 1, 1, 80),
(2, 1, 1, 5),
(3, 2, 1, 3),
(1, 2, 1, 4);