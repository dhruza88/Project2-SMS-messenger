const router = require('express').Router();
const apiRoutes = require('./api');
const frontEndRoutes = require('./frontend');

router.use(frontEndRoutes);
router.use('/api', apiRoutes);



// router.use((req, res) => {
//   res.send("<h1>Wrong Route!</h1>")
// });

router.get("/sessiondata",(req,res)=>{
  res.json(req.session)
})
router.get("/logout",(req,res)=>{
  req.session.destroy();
  res.redirect("/")
})

module.exports = router;