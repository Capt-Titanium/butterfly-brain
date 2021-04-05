const router = require("express").Router();
const Article = require("../models/article.model");

router.post(
  "/article",
  async (req, res) => {
    try {
      const article = new Article(req.body);
      await article.save();
      res.status(201).send({ _id: article._id });
    } catch {
      res.status(500).send({
        error: "error while submitting article.",
      });
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send({
        error: error.message,
      });
    }
  }
);

router.get("/article", async (req, res) => {
  try {
    const article = await Article.find({});
    res.send(article);
  } catch {
    res.status(500).send({ error: "error while loading articles" });
  }
});

router.get("/article/:id", async (req, res) => {
  try {
    const result = await Article.findById(req.params.id);
    res.send(result.article);
  } catch {
    res.status(400).send({ error: "error opening this article." });
  }
});

module.exports = router;
