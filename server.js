const
  express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('./db/mongoose.js'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  Place = require('./models/place.js'),
  Item = require('./models/item.js'),
  Message = require('./models/messages.js'),
  PlacesRouter = require('./routes/places.js'),
  ItemsRouter = require('./routes/packing.js'),
  http = require('http').Server(app),
  io = require('socket.io')(http)


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

app.get('/weather', (req, res)=>{
  res.render('weather.ejs');
});

app.post('/messages', (req, res)=>{
  let newMessage = new Message({
    name: req.body.name,
    message: req.body.message,
  });
  newMessage.save();
});

app.get('/messages', (req, res)=>{
  Message.find().then(messages=>{
      res.send(messages);//Postman testing
  });
});

io.on('connection', (socket)=>{
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});


http.listen(port, ()=>{
  console.log('Server is working');
});
