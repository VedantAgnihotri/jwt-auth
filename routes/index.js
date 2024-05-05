var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const userModel = require("./users");

router.get("/", (req, res)=>{
  res.render("index");
})

router.post("/signup", async(req, res)=>{
  const {name, email, password, age} = req.body;

  bcrypt.genSalt(10, (err, salt)=>{
    if(err){throw err};
    bcrypt.hash(password, salt, async (err, hash)=>{
      let createdUser = await userModel.create({
        name,
        email,
        password: hash,
        age
      });
      
      let token = jwt.sign({id: createdUser._id}, "secret");
      res.cookie("token", token)

      res.send("user created in database");
    })
  })
});

router.post("/login", async(req, res)=>{
  let user = await userModel.findOne({email: req.body.email});
  if(!user){
    res.status(404);
    res.send("email or password is wrong");
  };

  bcrypt.compare(req.body.password, user.password, function(err, result){
    if(err){throw err};

    if(result == false){
      res.send("email or password wrong");
    }

    let token = jwt.sign({id: user._id}, "secret");
    res.cookie("token", token)
    res.send("login successful")
    
  })
})



router.get("/logout", (req, res)=>{
  res.cookie("token", "");
  res.send("redirect to /signup or /login and create a post request");
})

module.exports = router;