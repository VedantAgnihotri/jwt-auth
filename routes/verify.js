var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const userModel = require("./users");


router.get("/", (req, res, next)=>{
    const token = req.cookies.token;
    if(!token){
        res.send("token not generated");
        res.status(404);
    } 
    jwt.verify(String(token), "secret", (err, decoded)=>{
        if(err){
            res.send(error)
            res.status(401);
        };
        const userId = decoded.id;
        req.id = userId;
    });
    next();
  });
  
router.get("/", async (req, res) => {
    try {
        const userId = req.id;
        const user = await userModel.findById(userId, "-password");
        if (!user) {
            res.status(404).send("User not found");
            return;
        }
        res.json(user); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;