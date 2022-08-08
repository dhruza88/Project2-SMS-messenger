const express = require('express');
const router = express.Router();
const {User,Chat} = require('../../models');

router.get("/",(req,res)=>{
    User.findAll({
        include:[,Chat]
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp",err})
    })
})

router.post("/",(req,res)=>{
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

//just for adopt and return
router.put("/:id",(req,res)=>{
    User.update({
        email:req.body.email,
        chatroom:req.body.chatroom,
        picture:req.body.picture,
        bioId:req.session.bioId
    },{
        where:{
            id:req.params.id
        }
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp",err})
    })
})

router.delete("/:id",(req,res)=>{
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


//TODO: add login route when sessions exist

module.exports = router;