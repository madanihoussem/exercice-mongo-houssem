const Blog = require("../models/blogModel");

const create = async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = await Blog({ title, content });
    blog.save().then((saveBlog) => {
      res.status(201).json(saveBlog);
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Erreur lors de la sauvegarde de l'blog` });
  }
};
const showBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).render("list", { entity: blogs });
  } catch (error) {
    res.json({ message: "Pas d'blog trouvé" });
  }
};
const showBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({'_id' : req.params.id});
    res.status(200).render("show", { entity: blog });
  } catch (error) {
    res.json({ message: "Blog non trouvé" });
  }
};
const editBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const { title, content } = req.body
    const blog = await Blog.updateOne({'_id' : id}, { title, content});
    res.json({message: "Update Done ✅"});
  } catch (error) {
    res.json({ message: "Blog non trouvé" });
  }
};
const deleteBlog = async (req, res) => {
  const { id } = req.params.id;
  try {
    const blog = await Blog.findOne(id);
    const del = await Blog.deleteOne(id);
    res.status(200).render("delete", { entity: blog, del: del });
  } catch (error) {
    res.json({ message: "Blog non trouvé" });
  }
};
const comments = async (req, res) => {
  try {
    const { id } = req.params;
    const { author, content } = req.body;
    await Blog.findById(id)
      .then((blog) => {
        if (!blog) {
          return res.status(404).json({ error: "Blog introuvable" });
        }
        const comment = { author, content };
        blog.comments.push(comment);
        return blog.save();
      })
      .then((updateBlog) => {
        res.json(updateBlog);
      });
  } catch (error) {
    res.status(500).json({ error: `Erreur lors de l'ajout du commentaire` });
  }
};

const applaud = async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.findById(id)
      .then((blog) => {
        if (!blog) {
          return res.status(404).json({ error: "Blog introuvable" });
        }
        blog.applauseCount++;
        return blog.save();
      })
      .then((updateBlog) => res.json(updateBlog));
  } catch (error) {
    res
      .status(500)
      .json({ error: `Erreur lors de l'ajoout d'applaudissements` });
  }
};
module.exports = { create, comments, applaud, showBlog, showBlogs, deleteBlog, editBlog };
