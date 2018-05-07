const
  express = require('express'),
  ItemsRouter = express.Router(),
  mongoose = require('./../db/mongoose.js'),
  Item = require('./../models/item.js')

ItemsRouter.use(express.static('static'));

ItemsRouter.get('/', (req, res)=>{
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

ItemsRouter.delete('/:id', (req, res)=>{
    let id = req.params.id;
    Item.findByIdAndRemove(id).then(removedItem=>{
      // res.send(removedItem);//Postman testing
      res.redirect('/packinglist');
    }, ()=>{
      res.status(400).send('400 Bad Request');
    });
  });

ItemsRouter.put('/:id', (req, res)=>{
    let id = req.params.id;
    let updatedItem = req.body.item;
    let updatedDetails = req.body.details;
    Item.findByIdAndUpdate(id, {$set:{item:updatedItem, details:updatedDetails}}).then(updatedItem=>{
      // res.send(updateItem);//Postman testing
      res.redirect('/packinglist');
    }, ()=>{
      res.status(400).send('400 Bad Request');
    });
  });


module.exports = ItemsRouter;
