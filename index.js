
const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Banco de dados em memória
let produtos = [
  { id: 1, nome: 'Teclado', preco: 150 },
  { id: 2, nome: 'Mouse', preco: 80 },
];

// Status da API
app.get('/api/status', (req, res) => {
  res.status(200).json({
    ok: true,
    hora: new Date().toISOString(),
  });
});

// Lista todos os produtos ou filtra por nome
app.get('/api/produtos', (req, res) => {
  const { nome } = req.query;

  if (!nome) {
    return res.status(200).json(produtos);
  }

  const filtrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(nome.toLowerCase())
  );

  res.status(200).json(filtrados);
});

// Busca um produto pelo ID
app.get('/api/produtos/:id', (req, res) => {
  const id = Number(req.params.id);

  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    return res.status(404).json({
      erro: 'não encontrado',
    });
  }

  res.status(200).json(produto);
});

// Cria um novo produto
app.post('/api/produtos', (req, res) => {
  const { nome, preco } = req.body;

  if (!nome || typeof preco !== 'number') {
    return res.status(400).json({
      erro: 'nome (texto) e preco (número) são obrigatórios',
    });
  }

  const novoProduto = {
    id: produtos.length + 1,
    nome,
    preco,
  };

  produtos.push(novoProduto);

  res.status(201).json(novoProduto);
});

// Atualiza um produto
app.put('/api/produtos/:id', (req, res) => {
  const id = Number(req.params.id);
  const { nome, preco } = req.body;

  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    return res.status(404).json({
      erro: 'não encontrado',
    });
  }

  if (!nome || typeof preco !== 'number') {
    return res.status(400).json({
      erro: 'dados inválidos',
    });
  }

  produto.nome = nome;
  produto.preco = preco;

  res.status(200).json(produto);
});

// Remove um produto
app.delete('/api/produtos/:id', (req, res) => {
  const id = Number(req.params.id);

  const index = produtos.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      erro: 'não encontrado',
    });
  }

  produtos.splice(index, 1);

  res.status(204).send();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});