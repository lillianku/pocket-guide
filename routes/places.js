const
  express = require('express'),
  PlacesRouter = express.Router(),
  mongoose = require('./../db/mongoose.js'),
  Place = require('./../models/models.js')

PlacesRouter.get("/", (req, res)=>{
  Place.find().then(places=>{
      res.render('places.ejs', {
        templatePlaces: places
      });
      // res.send(places);//Postman testing
    }, error=>{
      res.status(400).send('400 Bad Request');
    });
});

PlacesRouter.post('/', (req, res) => {
    let newPlace = new Place({
      country: req.body.country,
      city: req.body.city,
      name: req.body.name,
      url: req.body.url,
      notes: req.body.notes
    });
    newPlace.save().then(place => {
      res.redirect('/places');
    }, error => {
      res.status(400).send('400 BAD REQUEST');
    });
});




module.exports = PlacesRouter;
