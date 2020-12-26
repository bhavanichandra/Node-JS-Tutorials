const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorHandler = require('./controllers/error-handling');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
	User.findByPk(1)
		.then((user) => {
			req.user = user;
			next();
		})
		.catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorHandler.getPageNotFound);

// Table Relations

Product.belongsTo(User, {
	constraints: true,
	onDelete: 'CASCADE'
});
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { as: 'products', through: CartItem });
Product.belongsToMany(Cart, { as: 'carts', through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { as: 'products', through: OrderItem });

sequelize
	// .sync({ force: true })
	.sync()
	.then((result) => {
		return User.findByPk(1);
		// console.log(result);
	})
	.then((user) => {
		if (!user) {
			return User.create({ name: 'Max', email: 'test@test.com' });
		}
		return user;
	})
	.then((user) => {
		return user.getCart().then((cart) => {
			if (!cart) {
				return user.createCart();
			}
			return cart;
		});
	})
	.then((cart) => {
		app.listen(3001);
	})
	.catch((err) => {
		console.log(err);
	});
