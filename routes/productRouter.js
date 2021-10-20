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
const getProductById = async(id)=>{
    const productbyid = await productController.getProductByID(id);
    return JSON.parse(JSON.stringify(productbyid));
}
const getProductSpecifitionById = async(id)=>{
    const productbyid = await productController.getProductSpecification(id);
    return JSON.parse(JSON.stringify(productbyid));
}
const getProductComment = async(id)=>{
    const commentbyid = await productController.getProductComment(id);
    return JSON.parse(JSON.stringify(commentbyid));
}
router.get('/', async(req, res)=>{
        const categories = await getDataCategory();
        const color = await getDataColor();
        const brand = await getDataBrand();
        const allProduct = await getDataProduct();
        res.locals.allProduct= allProduct;
        res.locals.categories=categories;
        res.locals.color= color;
        res.locals.brand= brand;
        
        
        res.render('category');
    
});

router.get('/:id', async (req, res)=>{
    const productbyid= await getProductById(req.params.id);
    const getProductSpecifition = await getProductSpecifitionById(req.params.id);
    const getProductCommentByID = await getProductComment(req.params.id);
    res.locals.getProductSpecifition=getProductSpecifition;
    res.locals.productbyid=productbyid;
    res.locals.getProductCommentByID=getProductCommentByID;
    console.log(getProductCommentByID);
    res.render('single-product');
});
module.exports=router;