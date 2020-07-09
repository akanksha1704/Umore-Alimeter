const express = require("express");
const path = require("path");
// const fs = require("fs");
const app = express();
// getting-started.js
const mongoose = require('mongoose');
const bodyparser=require('body-parser');
const { time } = require("console");
const { resolveSrv } = require("dns");
mongoose.connect('mongodb://localhost/contactRestaurant', {useNewUrlParser: true});
// mongoose.connect('mongodb://localhost/reserveTable', {useNewUrlParser: true});
// mongoose.connect('mongodb://localhost/cartItem', {useNewUrlParser: true});
const port = 8000;


// var engines = require('consolidate');


//define moongoose schema
var contactSchema = new mongoose.Schema({    
    email: String,
    exampletextarea:String
  });

  var Contact = mongoose.model('Contact', contactSchema)

var reserveSchema = new mongoose.Schema({    
    name: String,
    number: Number,
    NoOfGuests: Number,
    date: String,
    time: String,
  });
  var Reserve = mongoose.model('Reserve', reserveSchema)

var cartSchema = new mongoose.Schema({    
    name: String,
    usercontact:Number,
    useraddress:String,
    landmark:String,
    userpin:Number,
    specific:String,
    payment:Boolean
  });
  var Cart = mongoose.model('Cart', cartSchema)

app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug')  //Set the template engine as pug

// app.engine('html', engines.mustache);
// app.set('view engine', 'html');

app.set('views', path.join(__dirname, 'views')) // Set the views directory

 // ENDPOINTS
app.get('/', (req, res)=>{
    const params = {};
    res.status(200).render('index.pug',params);
})
app.get('/reserve.pug', (req, res)=>{
    const params = {};
    res.status(200).render('reserve.pug',params);
})
app.get('/cart.pug', (req, res)=>{
    const params = {};
    res.status(200).render('cart.pug',params);
})
// app.get('/contact', (req, res)=>{
//     const params = { };
//     res.status(200).render('contact.pug', params);
// })
app.post('/', (req, res)=>{
     var myData = new Contact(req.body);
     myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
    // res.status(200).render('contact.pug');
});

app.post('/reserve', (req, res)=>{
    var myData = new Reserve(req.body);
    myData.save().then(()=>{
       res.send("This item has been saved to the database")
   }).catch(()=>{
       res.status(400).send("Item was not saved to the database")
   });
   // res.status(200).render('contact.pug');
});

app.post('/cart', (req, res)=>{
    var myData = new Cart(req.body);
    myData.save().then(()=>{
       res.send("This item has been saved to the database")
   }).catch(()=>{
       res.status(400).send("Item was not saved to the database")
   });
   // res.status(200).render('contact.pug');
});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});