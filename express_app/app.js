const express=require("express");
const Web3=require("web3");
const HDwalletprovider=require("truffle-hdwallet-provider");
const bparser=require("body-parser");
const session=require("express-session");
const mongoStore=require("connect-mongo")(session);
const mongoose=require('mongoose');

const signupr=require("./controllers/signupr");
const signupd=require("./controllers/signupd");
const login=require("./controllers/login");
const homer=require("./controllers/homer");
const homed=require("./controllers/homed");
const test=require("./controllers/test");

const abi=require("./user_contract").abi2;
const address=require("./user_contract").address2;

const CurrentRide=require("./models/Auction");

mongoose.connect('mongodb://admin:Annie123@ds353457.mlab.com:53457/p2p', {useNewUrlParser: true});

const app=express();

app.set('view engine','ejs');
app.use(session({
    key:"user_sid",
    secret:"sometext",
    resave:false,
    saveUninitialized: false,

}));
app.use(express.static('./public'));
app.use(bparser.urlencoded({extended:true}));
app.use(bparser.json());

app.get("/",async (req,res)=>{
    res.render("index",{message:null});

});

app.get("/signup",async(req,res)=>{
    
    res.render("sign");
});


app.listen(3000,()=>{
    console.log("listening to PORT 3000");
});

test(app);
signupr(app);
signupd(app);
login(app);
homer(app);
homed(app);


