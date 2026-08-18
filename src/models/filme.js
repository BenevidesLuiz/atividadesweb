function validarFilme({ titulo, diretor, ano }) {
  const erros = [];
  if (!titulo || typeof titulo !== 'string') erros.push('titulo é obrigatório');
  if (!diretor || typeof diretor !== 'string') erros.push('diretor é obrigatório');
  if (!ano || typeof ano !== 'number') erros.push('ano é obrigatório');
  return erros;
}
module.exports = { validarFilme };