const express = require("express");
const router = express.Router();

const Article = require("../models/article");
const User = require("../models/user");

// GET ALL
router.get("/articles", (req, res, next) => {
  Article.findAll()
    .then((article) => res.send(article))
    .catch(next);
});

//GET ONE BY ID
router.get("/articles/:id", (req, res, next) => {
  Article.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((article) => {
      if (!article) res.status(404);
      res.send(article);
    })
    .catch(next);
});


//POST 
router.post("/articles", (req, res, next) => {
  if (!req.body.content || req.body.content.length <= 0)
    res.status(500).send({ title: "Este articulo no debería ser permitido" });
  Article.create(req.body)
    .then((article) => {
      res.status(201).send({
        message: "Created successfully",
        article: article,
      });
    })
    .catch(next);
});


//UPDATE
router.put("/articles/:id", (req, res, next) => {
  Article.findByPk(req.params.id).then((article) => {
    if (!article) {
      return res.status(404).send({ message: "article not found" });
    }
    article
      .update(req.body)
      .then((article) => {
        res.status(200).send({
          message: "Updated successfully",
          article: article,
        });
      })
      .catch((error) => {
        res.status(500).send({ message: "Error updating article", error });
      });
  });
});

//EXTRA FOR FUN 
//DELETE

router.delete("/articles/:id", (req, res, next) => {
    Article.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => res.sendStatus(202))
      .catch(next);
  });

module.exports = router;
