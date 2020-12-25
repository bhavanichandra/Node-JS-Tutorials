const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorHandler = require('./controllers/error-handling');
// const expressHbs = require('express-handlebars');
const app = express();

// app.engine(
// 	'hbs',
// 	expressHbs({ defaultLayout: 'main-layout.hbs', layoutsDir: 'views/layouts/' })
// );
app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorHandler.getPageNotFound);

app.listen(3001);
