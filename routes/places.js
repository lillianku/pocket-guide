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
      // retrieve message from mongo
      res.render('place.ejs', {
        templatePlace: place
        //templateMessage: message
      });
      //res.send(trip);//Postman testing
      //retrieve message from mongo
    }, error => {
      res.status(400).send('400 Bad Request')
    });
  });

PlacesRouter.delete('/:id', (req, res)=>{
    let id = req.params.id;
    Place.findByIdAndRemove(id).then(removedPlace=>{
      // res.send(removedPlace);//Postman testing
      res.redirect('/places');
    }, ()=>{
      res.status(400).send('400 Bad Request');
    });
  });

PlacesRouter.put('/:id', (req, res)=>{
    let id = req.params.id;
    let updatedCountry = req.body.country;
    let updatedCity = req.body.city;
    let updatedName = req.body.name;
    let updatedURL = req.body.url;
    let updatedNotes = req.body.notes;
    Place.findByIdAndUpdate(id, {$set:{country:updatedCountry, city:updatedCity, name:updatedName, url:updatedURL, notes:updatedNotes}}, {new:true, new:true, new:true, new:true, new:true}).then(updatedPlace=>{
      res.render('place.ejs', {
        templatePlace:updatedPlace
      });
    }, ()=>{
      res.status(400).send('400 Bad Request');
    });
  });


module.exports = PlacesRouter;
