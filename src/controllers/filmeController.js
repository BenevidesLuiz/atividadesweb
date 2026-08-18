const service = require('../services/FilmeService');

function listar(req, res) { res.status(200).json(service.listarFilmes()); }

function buscar(req, res) {
  try { res.status(200).json(service.obterFilme(Number(req.params.id))); } 
  catch (erro) { res.status(erro.status || 500).json({ erro: erro.message }); }
}

function criar(req, res) {
  try { res.status(201).json(service.criarFilme(req.body)); } 
  catch (erro) { res.status(erro.status || 500).json({ erro: erro.message }); }
}

function atualizar(req, res) {
  try { res.status(200).json(service.atualizarFilme(Number(req.params.id), req.body)); } 
  catch (erro) { res.status(erro.status || 500).json({ erro: erro.message }); }
}

function excluir(req, res) {
  try { service.excluirFilme(Number(req.params.id)); res.status(204).send(); } 
  catch (erro) { res.status(erro.status || 500).json({ erro: erro.message }); }
}

module.exports = { listar, buscar, criar, atualizar, excluir };