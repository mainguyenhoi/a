let controller={};
let models=require('../models');
let Category =models.Category;
controller.getAll = ()=>{
    return new Promise((resolve, reject)=>{
        Category.findAll({
            attributes:['id', 'name', 'imagepath', 'summary'],
            include: [{model: models.Product}]
        })
        .then(data => resolve(data.map((r) => r.dataValues)))
     
        .catch(error => reject(new Error(error)));
    });
}

module.exports=controller;
// const { Category, Product } = require('../models');

// module.exports = {
//   getAll: async (req, res) => {
//     const rows = await Category.findAll({
//       include: [{ model: Product }],
//     });
//     return rows.map((r) => r.dataValues);
//   },
// };
