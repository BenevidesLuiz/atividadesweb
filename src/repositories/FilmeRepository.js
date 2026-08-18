const db = require('../config/database');

function listar() {
  return db.prepare('SELECT * FROM filmes ORDER BY id').all();
}

function buscarPorId(id) {
  return db.prepare('SELECT * FROM filmes WHERE id = ?').get(id);
}

function criar({ titulo, diretor, ano, imagem }) {
  const resultado = db
    .prepare('INSERT INTO filmes (titulo, diretor, ano, imagem) VALUES (?, ?, ?, ?)')
    .run(titulo, diretor, ano, imagem || null);
  return buscarPorId(resultado.lastInsertRowid);
}

function atualizar(id, { titulo, diretor, ano, imagem }) {
  db.prepare('UPDATE filmes SET titulo = ?, diretor = ?, ano = ?, imagem = ? WHERE id = ?')
    .run(titulo, diretor, ano, imagem, id);
  return buscarPorId(id);
}

function excluir(id) {
  const resultado = db.prepare('DELETE FROM filmes WHERE id = ?').run(id);
  return resultado.changes > 0;
}

module.exports = { listar, buscarPorId, criar, atualizar, excluir };