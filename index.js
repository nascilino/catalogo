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

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
