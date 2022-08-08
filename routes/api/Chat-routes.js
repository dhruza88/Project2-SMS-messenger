const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const Chat = require('../../models/chat');
const { User } = require('../../models');
const server = require('http').Server(app)
const io = require('socket.io')(server)

const chats = { }

router.get("/",(req,res)=>{
   res.render('index', {chats: chats })
})

router.post("/chat",(req,res)=>{
   if(chats[req.body.chat] != null) {
    return res.redirect('/')
   }
   chats[req.body.chat] = { users: {} }
   res.redirect(req.body.chat)
   io.emit('chat-created', req.body.chat)
})

router.get("/chat/:id",(req,res)=>{
    if(chats[req.params.chat] == null ){
        return res.redirect('/')
    }
    res.render('chat', {chatName: req.params.chat})
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