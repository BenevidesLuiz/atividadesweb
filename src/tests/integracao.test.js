const request = require('supertest');
const app = require('../app'); 

describe('Testes de Integração - Endpoints', () => {
    
    test('GET /filmes deve retornar status 200 e uma lista de filmes', async () => {
        const resposta = await request(app).get('/filmes');
        
        expect(resposta.status).toBe(200);
        expect(Array.isArray(resposta.body)).toBe(true);
        
        if (resposta.body.length > 0) {
            expect(resposta.body[0]).toHaveProperty('id');
            expect(resposta.body[0]).toHaveProperty('titulo');
        }
    });

});