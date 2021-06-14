const express = require("express");
const ejs = require("ejs");
const articleRouter = require("./routes/articles");
const Article = require("./models/article");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/BadalDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use("/articles", articleRouter);
app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", {
    articles: articles,
  });
});
app.listen(port, () => {
  console.log("server started!");
});
