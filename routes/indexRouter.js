let express= require('express');
let router = express.Router();
const { Pool, Client } = require('pg')
//const { Category } = require('../models');
let categoryController=require ('../controllers/categoryController'); 
//const { getTrendingProducts } = require('../controllers/productController');
let productController = require('../controllers/productController');


const getData = async () => {
  const data = await categoryController.getAll();
  return JSON.parse(JSON.stringify(data));
}
const getProduct = async () =>{
  const dataProduct = await productController.getTrendingProducts();
  return JSON.parse(JSON.stringify(dataProduct));
}

router.get('/', async (req, res, next)=>{

  const data = await getData();
  const dataTrendingProduct= await getProduct();
  res.locals.data = data;
  res.locals.getTrendingProducts= dataTrendingProduct;

  res.render('index');

    //next()
});
// router.get('/',(req, res, next)=>{
//     let categoryController=require ('../controllers/categoryController');
//     let productController=require('../controllers/productController');
//     categoryController.getAll()
//     .then(data=>{
//         res.locals.categorise=data;//truyền data lên trên view
//         console.log(data);
//         return productController.getTrendingProducts();
//     })
//     .then(data=>{
//         res.locals.trendingProducts=data;
//         res.render('index');
//     })
//     .catch(error => next(error))
// })
module.exports=router;