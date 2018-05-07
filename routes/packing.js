const
  express = require('express'),
  ItemsRouter = express.Router(),
  mongoose = require('./../db/mongoose.js'),
  Item = require('./../models/item.js')

ItemsRouter.use(express.static('static'));

ItemsRouter.get("/", (req, res)=>{
  Item.find().then(items=>{
      res.render('packing.ejs', {
        templateItems: items
      });
      // res.send(items);//Postman testing
    }, error=>{
      res.status(400).send('400 Bad Request');
    });
});

ItemsRouter.post('/', (req, res) => {
    let newItem = new Item({
      item: req.body.item,
      details: req.body.details,
    });
    newItem.save().then(item => {
      res.redirect('/packinglist');
    }, error => {
      res.status(400).send('400 BAD REQUEST');
    });
});


module.exports = ItemsRouter;
