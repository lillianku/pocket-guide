const
  express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('./db/mongoose.js'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  Place = require('./models/place.js'),
  Item = require('./models/item.js'),
  PlacesRouter = require('./routes/places.js'),
  ItemsRouter = require('./routes/packing.js')


//MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  };
}));
app.use('/places', PlacesRouter);
app.use('/packinglist', ItemsRouter);
app.set('view engine', 'ejs');
app.use(express.static('static'));

app.get('/', (req, res)=>{
  res.render('home.ejs');
});

app.listen(port, ()=>{
  console.log('Server is working');
});
