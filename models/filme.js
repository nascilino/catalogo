const database = require("../database");
const Sequelize = require("sequelize");
const Filme = database.define("filmes", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    //primari key
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: Sequelize.STRING,
  imagem: {
    type: Sequelize.STRING,
    allowNull: false,
  },
},
{
  freezeTableName: true,
  timestamps: false, 
  createdAt: false,
  updatedAt: false,
});

module.exports = Filme;