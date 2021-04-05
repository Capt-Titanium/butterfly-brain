const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageurl: { type: String, required: true },
});

module.exports = Article = mongoose.model("article", articleSchema);
