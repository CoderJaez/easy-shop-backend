const { response } = require('express');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')
const authJwt = require('./helper/jwt');
const errorHandler = require('./helper/error-handler');
require('dotenv/config');


const api = process.env.API_URL;


app.use(cors());
app.options('*', cors());


//Routes
const productReouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const userRouter = require('./routes/users');
const orderRouter = require('./routes/orders');
//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

app.use(`${api}/products`,productReouter);
app.use(`${api}/categories`,categoriesRouter);
app.use(`${api}/users/`,userRouter);
app.use(`${api}/orders/`,orderRouter);
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));


mongoose.connect(process.env.CONNECTION_STRING,{
        useUnifiedTopology:true,
        useNewUrlParser: true,
})
.then(() => {
    console.log('Database Connection is ready...')
})
.catch((err) => {
    console.log(err);
})
app.listen(3000, () => {
    console.log('server is running http://localhost:3000');
});