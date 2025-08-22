import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// "Banco de dados" em memória (vai resetar ao reiniciar o servidor)
let produtos = [
  { id: 1, nome: "Arroz", quantidade: 10, preco: 20.5 },
  { id: 2, nome: "Feijão", quantidade: 5, preco: 12.0 },
  { id: 3, nome: "Macarrão", quantidade: 8, preco: 8.9 }
];

// Função auxiliar para gerar IDs únicos
function gerarId() {
  return produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
}

// --- ROTAS CRUD ---

// GET /produtos - lista todos
app.get("/produtos", (req, res) => {
  res.json(produtos);
});

// GET /produtos/:id - retorna 1 produto
app.get("/produtos/:id", (req, res) => {
  const produto = produtos.find(p => p.id === parseInt(req.params.id));
  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }
  res.json(produto);
});

// POST /produtos - adiciona novo
app.post("/produtos", (req, res) => {
  const { nome, quantidade, preco } = req.body;
  if (!nome || quantidade == null || preco == null) {
    return res.status(400).json({ erro: "Campos obrigatórios: nome, quantidade, preco" });
  }
  const novoProduto = { id: gerarId(), nome, quantidade: Number(quantidade), preco: Number(preco) };
  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

// PUT /produtos/:id - edita
app.put("/produtos/:id", (req, res) => {
  const produto = produtos.find(p => p.id === parseInt(req.params.id));
  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }
  const { nome, quantidade, preco } = req.body;
  if (nome) produto.nome = nome;
  if (quantidade != null) produto.quantidade = Number(quantidade);
  if (preco != null) produto.preco = Number(preco);

  res.json(produto);
});

// DELETE /produtos/:id - remove
app.delete("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }
  const removido = produtos.splice(index, 1);
  res.json(removido[0]);
});

// --- Inicia o servidor ---
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor da API rodando em http://localhost:${PORT}`);
});
