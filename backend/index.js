const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// ✅ Conexão com banco (única
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'P@tricia221212', // coloque sua senha se tiver
  database: 'catalogo_livros'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL!');
});

// Rota para adicionar livro
app.post('/livros', (req, res) => {
  const { titulo, autor, status } = req.body;
  const sql = 'INSERT INTO livros (titulo, autor, status) VALUES (?, ?, ?)';
  db.query(sql, [titulo, autor, status], (err, result) => {
    if (err) throw err;
    res.send({ id: result.insertId, ...req.body });
  });
});

// Rota para listar livros
app.get('/livros', (req, res) => {
  db.query('SELECT * FROM livros', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
