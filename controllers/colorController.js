let controller={};
let models = require('../models');
let Color = models.Color;
controller.getAll = (query)=>{
    return new Promise((resolve, reject)=>
    {
        let options= {
            attributes:['id', 'name', 'imagepath', 'code'],
            include: [{
                model: models.ProductColor,
                include:[{
                    model: models.Product,
                    attributes:[],
                    where:{}
                }]
                
            }]
            
        };
        if(query.category >0)
        {
            options.include[0].include[0].where.categoryId=query.category;
        }
        if(query.brand >0){
            options.include[0].include[0].where.brandId=query.brand;
        }
        //console.log(options.include[0]);
        Color.findAll(options)
        .then(data => resolve(data.map((r) => r.dataValues)))
        .catch(error => reject(new Error(error)));
    });
}

module.exports=controller;