require('dotenv').config();
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
app.set('view engine', 'pug');
app.set('views', './views');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var cookieParser = require('cookie-parser');
var sessionMiddleware = require('./middlewares/session.middleware');

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(sessionMiddleware);
app.use(express.static('public'));

var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

var sanPhamApiRoute = require('./api/routes/sanpham.route');
app.use('/api/sanphams', sanPhamApiRoute);
var danhMucApiRoute = require('./api/routes/danhmuc.route');
app.use('/api/danhmucs', danhMucApiRoute);
var donHangApiRoute = require('./api/routes/donhang.route');
app.use('/api/donhangs', donHangApiRoute);
var apiUserRoute = require('./api/routes/user.route');
app.use('/api/users', apiUserRoute);

var authMiddleware = require('./middlewares/auth.middleware');

var donHangRoute = require('./routes/donhang.route');
app.use('/donhangs', donHangRoute);
var danhMucRoute = require('./routes/danhmuc.route');
app.use('/danhmucs', danhMucRoute);
var userRoute = require('./routes/user.route');
app.use('/users', authMiddleware.requireAuth, userRoute);
var authRoute = require('./routes/auth.route');
app.use('/auth', authRoute);
var productRoute = require('./routes/product.route');
app.use('/products', authMiddleware.requireAuth, productRoute);

app.get('/', authMiddleware.requireAuth, function(req, res) {
    res.render('index', {
        name: 'Tiki'
    });
});
app.listen(port, function() {
    console.log('Example app listening on port' + port);
});