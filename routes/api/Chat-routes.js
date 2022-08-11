const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const { User,Chatroom, Message } = require('../../models');
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)

router.get('/',async (req, res) =>{
    try {
        const chats = await Chatroom.findAll();
        res.json(chats)
    } catch (err) {
        res.status(400).json(err);
    }
})

router.post('/', async (req,res) => {
    if(!req.session.loggedIn){
        res.status(403).json({msg:"must login first!"})
    }
    try {
        const newChat = await Chatroom.create({
            ...req.body,
            userId: req.session.userId,
        });

        res.status(200).json(newChat);
    }   catch (err) {
        res.status(400).json(err);
    }
});


router.get("/:id",(req,res)=>{
    Chatroom.findOne({
        where:{
            id:req.params.id
        }
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp",err})
    })
})

router.delete('/:id', async (req, res) => {
    if(!req.session.loggedIn){
        res.status(403).json({msg:"must login first!"})
    }
    try {
        const chatData = await Chatroom.destroy({
            where:{
                id: req.params.id,
                userId: req.session.userId,
            },
        });

        if(!userData) {
            res.status(404).json({ message: "No user found with this id"})
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// router.get("/chatroom",(req,res)=>{
//    res.render('chatroom', {chats: chats })
// })

// router.post("/chat",(req,res)=>{
//    if(chats[req.body.chat] != null) {
//     return res.redirect('/')
//    }
//    chats[req.body.chat] = { users: {} }
//    res.redirect(req.body.chat)
//    io.emit('chat-created', req.body.chat)
// })

// router.get("/chatroom/:id",(req,res)=>{
//     if(chats[req.params.chat] == null ){
//         return res.redirect('/')
//     }
//     res.render('chatroom', {chatName: req.params.chat})
// })

// // //TODO: add login route when sessions exist

// router.post("/login",(req,res)=>{
//     User.findOne({
//         where:{
//             email:req.body.email
//         }
//     }).then(foundUser=>{
//         if(!foundUser){
//             return res.status(401).json({msg:"invalid login"})
//         }
//         if(!bcrypt.compareSync(req.body.password,foundUser.password)){
//             return res.status(401).json({msg:"invalid login"})
//         }
//         req.session.userId=foundUser.id;
//         req.session.loggedIn=true;
//         res.json(foundUser);
//     })
// })

module.exports = router;