const mysql = require('mysql2');
const http = require('http');
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'conexao' // é o schema
});

app.get('/', (req, res) => {
  res.json('teste mysql');
});

app.get('/alunos', (req, res) => {
  db.query('SELECT * FROM conexao.alunos ORDER BY id DESC', (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/alunos', (req, res) => {
    const aluno = req.body;
    db.query(
      'INSERT INTO conexao.alunos (nome, sobrenome, idade, cpf, motorista) VALUES (?, ?, ?, ?, ?)',
      [aluno.nome, aluno.sobrenome, aluno.idade, aluno.cpf, aluno.motorista],
      (err, result) => {
        if (err) {  //Utilizando return early pattern.
          console.error(err);
          return res.status(500).json({ message: 'Erro ao criar aluno' });
        }

        return res.status(200).json(`Aluno ${aluno.nome} criado`);;
        /*if (err) {
          console.error(err);
          res.status(500).json({ message: 'Erro ao criar aluno' });
        } else {
          res.status(200).json(`Aluno ${aluno.nome} criado`);
        }*/
      }
    );
  });
  
  app.delete('/alunos/:codigoAluno', (req, res) => {
    db.query(
      'DELETE FROM conexao.alunos WHERE id = ?',
      [req.params.codigoAluno],
      (err, result) => {
        if (err) {  //Utilizando return early pattern.
          console.error(err);
          return res.status(500).json({ message: 'Erro ao excluir aluno' });
        }
        
        return res.status(200).json(`Aluno ${req.params.codigoAluno} excluído`);
        /*if (err) {
          console.error(err);
          res.status(500).json({ message: 'Erro ao excluir aluno' });
        } else {
          res.status(200).json(`Aluno ${req.params.codigoAluno} excluído`);
        }*/
      }
    );
  });
  
  app.put('/alunos/:codigoAluno', (req, res) => {
    const aluno = req.body;
    db.query(
      'UPDATE conexao.alunos SET nome = ?, sobrenome = ?, idade = ?, cpf = ?, motorista = ? WHERE id = ?',
      [aluno.nome, aluno.sobrenome, aluno.idade, aluno.cpf, aluno.motorista, req.params.codigoAluno],
      (err, result) => {
        if (err) {  //Utilizando return early pattern.
          console.error(err);
          return res.status(500).json({ message: 'Erro ao atualizar aluno' });
        }

        return res.status(200).json(`Carro ${req.params.codigoCarro} atualizado`);
        /*if (err) {
          console.error(err);
          res.status(500).json({ message: 'Erro ao atualizar aluno' });
        } else {
          res.status(200).json(`Aluno ${req.params.codigoAluno} atualizado`);
        }*/
      }
    );
  });

http.createServer({}, app).listen(3001, () => {
    console.log(`Serviço iniciado`);
  });