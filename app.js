const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/WikiDB', {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
  console.log("CONNECTION OPEN!!!");
}).catch(err => {
  console.log("OH NO ERROR!!!");
  console.log(err);
})

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const articleSchema = new mongoose.Schema ({
  title: String,
  content: String
});

const Article = mongoose.model("Article", articleSchema);


// // Get request (Fetches data)
// app.get("/articles", function(req, res){
//   Article.find()
//   .then(data => res.send(data))
//   .catch(err => res.send(err))
// });
//
// // Post request
// app.post("/articles", function(req, res){
//
//   const newArticle = new Article({
//     title: req.body.title,
//     content: req.body.content
//   });
//   newArticle.save()
//   .then(data => res.send("Successfully added a new article."))
//   .catch(err => res.send(err))
// });
//
// app.delete("/articles", function(req, res){
//   Article.deleteMany()
//   .then(data => res.send("Collections Successfully emptied!"))
//   .catch(err => res.send(err));
// })

//Refactoring
app.route("/articles")
  .get(function(req, res){
    Article.find()
    .then(data => res.send(data))
    .catch(err => res.send(err))
  })
  .post(function(req, res){
      const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
      });
      newArticle.save()
      .then(data => res.send("Successfully added a new article."))
      .catch(err => res.send(err))
    })
  .delete(function(req, res){
      Article.deleteMany()
      .then(data => res.send("Collections Successfully emptied!"))
      .catch(err => res.send(err));
    });


  //Working on specific articles
  app.route("/articles/:specificTitle")
    .get(function(req, res){
      const specificTitle = req.params.specificTitle;

      Article.findOne({title: specificTitle})
      .then(data => res.send(data))
      .catch(err => res.send(err))
    })
    .post(function(req, res){
      const specificTitle = req.params.specificTitle;
        Article.findOneAndUpdate(
          {name: specificTitle}, {content:req.body.content}, {new: true})
        .then(data => res.send(`${specificTitle} updated`))
        .catch(err => res.send(err))
      })
    .delete(function(req, res){
        Article.deleteMany()
        .then(data => res.send("Collections Successfully emptied!"))
        .catch(err => res.send(err));
      });









const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
