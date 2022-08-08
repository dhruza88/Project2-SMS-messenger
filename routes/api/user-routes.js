const express = require('express');
const router = express.Router();
const {User,Chatroom} = require('../../models');

router.get("/user",(req,res)=>{
    User.findAll({
        include:[Chatroom]
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp",err})
    })
})

router.post("/user",(req,res)=>{
    if(!req.session.isUser){
        return res.status(403).json({msg:""})
    }
    User.create({
      email:req.body.email,
<<<<<<< HEAD
      picture:req.body.picture,
      bioId:req.session.bioId
=======
    //   chatroom:req.body.chatroom,
    //   picture:req.body.picture,
      bio:req.session.bio
>>>>>>> 27ffb700e4064fcfa38c7866b798df604d783dd5
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp",err})
    })
})


router.get("/user/:id",(req,res)=>{
    User.findOne({
        where:{
            id:req.params.id
        }
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp",err})
    })
})

router.delete("/user/:id",(req,res)=>{
    User.destroy({
        where:{
            id:req.params.id
        }
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp",err})
    })
})

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
//TODO: add login route when sessions exist

module.exports = router;