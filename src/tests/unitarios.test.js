const { validarFilme } = require('../models/Filme');
const FilmeService = require('../services/FilmeService');
const FilmeRepository = require('../repositories/FilmeRepository');

jest.mock('../repositories/FilmeRepository');

describe('Testes Unitários - Comportamentos da API', () => {

    test('1. Deve validar um filme correto sem retornar erros', () => {
        const filme = { titulo: 'Mewtwo Contra-Ataca', diretor: 'Kunihiko', ano: 1998 };
        const erros = validarFilme(filme);
        expect(erros).toHaveLength(0);
    });

    test('2. Deve rejeitar um filme sem título', () => {
        const filme = { diretor: 'Kunihiko', ano: 1999 };
        const erros = validarFilme(filme);
        expect(erros).toContain('titulo é obrigatório');
    });

    test('3. Deve rejeitar um filme sem diretor', () => {
        const filme = { titulo: 'Pokémon 3', ano: 2000 };
        const erros = validarFilme(filme);
        expect(erros).toContain('diretor é obrigatório');
    });

    test('4. Deve rejeitar um filme com formato de ano incorreto', () => {
        const filme = { titulo: 'Viajantes do Tempo', diretor: 'Kunihiko', ano: '2001' };
        const erros = validarFilme(filme);
        expect(erros).toContain('ano é obrigatório');
    });

    test('5. Deve retornar o filme quando buscar por um ID existente', () => {
        FilmeRepository.buscarPorId.mockReturnValue({ id: 1, titulo: 'Pokémon 1' });
        const filme = FilmeService.obterFilme(1);
        expect(filme.id).toBe(1);
        expect(filme.titulo).toBe('Pokémon 1');
    });

    test('6. Deve lançar erro 404 quando buscar por ID inexistente', () => {
        FilmeRepository.buscarPorId.mockReturnValue(undefined);
        expect(() => FilmeService.obterFilme(9999)).toThrow('Filme não encontrado');
    });
});