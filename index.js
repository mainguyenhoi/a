let express= require('express');
let helper=require('./controllers/helper');
let app = express();
//set public static folder
app.use(express.static(__dirname+'/public'));
//use view engineS
let expressHbs=require('express-handlebars');
let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir :__dirname+'/views/layouts/',
    partialsDir: __dirname+'/views/partials/',
    helpers : {
        createStarList: helper.createStarList,
        printStar: helper.printStar

    }
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs') 
app.use('/', require('./routes/indexRouter'));
app.use('/products', require('./routes/productRouter'));


app.get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
app.get('/sync', (req,res)=>{
    let models = require('./models');
    models.sequelize.sync().then(()=>
    {
        res.send('data sync completed')
    });
    
});

app.get('/:page', (req, res)=>{
    let banners={
        blog: 'Our blog',
        category: 'Shop Category',
        confirmation: 'Order Confirmation',
        cart: 'Shopping Cart',
        contact:'Contact',
        login: 'Login',
        register: 'Rigister',
        checkour: 'Product Checkour',
        

    };
    let page=req.params.page;
    if(page === 'single-product')
        banner='Product Details';
    else if(page === 'tracking-order')
        banner='Tracking';
    else if(page === 'single-blog' )
        banner='Blog Details';
    else
        banner= banners[page];
    res.render(page,{banner});

})
//set server Port and start server
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), () => {
    console.log('Server is running ');
});
