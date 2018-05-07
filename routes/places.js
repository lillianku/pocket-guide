const
  express = require('express'),
  PlacesRouter = express.Router(),
  mongoose = require('./../db/mongoose.js'),
  Place = require('./../models/models.js')

PlacesRouter.get("/", (req, res)=>{
  res.render('places.ejs');
});


module.exports = PlacesRouter;
