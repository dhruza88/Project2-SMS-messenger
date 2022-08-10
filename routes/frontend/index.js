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
        // include:[
        //     {
        //         model: Chatroom,
        //         as: "chatroom"
        //     },
           //  Message
        // ]
    }).then(data=>{
        const hbsData = data.map(user=>user.toJSON())
        res.render("login", {
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
        // include:[Chatroom]
    }).then(data=>{
        const hbsData = data.toJSON()
        console.log(hbsData)
        hbsData.isLoggedIn=req.session.loggedIn
        hbsData.userId=req.session.userId
        console.log(hbsData);
        res.render("profile",hbsData)
    })
})

router.get("/profile",(req,res)=>{
    if(!req.session.loggedIn){
        res.redirect("/login")
    }
    if(req.session.loggedIn)
    {
        User.findByPk(req.session.userId, {
            // include: [Chatroom]
        }).then(data=>{
            const hbsData = data.toJSON()
            hbsData.isLoggedIn= req.session.loggedIn
            console.log(hbsData)
            res.render("profile",hbsData)
        })
    }
})

// router.get("/chatroom",(req,res)=>{
//     Chat.findAll({
//         include:[User]
//     }).then(data=>{
//         const hbsData = data.map(modelIns=>modelIns.toJSON())
//         console.log(hbsData)
//         res.render("chatroom",{
//             chats:hbsData,
//             isLoggedIn:req.session.loggedIn
//         })
//     })
// })

router.get("/chatroom/:id",(req,res)=>{
    Chat.findByPk(req.params.id,{
        include:[User]
    }).then(data=>{
        const hbsData = data.toJSON()
        console.log(hbsData)
        hbsData.isLoggedIn=req.session.loggedIn
        res.render("chatroom",hbsData)
    })
})


router.get("/login",(req,res)=>{
    if(req.session.loggedIn){
        res.redirect("/profile")
    }
    res.render("login",{
        isLoggedIn:false
    })
})

module.exports = router;