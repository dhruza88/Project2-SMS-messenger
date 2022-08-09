const express = require('express');
const router = express.Router();
const {Chatroom,User,Message} = require('../../models');

/*
 include: [
            {
                model: Chatroom,
                as: "joined_users"
            }
        ]
*/


router.get("/", (req,res) =>{
    User.findAll({
        include:[
            {
                model: Chatroom,
                as: "joined_users"
            },
           //  Message
        ]
    }).then(data=>{
        const hbsData = data.map(user=>user.toJSON())
        res.render("base", {
            users:hbsData,
            loggedIn:req.session.loggedIn
        })
    })
    .catch((error) => {
        res.json({ message: error?.message || "Internal server error" })
    });
})

// router.get("/user",(req,res)=>{
//     User.findAll({
//         include:[Chatroom]
//     }).then(data=>{
//         const hbsData = data.map(modelIns=>modelIns.toJSON())
//         console.log(hbsData)
//         res.render("user",{
//             chats:hbsData,
//             isLoggedIn:req.session.loggedIn
//         })
//     })
// })

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
        res.render("chat",{
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
        res.redirect("/user")
    }
    res.render("login",{
        isLoggedIn:false
    })
})

module.exports = router;