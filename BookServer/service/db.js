const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/BookServer', () => {
  console.log('connected to mongodb');
})

const Product = mongoose.model('products', {
  id: Number,
  name: String,
  author: String,
  price: Number,
  description: String,
  category: String,
  home: Number,
  image: String,
  date: String,
  discount: Number
});

const Wishlist = mongoose.model('wishlists', {
  id: Number,
  name: String,
  author: String,
  price: Number,
  image: String,
  description: String,
  date: String,
  discount: Number
})

const Cart = mongoose.model('carts', {
  id: Number,
  name: String,
  author: String,
  price: Number,
  image: String,
  description: String,
  date: String,
  discount: Number
})

const Admin = mongoose.model('admins', {
  id: Number,
  account: String,
  password: String,
  orders:Array
})

const User = mongoose.model('users', {
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  wishlist: Array,
  orders:Array,
  cart:Array
})

module.exports = {
  Product,
  Wishlist,
  Cart,
  Admin,
  User
}