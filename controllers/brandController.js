let controller={};
let models = require('../models');
let brand = models.Brand;
controller.getAll = async (query) =>{
    let options={
        attributes:['id', 'name', 'imagepath'],
        include: [{
            model: models.Product,
            attributes:['id'],
            where:{}
        }],
        where:{}
    };
    if(query.category >0)
    {
        options.include[0].where.categoryId=query.category;
    }
    if(query.color >0){
        options.include[0].include=[{
            model:models.ProductColor, 
            attributes:[],
            where:{
                colorId:query.color}
        }];
    }
    const data= await brand.findAll(options);
    return data;
}
module.exports=controller;