const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const Chat = require('../../models/chat');
const { User } = require('../../models');

router.get("/chat",(req,res)=>{
    Chat.findAll({
        include:[User]
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp",err})
    })
})

router.post("/chat",(req,res)=>{
    Chat.create({
      
    }).then(data=>{
       
        res.json(data)

    }).catch(err=>{
        res.status(500).json({msg:"womp womp",err})
    })
})

//TODO: add login route when sessions exist

router.post("/login",(req,res)=>{
    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(foundUser=>{
        if(!foundUser){
            return res.status(401).json({msg:"invalid login"})
        }
        if(!bcrypt.compareSync(req.body.password,foundUser.password)){
            return res.status(401).json({msg:"invalid login"})
        }
        req.session.userId=foundUser.id;
        req.session.isFarmer=false;
        req.session.loggedIn=true;
        res.json(foundUser);
    })
})

module.exports = router;