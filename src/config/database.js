const Database = require('better-sqlite3');
const path = require('path');

const caminhoBanco = path.join(__dirname, '..', '..', 'database', 'app.db');
const db = new Database(caminhoBanco);

db.pragma('journal_mode = WAL');

// Criação da tabela de filmes
db.exec(`
  CREATE TABLE IF NOT EXISTS filmes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    diretor TEXT NOT NULL,
    ano INTEGER NOT NULL,
    imagem TEXT
  )
`);

// Carga inicial dos 20 filmes
const stmt = db.prepare('SELECT COUNT(*) as count FROM filmes');
if (stmt.get().count === 0) {
  const filmesIniciais = [
    { titulo: 'Pokémon: O Filme - Mewtwo Contra-Ataca', diretor: 'Kunihiko Yuyama', ano: 1998, imagem: '/imagens/filme1.jpg' },
    { titulo: 'Pokémon 2000: O Poder de Um', diretor: 'Kunihiko Yuyama', ano: 1999, imagem: '/imagens/filme2.jpg' },
    { titulo: 'Pokémon 3: O Feitiço dos Unown', diretor: 'Kunihiko Yuyama', ano: 2000, imagem: '/imagens/filme3.jpg' },
    { titulo: 'Pokémon 4: Viajantes do Tempo', diretor: 'Kunihiko Yuyama', ano: 2001, imagem: '/imagens/filme4.jpg' },
    { titulo: 'Pokémon Heróis: Latios e Latias', diretor: 'Kunihiko Yuyama', ano: 2002, imagem: '/imagens/filme5.jpg' },
    { titulo: 'Pokémon: Jirachi - Realizador de Desejos', diretor: 'Kunihiko Yuyama', ano: 2003, imagem: '/imagens/filme6.jpg' },
    { titulo: 'Pokémon: Alma Gêmea', diretor: 'Kunihiko Yuyama', ano: 2004, imagem: '/imagens/filme7.jpg' },
    { titulo: 'Pokémon: Lucario e o Mistério de Mew', diretor: 'Kunihiko Yuyama', ano: 2005, imagem: '/imagens/filme8.jpg' },
    { titulo: 'Pokémon Ranger e o Templo do Mar', diretor: 'Kunihiko Yuyama', ano: 2006, imagem: '/imagens/filme9.jpg' },
    { titulo: 'Pokémon: O Pesadelo de Darkrai', diretor: 'Kunihiko Yuyama', ano: 2007, imagem: '/imagens/filme10.jpg' },
    { titulo: 'Pokémon: Giratina e o Cavaleiro do Céu', diretor: 'Kunihiko Yuyama', ano: 2008, imagem: '/imagens/filme11.jpg' },
    { titulo: 'Pokémon: Arceus e a Joia da Vida', diretor: 'Kunihiko Yuyama', ano: 2009, imagem: '/imagens/filme12.jpg' },
    { titulo: 'Pokémon: Zoroark - Mestre das Ilusões', diretor: 'Kunihiko Yuyama', ano: 2010, imagem: '/imagens/filme13.jpg' },
    { titulo: 'Pokémon: Victini e Reshiram', diretor: 'Kunihiko Yuyama', ano: 2011, imagem: '/imagens/filme14.jpg' },
    { titulo: 'Pokémon: Kyurem contra a Espada da Justiça', diretor: 'Kunihiko Yuyama', ano: 2012, imagem: '/imagens/filme15.jpg' },
    { titulo: 'Pokémon: Genesect e a Lenda Revelada', diretor: 'Kunihiko Yuyama', ano: 2013, imagem: '/imagens/filme16.jpg' },
    { titulo: 'Pokémon: Diancie e o Casulo da Destruição', diretor: 'Kunihiko Yuyama', ano: 2014, imagem: '/imagens/filme17.jpg' },
    { titulo: 'Pokémon: Hoopa e o Duelo Lendário', diretor: 'Kunihiko Yuyama', ano: 2015, imagem: '/imagens/filme18.jpg' },
    { titulo: 'Pokémon: Volcanion e a Engenhosa Magearna', diretor: 'Kunihiko Yuyama', ano: 2016, imagem: '/imagens/filme19.jpg' },
    { titulo: 'Pokémon: Eu Escolho Você!', diretor: 'Kunihiko Yuyama', ano: 2017, imagem: '/imagens/filme20.jpg' }
  ];

  const insert = db.prepare('INSERT INTO filmes (titulo, diretor, ano, imagem) VALUES (?, ?, ?, ?)');
  const insertMany = db.transaction((filmes) => {
    for (const filme of filmes) insert.run(filme.titulo, filme.diretor, filme.ano, filme.imagem);
  });
  insertMany(filmesIniciais);
}

module.exports = db;