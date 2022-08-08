const express = require('express');
const router = express.Router();
const {User,Chat} = require('../../models');

router.get("/user",(req,res)=>{
    User.findAll({
        include:[,Chat]
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
      chatroom:req.body.chatroom,
      picture:req.body.picture,
      bioId:req.session.bioId
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