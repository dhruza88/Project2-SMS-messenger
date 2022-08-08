const express = require('express');
const router = express.Router();
const {Chat,User} = require('../../models');

router.get("/user",(req,res)=>{
    User.findAll({
        include:[Chat]
    }).then(data=>{
        const hbsData = data.map(modelIns=>modelIns.toJSON())
        console.log(hbsData)
        res.render("home",{
            chats:hbsData,
            isLoggedIn:req.session.loggedIn
        })
    })
})

router.get("/user/:id",(req,res)=>{
    User.findByPk(req.params.id,{
        include:[Chat]
    }).then(data=>{
        const hbsData = data.toJSON()
        console.log(hbsData)
        hbsData.isLoggedIn=req.session.loggedIn
        hbsData.userId=req.session.userId
        console.log(hbsData);
        res.render("user",hbsData)
    })
})

router.get("/chat",(req,res)=>{
    Chat.findAll({
        include:[User]
    }).then(data=>{
        const hbsData = data.map(modelIns=>modelIns.toJSON())
        console.log(hbsData)
        res.render("home",{
            chats:hbsData,
            isLoggedIn:req.session.loggedIn
        })
    })
})

router.get("/chat/:id",(req,res)=>{
    Chat.findByPk(req.params.id,{
        include:[User]
    }).then(data=>{
        const hbsData = data.toJSON()
        console.log(hbsData)
        hbsData.isLoggedIn=req.session.loggedIn
        res.render("chat",hbsData)
    })
})


router.get("/login",(req,res)=>{
    if(req.session.loggedIn){
        res.redirect("/profile")
    }
    res.render("loginSignup",{
        isLoggedIn:false
    })
})

module.exports = router;