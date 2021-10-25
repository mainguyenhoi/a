let express= require('express');
let router=express.Router();
let categoryController= require('../controllers/categoryController');
let colorController= require('../controllers/colorController');
let brandController= require('../controllers/brandController');
let productController =require('../controllers/productController')
const getDataCategory = async (query) =>{
    const data = await categoryController.getAll(query);
    return JSON.parse(JSON.stringify(data));
} 
const getDataColor = async (query)=>{
    const dataColor= colorController.getAll(query);
    return JSON.parse(JSON.stringify(dataColor));
}
const getDataBrand = async (query) =>{
    const data = await brandController.getAll(query);
    return JSON.parse(JSON.stringify(data));
} 
const getDataProduct = async (query) =>{
    const dataProduct = await productController.getAllProducts(query);
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
const getProductReview = async(id)=>{
    const reviewbyid = await productController.getProductReview(id);
    return JSON.parse(JSON.stringify(reviewbyid));
}
const getStarReview = async(id)=>{
    const getStar= await productController.getStarReview(id);
    return JSON.parse(JSON.stringify(getStar));
}

router.get('/', async(req, res)=>{
        if((req.query.category)==null|| isNaN(req.query.category))
        {
            req.query.category=0;
        }
        if((req.query.brand)==null|| isNaN(req.query.brand))
        {
            req.query.brand=0;
        }
        if((req.query.color)==null|| isNaN(req.query.color))
        {
            req.query.color=0;
        }
        const categories = await getDataCategory(req.query);
        const color = await getDataColor(req.query);
        const brand = await getDataBrand(req.query);
        const allProduct = await getDataProduct(req.query);
        console.log(color);
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
    const getProductReviewByID = await getProductReview(req.params.id);
    const getStar = await getStarReview(req.params.id);
    res.locals.getProductSpecifition=getProductSpecifition;
    res.locals.productbyid=productbyid;
    res.locals.getProductCommentByID=getProductCommentByID;
    res.locals.getProductReviewByID=getProductReviewByID;
    res.locals.star= getStar;
    res.locals.countStar = getStar.reduce((a, b) => {return a + b;})
    //console.log(getProductReviewByID);

    res.render('single-product');
});
module.exports=router;