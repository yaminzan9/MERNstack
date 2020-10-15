const { Router } = require("express");
const express = require("express");
const Articles = require("../models/articles");
const router = express.Router();


//REQUEST GET ALL ARTICLES
router.get('/', (req, res) => {
    Articles.find()
    .then(article => res.json(article))
    .catch(err => res.status(400).json(`Error: ${err}`))
});


//REQUEST ADD NEW ARTICLE 
router.post('/add', (req, res) => {
    const newArticle = new Articles({
        title: req.body.title,
        article: req.body.article,
        authorname: req.body.authorname
    })

    newArticle.save()
    .then(() => res.json("The new Article posted successfuly!"))
    .catch(err => res.status(400).json(`Error: ${err}`));
})

//REQUEST FIND ARTICLE BY ID 
router.get('/:id', (req, res) => {
    Articles.findById(req.params.id)
      .then(article => res.json(article))
      .catch(err => res.status(400).json(`Error: ${err}`))
})

//REQUEST FIND ARTICLE BY ID AND UPDATE
router.put("/update/:id", (req, res) => {
    Articles.findById(req.params.id)
    .then(article => {
        article.title = req.body.title;
        article.article = req.body.article;
        article.authorname = req.body.authorname;

        article
          .save()
          .then(() => res.json("The Article is UPDATED successfuly!"))
          .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

//REQUEST FIND ARTICLE BY ID AND DELETE
router.delete("/:id", (req, res) => {
    Articles.findByIdAndDelete(req.params.id)
      .then(() => res.json("This article is DELETED!"))
      .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports =router;