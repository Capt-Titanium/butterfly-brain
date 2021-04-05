const router = require("express").Router();
const Article = require("../models/article.model");
const mongoose = require("mongoose");

//get all articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "error while loading articles" });
  }
});

//get one article
router.get("/:id", async (req, res) => {
  try {
    const post = await Article.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "error opening this article." });
  }
});

//create article
router.post("/", async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({
      message: "error while submitting article.",
    });
  }
});

//update article
router.patch("/:id", async (req, res) => {
  const { title, author, content, imageurl } = req.body;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(500).send(`No article with id: ${id}`);

  const updatedarticle = {
    title,
    author,
    content,
    imageurl,
    _id: id,
  };

  await Article.findByIdAndUpdate(id, updatedarticle, { new: true });

  res.json(updatedarticle);
});

//delete post
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(500).send(`No article with id: ${id}`);

  await Article.findByIdAndRemove(id);

  res.json({ message: "article deleted successfully" });
});

//like post
router.patch("/:id/likepost", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(500).send(`No article with id: ${id}`);

  const article = await Article.findById(id);

  const updatedarticle = await Article.findByIdAndUpdate(
    id,
    { likeCount: article.likeCount + 1 },
    { new: true }
  );

  res.json(updatedarticle);
});

module.exports = router;
