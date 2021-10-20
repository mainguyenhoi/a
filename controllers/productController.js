let controller={};
let models=require('../models');
let Product =models.Product;
let ProductSpecification =models.ProductSpecification;
let Comment =models.Comment;
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
controller.getAllProducts = () =>{
    return new Promise((resolve, reject)=>{
        Product.findAll({
        
            include: [{model: models.Category}],
            attributes:['id', 'name', 'imagepath', 'price']
        })
        
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
        where:{productId:id},
        include: [{model: models.User}]
    });
    return data;
}
module.exports=controller;