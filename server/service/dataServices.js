const db = require('./db');

// Get all products
const getProducts = () => {
    return db.Product.find().then(
        (result) => {
            if (result) {
                return {
                    status: true,
                    statusCode: 200,
                    products: result
                }
            } else {
                return {
                    status: false,
                    statusCode: 401,
                    message: 'Products not found'
                }
            }
        }
    )
}

const addUser = (firstName, lastName, email, password) => {
    const wishlist = [];
    return db.User.findOne({ email }).then(
        (user) => {
            if (user) {
                return {
                    status: false,
                    statusCode: 401,
                    message: 'Email is already taken'
                }
            }
            else {
                const newUser = new db.User({
                    firstName, lastName, email, password, wishlist
                })
                newUser.save()
                return {
                    status: true,
                    statusCode: 200,
                    message: 'User added successfully'
                }
            }
        }
    )
}

const login = (email, password) => {
    return db.User.findOne({ email }).then(
        (result) => {
            if (result) {
                if (result.password == password) {
                    return {
                        status: true,
                        statusCode: 200,
                        email: email,
                        firstName: result.firstName,
                        lastName: result.lastName,
                        message: 'Login success'
                    }
                }
                else {
                    return {
                        status: false,
                        statusCode: 401,
                        message: 'Wrong password'
                    }
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 401,
                    message: 'User not found'
                }
            }
        }
    )
}

// Add wishlist to user
const addWishlistToUser = (id, name, author, price, image, description, date, discount, email) => {
    let wishRepeat = false;
    return db.User.findOne({ email }).then(
        (result) => {
            result.wishlist.map((wish) => {
                if (wish.id == id) {
                    wishRepeat = true
                }
            })
            if (wishRepeat == true) {
                return {
                    status: false,
                    statusCode: 401,
                    message: 'Product already added to wishlist'
                }
            }
            else {
                result.wishlist.push({
                    id, name, author, price, image, description, date, discount
                })
                result.save()
                return {
                    status: true,
                    statusCode: 200,
                    message: 'Product added to wishlist'
                }
            }
        }
    )
}

// Get wishlist products
const getWishFromUser = (email) => {
    return db.User.findOne({ email }).then(
        (result) => {
            if (result) {
                return {
                    status: true,
                    statusCode: 200,
                    products: result.wishlist
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 404,
                    message: 'user not found'
                }
            }
        }
    )
}


const deleteWishUser = (index, email) => {
    return db.User.findOne({ email }).then(
        (result) => {
            if (result) {
                result.wishlist.splice(index, 1);
                result.save();
                return {
                    status: true,
                    statusCode: 200,
                    message: 'Product removed successfully'
                }
            }
            else {
                return {
                    status: true,
                    statusCode: 402,
                    message: 'Product Not Found'
                }
            }
        }
    )
}

const deleteAllWishFromUser = (email) => {
    return db.User.findOne({ email }).then(
        (result) => {
            if (result) {
                result.wishlist = [];
                result.save()
                return {
                    status: true,
                    statusCode: 200,
                    message: 'wishlist fully cleared sucessfully'
                }
            }
            else {
                return {
                    status: true,
                    statusCode: 402,
                    message: 'wishlist cleared failed'
                }
            }
        }
    )
}

// add to cart to user
const addCartToUser = (id, name, author, price, image, description, date, discount, email) => {
    return db.User.findOne({ email }).then(
        (result) => {
            if (result) {
                result.cart.push({
                    id, name, author, price, image, description, date, discount
                })
                result.save()
                return {
                    status: true,
                    statusCode: 200,
                    message: 'Product added to Cart'
                }
            } return {
                status: false,
                statusCode: 401,
                message: 'User not found'
            }
        }
    )
}

// Get cart from user 
const getCartFromUser = (email) => {
    return db.User.findOne({ email }).then(
        (result) => {
            if (result) {
                return {
                    status: true,
                    statusCode: 200,
                    products: result.cart
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 404,
                    message: 'user not found'
                }
            }
        }
    )
}

const deleteCartUser = (email, index) => {
    return db.User.findOne({ email }).then(
        (result) => {
            if (result) {
                result.cart.splice(index, 1);
                result.save();
                return {
                    status: true,
                    statusCode: 200,
                    message: 'Product removed from cart"'
                }
            }
            else {
                return {
                    status: true,
                    statusCode: 402,
                    message: 'User Not Found'
                }
            }
        }
    )
}

const deleteAllCartFromUser = (email) => {
    return db.User.findOne({ email }).then(
        (result) => {
            if (result) {
                result.cart = [];
                result.save()
                return {
                    status: true,
                    statusCode: 200,
                    message: 'cart fully cleared sucessfully'
                }
            }
            else {
                return {
                    status: true,
                    statusCode: 402,
                    message: 'cart cleared failed'
                }
            }
        }
    )
}

const addOrderToAdmin = (obj, userName, email) => {
    id = 1
    obj.userName = userName
    obj.email = email


    db.Admin.findOne({ id }).then(
        (result) => {
            if (result) {
                result.orders.unshift(obj);
                result.save();
            }
            else {
                console.log('admin collection not found')
            }
        }
    )
}

const addOrder = (address, total, email, productList, userName) => {
    const random = Math.floor(Math.random() * 1000000)
    let date = new Date().toISOString()
    const id = random + email + date;
    date = date.slice(0, 10)
    const obj = {
        id,
        date,
        price: total,
        address,
        product: productList,
        status: 'Not delivered'
    }
    return db.User.findOne({ email }).then(
        (result) => {
            if (result) {
                addOrderToAdmin(obj, userName, email)
                result.orders.unshift(obj);
                result.cart = [];
                result.save()

                return {
                    code: true,
                    statusCode: 200,
                    message: 'order added successfully'
                }
            }
            else {
                return {
                    code: false,
                    statusCode: 401,
                    message: 'user not found'
                }
            }
        }
    )
}

const getOrderUser = (email) => {
    return db.User.findOne({ email }).then(
        (result) => {
            if (result) {
                result.cart = [];
                result.save()
                return {
                    status: true,
                    statusCode: 200,
                    orderList: result.orders
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 400,
                    message: 'user not found'
                }
            }
        }
    )
}

const getOrdersAdmin = () => {
    return db.Admin.findOne({ id: 1 }).then(
        (result) => {
            if (result) {
                return {
                    status: true,
                    statusCode: 200,
                    orderList: result.orders
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 400,
                    message: 'user not found'
                }
            }
        }
    )
}

const adminLogin = (password) => {
    return db.Admin.find({ id: 1 }).then(
        (result) => {
            if (result) {
                if (result[0].password == password) {
                    return {
                        status: true,
                        statusCode: 200,
                        message: 'Login successfull'
                    }
                }
                else {
                    return {
                        status: false,
                        statusCode: 401,
                        message: 'Wrong Password',
                    }
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 401,
                    message: 'no account found',
                }
            }
        }
    )
}

const editProductDetails = (id, newValue, keyValue) => {
    id = parseInt(id)
    return db.Product.findOne({ id }).then(
        (product) => {
            if (product) {
                product[keyValue] = newValue;
                product.save();
                return {
                    status: true,
                    statusCode: 200,
                    message: "Edit product details sucessfull"
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 401,
                    message: 'Products not found'
                }
            }
        }
    )
}

const delivered = (orderId, email) => {
    db.Admin.findOne({ id: 1 }).then(
        (result) => {
            if (result) {
                let index = 0;
                let position = 0;
                result.orders.map((order) => {
                    if (order.id == orderId) {
                        position = index;
                    }
                    index++;
                })
                let currentOrder = result.orders[position];
                currentOrder.status = 'Delivered';
                result.orders.splice(position, 1);
                result.orders.splice(position, 0, currentOrder)
                result.save()
            }
        }
    )
    return db.User.findOne({ email }).then(
        (result) => {
            if (result) {
                let index = 0;
                let position = 0;
                result.orders.map((order) => {
                    if (order.id == orderId) {
                        position = index;
                    }
                    index++
                })
                let currentOrder = result.orders[position]
                currentOrder.status = 'Delivered'
                result.orders.splice(position, 1)
                result.orders.splice(position, 0, currentOrder)
                result.save()
                return {
                    status: true,
                    statusCode: 200,
                    message: "Order status changed successfull"
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 401,
                    message: 'order not found'
                }
            }
        }
    )
}



module.exports = {
    getProducts,
    adminLogin,

    addUser,
    login,
    addWishlistToUser,
    getWishFromUser,
    deleteAllWishFromUser,
    deleteWishUser,
    addCartToUser,
    getCartFromUser,
    deleteCartUser,
    deleteAllCartFromUser,

    addOrder,
    getOrderUser,
    getOrdersAdmin,

    editProductDetails,
    delivered
}  
