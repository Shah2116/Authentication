require(`dotenv`).config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const env = require("dotenv");
const mongoose = require("mongoose");
// Hashing password
// const md5 = require("md5");
// Hashing and Salting password
const bcrypt = require("bcrypt");

const app = express();



app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

 mongoose.connect("mongodb://0.0.0.0:27017/Auth");
const User = require("./model/user");



app.get("/", (req, res)=>{
    res.render("home");
})
app.get("/login", (req, res)=>{
    res.render("login");
})

app.get("/register", (req, res)=>{
    res.render("register");
});

app.post("/register", (req, res) =>{
    bcrypt.hash(req.body.password, 10).then(function(hash) {
        const newUser = new User ({
            email : req.body.username,
            password :hash
        });
        newUser.save().then(() =>{
            res.render(`secrets`);
        }).catch((err) =>{
            console.log("no connection");
        })
    });
  
    });
     
    app.post("/login", (req, res)=> {
     const username = req.body.username;
     const password = req.body.password;
     User.findOne({email:username}).then((userExits)=>{
        if(userExits)
            bcrypt.compare(req.body.password, userExits.password).then(function(result){
                if(result === true )
                    res.render(`secrets`);
            }).catch((err) =>{
                console.log("passward is invalid");
            });
     }).catch((err) =>{
        res.status(100).send("Invalid data");
     });

    });
    const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})