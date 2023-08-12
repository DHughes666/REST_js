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

app.get("/articles", function(req, res){
  Article.find()
  .then(data => res.send(data))
  .catch(err => res.send(err))
})

// python = new Article({
//   title: "Python",
//   content: "The dopest of all programming languages I know"
// });
//
// python.save().then(data => console.log(data))







const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
