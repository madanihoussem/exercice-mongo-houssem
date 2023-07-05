const {
  create,
  comments,
  applaud,
  showBlog,
  editBlog,
  showBlogs,
  deleteBlog,
} = require("../controllers/blogController");
const Blog = require("../models/blogModel");

const router = require("express").Router();

router.get("/create", (req, res) => {
  res.render("create", { titre: "Blog", myroute: "blogs" });
});
router.get('/:id/show', showBlog)
router.put('/:id/edit', editBlog)
router.get('/:id/delete', deleteBlog)
router.get('/all', showBlogs)
router.post("/create", create);
router.get("/:id/comments", async (req, res) => {
  try {
    const id = req.params.id;
  const blog = await Blog.findById({_id:id});
  res.render("comments", { article });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
  
});
router.post("/:id/comments", comments);
router.post("/:id/applaud", applaud);

module.exports = router;
