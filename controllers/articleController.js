const Article = require("../models/articleModel");

const create = async (req, res) => {
  const { title, content } = req.body;
  try {
    const article = await Article({ title, content });
    article.save().then((saveArticle) => {
      res.status(201).json(saveArticle);
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Erreur lors de la sauvegarde de l'article` });
  }
};
const showArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).render("list", { entity: articles });
  } catch (error) {
    res.json({ message: "Pas d'article trouvé" });
  }
};
const showArticle = async (req, res) => {
  try {
    const article = await Article.findOne({'_id' : req.params.id});
    res.status(200).render("show", { entity: article });
  } catch (error) {
    res.json({ message: "Article non trouvé" });
  }
};
const editArticle = async (req, res) => {
  const id = req.params.id;
  try {
    const { title, content } = req.body
    const article = await Article.updateOne({'_id' : id}, { title, content});
    res.json({message: "Update Done ✅"});
  } catch (error) {
    res.json({ message: "Article non trouvé" });
  }
};
const deleteArticle = async (req, res) => {
  const { id } = req.params.id;
  try {
    const article = await Article.findOne(id);
    const del = await Article.deleteOne(id);
    res.status(200).render("delete", { entity: article, del: del });
  } catch (error) {
    res.json({ message: "Article non trouvé" });
  }
};
const comments = async (req, res) => {
  try {
    const { id } = req.params;
    const { author, content } = req.body;
    await Article.findById(id)
      .then((article) => {
        if (!article) {
          return res.status(404).json({ error: "Article introuvable" });
        }
        const comment = { author, content };
        article.comments.push(comment);
        return article.save();
      })
      .then((updateArticle) => {
        res.json(updateArticle);
      });
  } catch (error) {
    res.status(500).json({ error: `Erreur lors de l'ajout du commentaire` });
  }
};

const applaud = async (req, res) => {
  try {
    const { id } = req.params;
    await Article.findById(id)
      .then((article) => {
        if (!article) {
          return res.status(404).json({ error: "Article introuvable" });
        }
        article.applauseCount++;
        return article.save();
      })
      .then((updateArticle) => res.json(updateArticle));
  } catch (error) {
    res
      .status(500)
      .json({ error: `Erreur lors de l'ajoout d'applaudissements` });
  }
};
module.exports = { create, comments, applaud, showArticle, showArticles, deleteArticle, editArticle };
