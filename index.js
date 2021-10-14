const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
app.use(express.urlencoded());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const Filme = require("./models/filme");

app.get("/", async (req, res) => {
  const filmes = await Filme.findAll();
  res.render("index", {
    filmes,
  });
});
app.get("/senha", (req, res) => {
  res.render("senha");
});
app.get("/cadastro", (req, res) => {
  res.render("cadastro");
});
app.get("/criar", (req, res) => {
  res.render("criar");
});
app.post("/criar", async (req, res) => {
  const { nome, descricao, imagem } = req.body;
  
  const filme = await Filme.create({
    nome,
    descricao,
    imagem,
  });

  res.render("criar", {
    filme,
  });
});
app.post("/criar", async (req, res) => {
  const { nome, descricao, imagem } = req.body;

  if (!nome) {
    res.render("criar", {
      mensagem: "Nome é obrigatório",
    });
  }

  if (!imagem) {
    res.render("criar", {
      mensagem: "Imagem é obrigatório",
    });
  }

  try {
    const filme = await Filme.create({
      nome,
      descricao,
      imagem,
    });

    res.render("criar", {
      filme,
    });
  } catch (err) {
    console.log(err);

    res.render("criar", {
      mensagem: "Ocorreu um erro ao cadastrar o Filme!",
    });
  }
});
app.get("/editar/:id", async (req, res) => {
  const filme = await Filme.findByPk(req.params.id);

  if (!filme) {
    res.render("editar", {
      mensagem: "Filme não encontrado!",
    });
  }

  res.render("editar", {
    filme,
  });
});
app.post("/editar/:id", async (req, res) => {
  const filme = await Filme.findByPk(req.params.id);

  const { nome, descricao, imagem } = req.body;

  filme.nome = nome;
  filme.descricao = descricao;
  filme.imagem = imagem;

  const filmeEditado = await filme.save();

  res.render("editar", {
    filme: filmeEditado,
    mensagemSucesso: "Filme editado com sucesso!",
  });
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
