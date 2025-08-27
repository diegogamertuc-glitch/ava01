// index.js - API Estoque com SQLite (Knex)
const express = require('express');
const cors = require('cors');
const knexConfig = require('./knexfile').development;
const knex = require('knex')(knexConfig);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Validação simples
function validarProduto(body) {
  const erros = [];
  if (!body || typeof body !== 'object') erros.push('Corpo inválido.');
  const { nome, quantidade, preco } = body || {};
  if (!nome || typeof nome !== 'string') erros.push('Campo "nome" é obrigatório e deve ser string.');
  if (quantidade === undefined || isNaN(Number(quantidade))) erros.push('Campo "quantidade" é obrigatório e numérico.');
  if (preco === undefined || isNaN(Number(preco))) erros.push('Campo "preco" é obrigatório e numérico.');
  return erros;
}

// GET /produtos
app.get('/produtos', async (req, res) => {
  try {
    const itens = await knex('produtos').select('*').orderBy('id', 'asc');
    return res.json(itens);
  } catch (e) {
    return res.status(500).json({ erro: 'Falha ao listar produtos.' });
  }
});

// GET /produtos/:id
app.get('/produtos/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const item = await knex('produtos').where({ id }).first();
    if (!item) return res.status(404).json({ erro: 'Produto não encontrado.' });
    return res.json(item);
  } catch (e) {
    return res.status(500).json({ erro: 'Falha ao buscar produto.' });
  }
});

// POST /produtos
app.post('/produtos', async (req, res) => {
  const erros = validarProduto(req.body);
  if (erros.length) return res.status(400).json({ erros });

  try {
    const { nome, quantidade, preco } = req.body;
    const [id] = await knex('produtos').insert({
      nome,
      quantidade: Number(quantidade),
      preco: Number(preco)
    });
    const criado = await knex('produtos').where({ id }).first();
    return res.status(201).json(criado);
  } catch (e) {
    return res.status(500).json({ erro: 'Falha ao cadastrar produto.' });
  }
});

// PUT /produtos/:id
app.put('/produtos/:id', async (req, res) => {
  const id = Number(req.params.id);
  const erros = validarProduto(req.body);
  if (erros.length) return res.status(400).json({ erros });

  try {
    const existe = await knex('produtos').where({ id }).first();
    if (!existe) return res.status(404).json({ erro: 'Produto não encontrado.' });

    const { nome, quantidade, preco } = req.body;
    await knex('produtos').where({ id }).update({
      nome,
      quantidade: Number(quantidade),
      preco: Number(preco),
      updated_at: knex.fn.now()
    });

    const atualizado = await knex('produtos').where({ id }).first();
    return res.json(atualizado);
  } catch (e) {
    return res.status(500).json({ erro: 'Falha ao atualizar produto.' });
  }
});

// DELETE /produtos/:id
app.delete('/produtos/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deletados = await knex('produtos').where({ id }).del();
    if (!deletados) return res.status(404).json({ erro: 'Produto não encontrado.' });
    // Responder 200 com JSON (evita bug de 204 em algumas versões do Axios/RN)
    return res.status(200).json({ ok: true, idRemovido: id });
  } catch (e) {
    return res.status(500).json({ erro: 'Falha ao excluir produto.' });
  }
});

app.get('/', (req, res) => res.send('Servidor da API de Estoque (SQLite) rodando.'));
app.listen(PORT, () => console.log(`Servidor da API rodando em http://localhost:${PORT}`));
