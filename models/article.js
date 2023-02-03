"use strict";

const sequelize = require("./database");
const S = require("sequelize");

// Asegurate que tu Postgres este corriendo!

const User = require("./user");

//---------VVVV---------  tu código aquí abajo  ---------VVV----------
class Article extends S.Model {}
Article.init({
    title: {
        type: S.STRING,
        allowNull: false,
      },
      content: {
        type: S.TEXT,
        allowNull: false,
      }
}, { sequelize, modelName: "article" });

Article.beforeValidate((article, options) => {
        if (article.title.length <= 0){ throw new Error("Validation error")};
  });
//---------^^^---------  tu código aquí arriba  ---------^^^----------

module.exports = Article;
