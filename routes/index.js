const router = require('express').Router();
const apiRoutes = require('./api');
const frontEndRoutes = require('./frontend');

router.use(frontEndRoutes);
router.use('/api', apiRoutes);


<<<<<<< HEAD
=======
// router.use((req, res) => {
//   res.send("<h1>Wrong Route!</h1>")
// });

>>>>>>> 27ffb700e4064fcfa38c7866b798df604d783dd5
router.get("/sessiondata",(req,res)=>{
  res.json(req.session)
})
router.get("/logout",(req,res)=>{
  req.session.destroy();
  res.redirect("/")
})

module.exports = router;