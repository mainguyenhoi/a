let express= require('express');
let router=express.Router();
let categoryController= require('../controllers/categoryController');
let colorController= require('../controllers/colorController');
let brandController= require('../controllers/brandController');
let productController =require('../controllers/productController')
const getDataCategory = async () =>{
    const data = await categoryController.getAll();
    return JSON.parse(JSON.stringify(data));
} 
const getDataColor = async ()=>{
    const dataColor= colorController.getAll();
    return JSON.parse(JSON.stringify(dataColor));
}
const getDataBrand = async () =>{
    const data = await brandController.getAll();
    return JSON.parse(JSON.stringify(data));
} 
const getDataProduct = async () =>{
    const dataProduct = await productController.getAllProducts();
    return JSON.parse(JSON.stringify(dataProduct));
} 
router.get('/', async(req, res)=>{
        const categories = await getDataCategory();
        const color = await getDataColor();
        const brand = await getDataBrand();
        const allProduct = await getDataProduct();
        res.locals.categories=categories;
        res.locals.color= color;
        res.locals.brand= brand;
        res.locals.allProduct=allProduct;
        console.log(allProduct);
        res.render('category');
    
});

router.get('/:id', (req, res)=>{
    res.render('single-product');
});
module.exports=router;