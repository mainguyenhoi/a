'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data =[
      {
      name:"Men",
      imagepath:"/img/home/hero-slide1.png"
      },
      {
        name:"Women",
        imagepath:"/img/home/hero-slide2.png"
      },
      {
        name:"Accesories",
        imagepath:"/img/home/hero-slide3.png"
      },
      {
        name:"Footwear",
        imagepath:"/img/home/hero-slide4.png"
      },
      {
        name:"Bay Items",
        imagepath:"/img/home/hero-slide1.png"
      },
      {
        name:"Electronics",
        imagepath:"/img/home/hero-slide2.png"
      },
      {
        name:"Food",
        imagepath:"/img/home/hero-slide3.png"
      }
    ];
    data.map(item=>{
      item.createdAt=Sequelize.literal('NOW()');
      item.updatedAt=Sequelize.literal('NOW()');
      return item;
    })
  
      await queryInterface.bulkInsert('Categories', data, {});

  },

  down: async (queryInterface, Sequelize) => {
    // Add commands to revert seed here.
  
   await queryInterface.bulkDelete('Categories', null, {});

  }
};
