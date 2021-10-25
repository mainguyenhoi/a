let controller={};
let models=require('../models');
let Product =models.Product;
let ProductSpecification =models.ProductSpecification;
let Comment =models.Comment;
let Review =models.Review;
controller.getTrendingProducts = () =>{
    return new Promise((resolve, reject)=>{
        Product.findAll({
            order:[
                ['overallReview','DESC']
            ], 
            limit: 8,
            include: [{model: models.Category}],
            attributes:['id', 'name', 'imagepath', 'price']
        })
        
        .then(data => resolve(data))
        .catch(error => reject(new Error(error)));
    });
}
controller.getAllProducts = (query) =>{
    let options={
        include: [{model: models.Category}],
        attributes:['id', 'name', 'imagepath', 'price'],
        where:{}
    };
    
    if(query.category >0)
    {
        options.where.categoryId=query.category;
    }
    if(query.brand >0)
    {
        options.where.brandId=query.brand;
    }
    if(query.color >0)
    {
        options.include.push[{
            model: models.ProductColor,
            attributes:[],
            where: {colorId:query.color}
        }];
    }
    //console.log(options);
    return new Promise((resolve, reject)=>{
        Product.findAll(options)
        .then(data => resolve(data))
        .catch(error => reject(new Error(error)));
    });
}
controller.getProductByID=(id)=>{
    return new Promise((resolve, reject)=>{
        let product;
        Product.findOne({
            include:[{model: models.Category}],
            where:{
                id:id
            }
        })
        .then (result => {
            product = result;
            return models.ProductSpecification.findAll({
                where:{
                    productId:id
                },
                include:[{ model : models.Specification}]
            });
        })
        .then(productSpecifications=>{
            product.ProductSpecifications = productSpecifications;
            resolve (product);
        })
        .catch(error => reject(error));
    })
}


controller.getProductSpecification = async (id) =>{
    const data= await ProductSpecification.findAll({
        attributes:['description'],
        where:{productId:id},
        include: [{model: models.Specification}]
    });
    return data;
}
controller.getProductComment = async (id) =>{
    const data= await Comment.findAll({
        attributes:['message'],
        where:{productId:id, parentCommentId:null},
        include: [{model: models.User},{
            model: models.Comment, 
            as: 'SubComments',
            include: [{model: models.User}]
        }],
        
    });
    return data;
}
controller.getProductReview = async (id) =>{
    let data= await Review.findAll({
        attributes:['message','rating'],
        where:{productId:id},
        include: [{model: models.User}]
    });
    // let star=[];
    // for(let i = 1; i <= 5; i++)
    // {
    //     star.push(data.filter(item =>(item.rating == i)).length);
    // }
    //data.star=star;
    //console.log(data)
    return data;
}
controller.getStarReview = async (id) =>{
    let data= await Review.findAll({
        attributes:['rating'],
        where:{productId:id},
    });
    let star=[];
    for(let i = 1; i <= 5; i++)
    {
        star.push(data.filter(item =>(item.rating == i)).length);
    }
    //console.log(star)
    return star;
}
module.exports=controller;