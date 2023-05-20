/*Treino Web II*/
CREATE TABLE conexao.alunos(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR (15) NOT NULL,
sobrenome VARCHAR (30) NOT NULL,
idade INT NOT NULL,
cpf INT NOT NULL,
motorista INT NOT NULL,
constraint fk_aluno_motorista foreign key (motorista) REFERENCES motoristas(id)
);

CREATE TABLE conexao.motoristas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  idade INT NOT NULL
);

INSERT INTO conexao.motoristas (id, nome, idade) 
VALUES (2, 'Fernando', 34);

INSERT INTO conexao.alunos (id, nome, sobrenome, idade, cpf, motorista) 
VALUES (2, 'Juan', 'Redivo', 20, 12345678, 2);