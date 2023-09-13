const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config =  require('./config/config').get(process.env.NODE_ENV);
const app = express();
const { auth } = require('./middleware/auth');

const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

const { User } = require('./models/user');
const { Book } = require('./models/book');

app.use(bodyParser.json());
app.use(cookieParser());

// Run this code in production
app.use(express.static('client/build'));

app.use(cors({
   allowedHeaders: [
     'Origin', 'X-Requested-With',
     'Content-Type', 'Accept',
     'X-Access-Token', 'Authorization',
   ],
   methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
   preflightContinue: true,
   origin: '*',
 })); 

// GET //
app.get('/api/auth',auth,(req,res) => {
   res.json({
      isAuth:true,
      id:req.user._id,
      email:req.user.email,
      name:req.user.name,
      lastname:req.user.lastname
   })
});

app.get('/api/logout',auth,(req,res) => {

      req.user.deleteToken(req.token,(err,user) => { 
         if(err)  return  res.status(400).send(err);     
         res.sendStatus(200);  
      })

});

 app.get('/api/getBook',async (req,res) => {
    //localhost:3001/api/getBook?id=64d3f1ba139aea042e5477fc
    let id =  req.query.id;
    try {
         const doc = await Book.findById(id).exec();
         res.status(200).send(doc);
        
     } catch (err) {
        res.status(400).send(err);
     }
});


app.get('/api/books',async (req,res) => {
    //localhost:3001/api/books?skip=3&limit=2&order=asc
    let skip =  parseInt(req.query.skip);
    let limit =  parseInt(req.query.limit);
    let order =  req.query.order;
    try {
        const docs = await Book.find().skip(skip).sort({_id:order}).limit(limit).exec();
        res.status(200).send(docs);
       
     } catch (err) {
         res.status(400).send(err);
     }
});

app.get('/api/getReviewer', async(req,res) => {
   //localhost:3001/api/getReviewer?id=64e0bc5bd3a9bc810be1f80c

   let id = req.query.id;
   try {
      const user = await User.findById(id).exec();
      res.status(200).json({
         name: user.name,
         lastname:user.lastname
      })
   } catch (err) {
       res.status(400).send(err);
   }

});

app.get('/api/users',async (req,res) => {
   //localhost:3001/api/users?skip=0&limit=2&order=asc
   let skip =  parseInt(req.query.skip);
   let limit =  parseInt(req.query.limit);
   let order =  req.query.order;
   try {
       const users = await User.find().skip(skip).sort({_id:order}).limit(limit).exec();
       res.status(200).send(users);
      
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/api/user_posts', async (req,res) => {

   let userBooks = [];
   try {
    userBooks = await Book.find({ownerId:req.query.user}).exec();
     res.status(200).send(userBooks);

   } catch (err) {
     res.status(400).send(err);
   }

});


// POST //
app.post('/api/book',async (req,res) => {

    const book = new Book(req.body);
    try {
       await book.save();
       res.status(200).json({post:true, bookId:book._id});
    } catch (err) {
       res.status(400).send(err);
    }
});

// UPDATE //
app.post('/api/book/update',async (req,res) => {
   try {
      const book = await Book.findByIdAndUpdate(req.body._id,req.body,{new:true}).exec();
      res.status(200).json({success:true, doc:book});
   } catch (err) {
      res.status(400).send(err);
   }
});

// DELETE //
app.delete('/api/book/delete',async (req,res) => {
   let id = req.query.id;
   try {
      await Book.findByIdAndRemove(id).exec();
      res.status(200).send(true);
   } catch (err) {
      res.status(400).json(err);
   }
});


app.post('/api/register',async (req,res) => {

   const user = new User(req.body);
   try {
      await user.save();
      res.status(200).json({
         success:true,
         user: user
      });
   } catch (err) {
      res.json({
         success:false
      });
   }

});

app.post('/api/login',async (req,res) => {
      try {
         const user = await User.findOne({'email':req.body.email}).exec();
         if(!user) return res.json({isAuth:false, message:'Auth failed, email not found'});

         user.comparePassword(req.body.password,(err,isMatch)=> {
               if (err) return res.status(400).send(err);
               if(!isMatch) return res.json({isAuth:false, message:'Wrong password'});
               // generate token and send response to client 

               user.generateToken((err,user) => {
                 if (err) return res.status(400).send(err);
                 res.cookie('authToken',user.token).json({
                     isAuth:true,
                     id: user._id,
                     email:user.email
                 })

               });
         });

      } catch (err) {
         console.log(err);
         res.status(400).send(err);
      }
});


if(process.env.NODE_ENV === 'production') {
      const path = require('path');
      app.get('/*',(req,res) => {
            res.sendfile(path.resolve(__dirname,'../client','build','index.html'));
      });
}


const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});