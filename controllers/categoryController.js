let controller={};
let models=require('../models');
let Category =models.Category;
controller.getAll = (query)=>{
    let options={
        attributes:['id', 'name', 'imagepath', 'summary'],
        include: [{model: models.Product}],
        where:{}
    };
    // if(query.category)
    // {
    //     options.where.categoryId=query.category;
    // }
    return new Promise((resolve, reject)=>{
        Category.findAll(options)
        .then(data => resolve(data.map((r) => r.dataValues)))
     
        .catch(error => reject(new Error(error)));
    });
}

module.exports=controller;

