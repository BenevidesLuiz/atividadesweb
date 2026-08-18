const repository = require('../repositories/FilmeRepository');
const { validarFilme } = require('../models/Filme');

function listarFilmes() { return repository.listar(); }

function obterFilme(id) {
  const filme = repository.buscarPorId(id);
  if (!filme) {
    const erro = new Error('Filme não encontrado');
    erro.status = 404;
    throw erro;
  }
  return filme;
}

function criarFilme(dados) {
  const erros = validarFilme(dados);
  if (erros.length > 0) {
    const erro = new Error(erros.join(', '));
    erro.status = 400;
    throw erro;
  }
  return repository.criar(dados);
}

function atualizarFilme(id, dados) {
  obterFilme(id); 
  const erros = validarFilme(dados);
  if (erros.length > 0) {
    const erro = new Error(erros.join(', '));
    erro.status = 400;
    throw erro;
  }
  return repository.atualizar(id, dados);
}

function excluirFilme(id) {
  obterFilme(id);
  repository.excluir(id);
}

module.exports = { listarFilmes, obterFilme, criarFilme, atualizarFilme, excluirFilme };