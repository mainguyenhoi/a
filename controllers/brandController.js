let controller={};
let models = require('../models');
let brand = models.Brand;
controller.getAll = async () =>{
    const data= await brand.findAll({
        attributes:['id', 'name', 'imagepath'],
            include: [{model: models.Product}]
    });
    return data;
}
module.exports=controller;