const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const methodOverride = require('method-override');
const postRouters = require('./routes/post-routes');
const contactRoutes = require('./routes/contact-routes');
const postApiRoutes = require('./routes/api-post-routes');
const createPath = require('./helpers/create-path');

const errorMsg = chalk.red;
const successMsg = chalk.bgKeyword('green').blueBright

const app = express();
app.set('view engine', 'ejs');


mongoose
.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then((res) => console.log(successMsg('Connected to DB')))
.catch((error) => console.log(errorMsg(error)))



app.listen(process.env.PORT || 3000, (error) => {
    error ? console.log(errorMsg(error)) : console.log(successMsg(`Listening port ${process.env.PORT}`));;
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.urlencoded({extended: false}));

// app.use((req, res, next) => {
//     console.log(`path: ${req. path}`);
//     console.log(`method: ${req.method}`);
//     next();
// })


app.use(express.static('styles'));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), {
        title
    });
})

app.use(postRouters);
app.use(contactRoutes);
app.use(postApiRoutes);

app.use((req, res) => {

    const title = 'Error Page';
    res
        .status(404)
        .render(createPath('error'), {
            title
        });
})