var bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const express = require('express');
const app = express();
const cors = require('cors');


require("dotenv").config();

//const connectDb = require('./db/database');
const port = process.env.PORT || 5000;
const User = require('./db/user.model');
const Singlefamily = require('./db/user.modelsf');
const Singlefamily2 = require('./db/user.sftwentytwo');
const PrototypeJS = require('./db/user.modelproto');
const { default: mongoose } = require('mongoose'); 
// configure express to use cors()
// ------------------------------------------------------------------

const bodyParser = require('body-parser');
const { nextTick } = require('process');
app.use( bodyParser.json()); // to support JSON-encoded bodies 

app.use( bodyParser.urlencoded({ extended: true})); //to support URL-encoded bodies

app.use(cors());
app.use(express.json()); // meaning - we are going to move data around in the json format...

mongoose.connect('mongodb+srv://nw3377:Whi31560@cluster0.cppma.mongodb.net/nw3377?retryWrites=true&w=majority',
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const router = express.Router();

//const cookieParser = require('cookie-parser');


//app.use(cookieParser());

// router.get('/', (req,res) => {
  //res.status(200).json({message: 'Get Goals' })
//})

//app.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "X-Requested-With");
 // next();
 // });




// Import the routes
//const userRoutes = require("./db/routeruser")

// Using routes
//app.use('/api', userRoutes) 








app.get('/users', async (req, res) => { //this is right 
  User.find({}, function (err, users){
    if (err){
    res.send('something went really wrong')
      next();
    }
  res.json(users);

  }); 

});

app.get('/singlefamilys', async (req, res) => { //this is right, year 2021/2022
  Singlefamily.find({}, function (err, singlefamilys){
    if (err){
    res.send('something went really wrong')
      next();
    }
  res.json(singlefamilys);

  }); 

});


app.get('/prototypeJS', async (req, res) => { //this is right, year 2021/2022
  PrototypeJS.find({}, function (err, prototypeJS){
    if (err){
    res.send('something went really wrong')
      next();
    }
  res.json(prototypeJS);

  }); 

});


app.get('/singlefamily2s', async (req, res) => { //this is right, year 2022
  Singlefamily2.find({}, function (err, singlefamily2){
    if (err){
    res.send('something went really wrong')
      next();
    }
  res.json(singlefamily2);
 // res.send(singlefamily2);

  }); 

});








app.get('/singlefamily', async (req, res) => { 
    const singlefamily = await Singlefamily.find();
  
    res.json(singlefamily);
  });

  app.get('/singlefamily14', async (req, res) => { 
    const singlefamily = await Singlefamily.find();
  
    res.json(singlefamily);
  });

  app.get('/condos', async (req, res) => { 
    const condos = await Condo.find();
  
    res.json(condos);
  });

  app.get('/multis', async (req, res) => { 
    const multis = await Multifamily.find();
  
    res.json(multis);
  });

  app.get('/commercial', async (req, res) => { 
    const commercial = await Commercial.find();
  
    res.json(commercial);
  });



////////////////////////////////////////////////////////////////////////////////////////////////



app.post('/user/create', async (req, res) => {
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword
        })
        res.json({ status: 'OK'})
    } catch (err) {
        res.json({ status: 'error', error: err.message })
    }
}) 





app.post('user/login/cvs', async (req, res) => {
    const user = await User.findOne({ email: req.body.email})
    if (!user) return { status: 'error', error: 'Invalid Login'}
   // const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

    if (user){
        const token = jwt.sign(
            {
                //name: user.name,
                email: user.email
            },
            'secret123'
        )

        return res.json({ status: 'OK', user: token })
    } else{
        return res.json({ status: 'error', user: false})
    }
})





///////////////////////////////////////////////////////////////////////////////////////////////







app.post('/user/create/cvs', async (req, res) => { //this is right.
    console.log(req.body);
  try{
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
       // balance: req.body.balance
      }) 
      res.json(user);
      console.log('status ok');
        }catch(err){
        console.log('status error, error duplicate email');
    }
  });


  app.post('/user/create/populatequote', async (req, res) => { //this is right.
    console.log(req.body);
  try{
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
       // balance: req.body.balance
      }) 
      res.json({ status: 'ok'})

        }catch(err){

       res.json({ status: 'error', error: 'Duplicate Email'})
    }

  });








app.post('/user/login', async (req, res) => { //this is right
    const user = await User.findOne({
        email: req.body.email
        //password: req.body.password
    })
    res.json(user);
    if (user){
        console.log('status ok') 
    }else{
        console.log('status error, no email available')
    }
})

app.post('/user/logout', async (req, res) => { //this is right
    const user = await User.findOne({
        email: req.body.email
        //password: req.body.password
    })
    res.json(user);
    if (user){
        console.log('status ok') 
    }else{
        console.log('status error, no email available')
    }
})



app.post('/user/balance', async (req,res) => {
    const token = req.headers['x-access-token']
    try{
        //const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email;
    
    const user = await User.findOne(
        {email: email}
    )
    //return res.json({status = 'ok', balance: user.balance})
    } catch(error) {
    res.json({status: 'error', error: 'invalid token'})
}
})




app.get("/user/balance", async (req, res) => {
    try {
        let myquery = { email: req.params.email, balance: req.params.balance };
    const user = await User.updateOne(myquery, {$set: {balance: req.body.balance}}
        )
    return console.log('1 document updated'); // no matter what 
    res.json(result);
    //res.json(users);
    }catch(error){
        console.log('status error');
    }
  });





  






app.get('/users-delete', async (req, res) => {
  await User.deleteMany({}).then(() => console.log('Users deleted'));

  res.send('Users deleted \n');
});

app.get('/', (req, res) => {
  res.send('Hello from Node.js app');
});

// start server
// -----------------------
app.listen(process.env.PORT || 5000, function () {
  console.log('Running on port 5000!');
 // connectDb().then(() => console.log('MongoDb connected'));
});