const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/BookServer', () => {
//   console.log('connected to mongodb');
// })

mongoose.connect("mongodb://0.0.0.0:27017/BookServer", {
    useNewUrlParser:true
});
 
const Product = mongoose.model('products', {
  id: Number,
  name: String,
  author: String,
  price: Number,
  description: String,
  category: String,
  category2: String,
  image: String,
  date: String,
  discount: Number
});

const Admin = mongoose.model('admins', {
  id: Number,
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
  Admin,
  User
}