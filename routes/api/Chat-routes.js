const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const {Caretaker,Pig} = require('../../models');
const Chatroom = require('../../models/chatroom');

router.get("/",(req,res)=>{
    Chatroom.findAll({
        include:[User]
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp",err})
    })
})

router.post("/",(req,res)=>{
    Chatroom.create({
      
    }).then(data=>{
       
        res.json(data)

    }).catch(err=>{
        res.status(500).json({msg:"womp womp",err})
    })
})

//TODO: add login route when sessions exist

router.post("/login",(req,res)=>{
    Chatroom.findOne({
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