const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const { User,Chatroom, Message } = require('../../models');
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)


router.get('/',async (req, res) =>{
    try {
        const messages = await Message.findAll();
        res.json(messages)
    } catch (err) {
        res.status(400).json(err);
    }
})

router.post('/', async (req,res) => {
    if(!req.session.loggedIn){
        res.status(403).json({msg:"must login first!"})
    }
    try {
        const newMessage = await Message.create({
            ...req.body,
            userId: req.session.userId,
        });

        res.status(200).json(newUser);
    }   catch (err) {
        res.status(400).json(err);
    }
});

router.get("/:id",(req,res)=>{
    Message.findOne({
        where:{
            id:req.params.id
        }
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp",err})
    })
});

router.delete('/:id', async (req, res) => {
    if(!req.session.loggedIn){
        res.status(403).json({msg:"must login first!"})
    }
    try {
        const messageData = await Message.destroy({
            where:{
                id: req.params.id,
                userId: req.session.userId,
            },
        });

        if(!messageData) {
            res.status(404).json({ message: "No message found with this id"})
            return;
        }

        res.status(200).json(messageData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;