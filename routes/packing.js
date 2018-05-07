const
  express = require('express'),
  ItemsRouter = express.Router(),
  mongoose = require('./../db/mongoose.js'),
  Item = require('./../models/models.js')

ItemsRouter.get("/", (req, res)=>{
  res.render('packing.ejs');
});


module.exports = ItemsRouter;
