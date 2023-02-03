"use strict";

const sequelize = require("./database");
const S = require("sequelize");

// Asegurate que tu Postgres este corriendo!

const User = require("./user");

//---------VVVV---------  tu código aquí abajo  ---------VVV----------

class Article extends S.Model {
  // INSTACE METHODs
  truncate(length) {
    console.log(this.content.substring(0, length));
    return (this.content = this.content.substring(0, length));
  }
  //CLASS METHODs
  static findByTitle = function (titleParam) {
    return Article.findOne({
      where: {
        title: {
          [S.Op.like]: titleParam,
        },
      },
    });
  };
}
Article.init(
  {
    title: {
      type: S.STRING,
      allowNull: false,
    },
    content: {
      type: S.TEXT,
      allowNull: false,
    },
    version: {
      type: S.INTEGER,
      defaultValue: 0,
    },
    snippet: {
      type: S.VIRTUAL,
      get() {
        const content = this.getDataValue("content");
        //edge case
        if (!content) return (this.content = "");
        //getting the first 23 letters + ...
        return content.substr(0, 23).concat("...");
      },
    },
    tags: {
      type: S.ARRAY(S.STRING),
      defaultValue: [],
      get() {
        let tagsArr = this.getDataValue('tags')
        let tagsStr = tagsArr.join(', ').toString()
        return tagsStr
      },
    },
  },
  { sequelize, modelName: "article" }
);

//HOOKS
Article.beforeValidate((article, options) => {
  if (article.title.length <= 0) {
    throw new Error("Validation error");
  }
});

Article.beforeUpdate((article, options) => {
  article.version += 1;
});

// association one to many

Article.belongsTo(User, { as: "author" });

//---------^^^---------  tu código aquí arriba  ---------^^^----------

module.exports = Article;
