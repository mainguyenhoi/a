let helper={};
helper.createStarList = (stars)=>{

  let str = '<ul class="list"><li><a href="#">5 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>'+stars[4]+' review</a></li> <li><a href="#">4 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i  class="fa fa-star"></i><i class="fa fa-star disabled"></i>'+stars[3]+' review</a></li> <li><a href="#">3 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star disabled"></i><i class="fa fa-star disabled"></i>'+stars[2]+' review</a></li> <li><a href="#">2 Star <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star disabled"></i><i class="fa fa-star disabled"></i><i class="fa fa-star disabled"></i>'+stars[1]+' review</a></li> <li><a href="#">1 Star <i class="fa fa-star"></i><i class="fa fa-star disabled"></i><i class="fa fa-star disabled"></i><i  class="fa fa-star disabled"></i><i class="fa fa-star disabled"></i>'+stars[0]+' review</a></li></ul>';
  return str;
};
helper.printStar= (rating, block) =>{
    //console.log("fn"+block.fn(this));
    let star='';
    for(let i = 1; i<=rating ; i++)
    { 
      star += block.fn(this);

    }
    console.log(star);
    return star;
    
    //return '<h1>oke chưa</h1>'+'<h1>'+block.fn(this)+'</h1>';
};
module.exports = helper;