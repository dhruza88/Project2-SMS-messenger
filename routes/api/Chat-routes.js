const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const Chatroom = require('../../models/chatroom');
const { User } = require('../../models');
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)

const chats = { }

router.get("/chatroom",(req,res)=>{
   res.render('chatroom', {chats: chats })
})

router.post("/chat",(req,res)=>{
   if(chats[req.body.chat] != null) {
    return res.redirect('/')
   }
   chats[req.body.chat] = { users: {} }
   res.redirect(req.body.chat)
   io.emit('chat-created', req.body.chat)
})

router.get("/chatroom/:id",(req,res)=>{
    if(chats[req.params.chat] == null ){
        return res.redirect('/')
    }
    res.render('chatroom', {chatName: req.params.chat})
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
        req.session.loggedIn=true;
        res.json(foundUser);
    })
})

module.exports = router;