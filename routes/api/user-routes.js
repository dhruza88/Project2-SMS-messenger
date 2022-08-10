const express = require('express');
const router = express.Router();
const {User,Chatroom} = require('../../models');
const bcrypt = require("bcrypt");



router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.loggedIn = true;

        res.status(200).json(userData);
    });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login',async(req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) { 
            console.log(userData)
            res.status(400).json({ message: "Incorrect login info, try again"});
            return;
        }


        
        if(!bcrypt.compareSync(req.body.password, userData.password)){
             res.status(401).json({msg: "incorrect login info, try again!"});
                return
        }


        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;

            res.json({ user: userData, message: "You are now logged in!" });
        });
    } catch (err){
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            req.status(404).end();
        });
    } else {
        res.status(404).end();
    }
});


// TODO: The issue is here
router.get("/",(req,res)=>{
    User.findAll({
        include: [
            {
                model: Chatroom,
                as: "chatroom"
            }
        ]
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json({msg:"womp womp",err})
    })
})

// router.post("/user",(req,res)=>{
//     if(!req.session.isUser){
//         return res.status(403).json({msg:""})
//     }
//     User.create({
//       email:req.body.email,
//     //   chatroom:req.body.chatroom,
//     //   picture:req.body.picture,
//       bio:req.session.bio
//     }).then(data=>{
//         res.json(data)
//     }).catch(err=>{
//         res.status(500).json({msg:"womp womp",err})
//     })
// })


router.get("/:id",(req,res)=>{
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

// router.delete("/user/:id",(req,res)=>{
//     User.destroy({
//         where:{
//             id:req.params.id
//         }
//     }).then(data=>{
//         res.json(data)
//     }).catch(err=>{
//         res.status(500).json({msg:"womp womp",err})
//     })
// })

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
//TODO: add login route when sessions exist

module.exports = router;