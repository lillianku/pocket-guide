const
  express = require('express'),
  PlacesRouter = express.Router(),
  mongoose = require('./../db/mongoose.js'),
  Place = require('./../models/place.js')

PlacesRouter.use(express.static('static'));

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

PlacesRouter.get('/:id', (req, res)=>{
    let id = req.params.id;
    Place.findById(id).then(place=>{
      res.render('place.ejs', {
        templatePlace: place
      });
      //res.send(trip);//Postman testing
    }, error => {
      res.status(400).send('400 Bad Request')
    });
  });

PlacesRouter.delete('/:id', (req, res)=>{
    let id = req.params.id;
    Place.findByIdAndRemove(id).then(removedPlace=>{
      // res.send(removedMessage);//Postman testing
      res.redirect('/places');
    }, ()=>{
      res.status(400).send('400 Bad Request');
    });
  });



module.exports = PlacesRouter;
