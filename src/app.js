require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);

const filmeRoutes = require('./routes/filmeRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());

// Mantendo suas rotas de arquivos estáticos
app.use(express.static(path.join(__dirname, '..'))); 
app.use('/imagens', express.static(path.join(__dirname, '..', 'imagens')));

app.use(session({
  store: new SQLiteStore({ db: 'app.db', dir: './database' }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 30, httpOnly: true, secure: false },
}));

app.use('/filmes', filmeRoutes); 
app.use('/api', authRoutes);

module.exports = app;