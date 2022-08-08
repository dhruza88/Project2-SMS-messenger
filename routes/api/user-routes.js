const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// router.get('/', async (req, res) => {
//   // find all categories
//   // be sure to include its associated Products

// });

router.get('/',(req,res)=>{
  Category.findAll().then(data=>{
      res.json(data)
  }).catch(err=>{
      res.status(500).json({msg:"whoops,my bad!",err})
  })
});

router.get("/:id",(req,res)=>{
  Category.findByPk(req.params.id,{
      include:[{
          model:Product
      }]
  }).then(data=>{
      res.json(data)
  }).catch(err=>{
      res.status(500).json({msg:"whoops,my bad!",err})
  })
});

// router.get('/:id', async (req, res) => {
//   // find one category by its `id` value
//   // be sure to include its associated Products

// });

router.post("/",(req,res)=>{
  Category.create({
      category_name:req.body.category_name
  }).then(data=>{
      res.json(data)
  }).catch(err=>{
      res.status(500).json({msg:"whoops,my bad!",err})
  })
});

// router.post('/', async (req, res) => {
//   // create a new category

// });

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  console.log('');
  console.log(req.params);
  console.log(req.body);
  console.log('');
  const whr = {where: {id: req.params.id}};
  const values = {category_name: req.body.category_name};
  Category.update(
      values,
      whr
  ).then(data=>{
      res.json(data)
  }).catch(err=>{
      res.status(500).json({msg:"whoops,my bad!",err})

  })
});

router.delete("/:id",(req,res)=>{
  Category.destroy({
      where:{
          id:req.params.id
      }
  }).then(data=>{
      res.json(data)
  }).catch(err=>{
      res.status(500).json({msg:"whoops,my bad!",err})
  })
});

// router.delete('/:id', async (req, res) => {
//   // delete a category by its `id` value
// });

module.exports = router;
