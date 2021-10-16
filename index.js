let express= require('express');
let app = express();
//set public static folder
app.use(express.static(__dirname+'/public'));
//use view engine
let expressHbs=require('express-handlebars');
let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir :__dirname+'/views/layouts/',
    partialsDir: __dirname+'/views/partials/'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs') 
//Define your routes here
app.get('/',(req, res)=>{
    res.render('index');
});
// app.get('/blog', (req, res)=>{
//     res.render('blog');
// });
// app.get('/cart',(req, res)=>{
//     res.render('cart');
// });
// app.get('/category',(req, res)=>{
//     res.render('category');
// });
// app.get('/checkout', (req, res)=>{
//     res.render('checkout');
// });
// app.get('/confirmation', (req, res)=>{
//     res.render('confirmation');
// });
// app.get('/contact', (req, res)=>{
//     ré.render('contact');
// });
// app.get('/register', (req, res)=>{
//     res.render('register');
// });
// app.get('/single-blog', (req,res)=>{
//     res.render('single-blog');
// });
// app.get('/single-product', (req, res)=>{
//     res.render('single-product');
// });
// app.get('tracking-order', (req, res)=>{
//     res.render('tracking-order');
// });
// app.get('/login', (req, res)=>{
//     res.render('login');
// });
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
    
    console.log(page);
    if(page === 'single-product')
        banner='Product Details';
    else if(page === 'tracking-order')
        banner='Tracking';
    else if(page === 'single-blog' )
        banner='Blog Details';
    else
        banner= banners[page];

    console.log(banner);
    res.render(page,{banner});

})
//set server Port and start server
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), () => {
    console.log('Server is running ');
});
