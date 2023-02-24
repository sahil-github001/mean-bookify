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

const getAllFiction = () => {
    return db.Product.find({ category: 'Fiction' }).then(
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

const getAllBestSellers = () => {
    return db.Product.find({ category: 'Best Sellers' }).then(
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

const getAllNewArrival = () => {
    return db.Product.find({ category: 'New Arrival' }).then(
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

const getTopBestSellers = () => {
    return db.Product.find({ home: 1 }).then(
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

const getTopNewArrival = () => {
    return db.Product.find({ home: 3 }).then(
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

const getTopFiction = () => {
    return db.Product.find({ home: 2 }).then(
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

// add to wishlist details store to db
const addToWishlist = (id, name, author, price, image, description, date, discount) => {
    return db.Wishlist.findOne({ id }).then(
        (result) => {
            if (result) {
                return {
                    status: false,
                    statusCode: 401,
                    message: 'Product already added..'
                }
            }
            else {
                const newProduct = new db.Wishlist({
                    id, name, author, price, image, description, date, discount
                })
                newProduct.save();
                return {
                    status: true,
                    statusCode: 200,
                    message: 'Product added successfully'
                }
            }
        }
    )
}

// add to wishlist to user
const addWishlistToUser = (id, name, author, price, image, description, date, discount, email) => {
    let wishRepeat = false;
    const newObj = {
        id,
        name,
        author,
        price,
        image,
        description,
        date,
        discount
    }
 
    return db.User.findOne({ email }).then(
        (result) => {
            let currentWish = result.wishlist;
            currentWish.map((wish) => {
                if (wish.id == newObj.id) {
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
                currentWish.push(newObj)
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

// add to cart to user
const addCartToUser = (id, name, author, price, image, description, date, discount, email) => {
    const newObj = {
        id,
        name,
        author,
        price,
        image,
        description,
        date,
        discount
    }
 
    return db.User.findOne({ email }).then(
        (result) => {
            if(result){
                result.cart.push(newObj)
                result.save()
                return {
                    status: true,
                    statusCode: 200,
                    message: 'Product added to Cart'
                }
            }return {
                status: false,
                statusCode: 401,
                message: 'User not found'
            } 
        }
    )
}

const addOrderToAdmin = (obj, userName, email) => {
    id = 1
    obj.userName = userName
    obj.email = email
    
   
    db.Admin.findOne({id}).then(
        (result) => {
            if(result) {
                result.orders.unshift(obj);
                result.save();
            }
            else{
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
        price:total,
        address,
        product:productList
    }
    return db.User.findOne({email}).then(
        (result) => {
            if(result){
                let currentOrder = [];
              
                addOrderToAdmin(obj, userName, email)
                currentOrder = result.orders;
                currentOrder.unshift(obj);
                result.orders = currentOrder;
                result.save()
                
                return{
                    code:true,
                    statusCode:200,
                    message:'order added'
                }
            } 
            else{
                return {
                    code:false,
                    statusCode:401,
                    message:'user not found'
                }
            }
        }
    )
}

const getOrderUser = (email) => {
    console.log('get order user dataserve work')
    return db.User.findOne({email}).then(
        (result) => {
            console.log('emailwork') 
            if(result){
                result.cart = [];  
                result.save()  
                return {
                    status:true,
                    statusCode:200,
                    orderList: result.orders
                }
            }
            else{
                return {
                    status:false,
                    statusCode:400,
                    message: 'user not found'
                }
            }
        }
    )
} 
const getOrdersAdmin = () => {
    return db.Admin.findOne({id:1}).then(
        (result) => {
            if(result){
                return {
                    status:true,
                    statusCode:200,
                    orderList: result.orders
                }
            }
            else{
                return {
                    status:false,
                    statusCode:400,
                    message: 'user not found'
                }
            }
        }
    )
} 


//////////////////////////////////////////////////////////////////////////////////////////////////////
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

// Get wishlist products
const getWishlist = () => {
    return db.Wishlist.find().then(
        (result) => {
            if (result) {
                return {
                    status: true,
                    statusCode: 200,
                    products: result
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 406,
                    message: 'Wishlist is Empty'
                }
            }
        }
    )
}
// Get wishlist products
const getWishFromUser = (email) => {
    return db.User.findOne({email}).then(
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
// Get cart from user 
const getCartFromUser = (email) => {
    return db.User.findOne({email}).then(
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
const deleteWish = (id) => {
    return db.Wishlist.findOneAndDelete({ id }).then(
        (result) => {
            if (result) {
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

const deleteWishUser = (id, email) => {
    return db.User.findOne({ email }).then(
        (result) => {
            if (result) {
                let currentWish = result.wishlist
                let index = 0;
                currentWish.map((wish) => {
                    if(wish.id == id){
                        currentWish.splice(index, 1);
                    }
                    index += 1
                })
                result.wishlist = currentWish;
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

const deleteCartUser = (email, index) => {
    return db.User.findOne({ email }).then(
        (result) => {
            if (result) {
                result.cart.splice(index, 1);
                result.save();
                return {
                    status:true,
                    statusCode:200,
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

const deleteAllWish = () => {
    return db.Wishlist.deleteMany().then(
        (result) => {
            if (result) {
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

const deleteAllWishFromUser = (email) => {
    return db.User.findOne({email}).then(
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

const deleteAllCartFromUser = (email) => {
    return db.User.findOne({email}).then(
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
                    message: 'wishlist cleared failed'
                }
            }
        }
    )
}


// Get cart
const getCart = () => {
    return db.Cart.find().then(
        (result) => {
            if (result) {
                return {
                    status: true,
                    statusCode: 200,
                    products: result
                }
            }
            else {
                return {
                    status: false,
                    statusCode: 406,
                    message: 'Cart is Empty'
                }
            }
        }
    )
}

const addToCart = (id, name, author, price, image, description, date, discount) => {
    return db.Cart.findOne().then(
        (result) => {
            if (result) {
                const newProduct = new db.Cart({
                    id, name, author, price, image, description, date, discount
                })
                newProduct.save();
                return {
                    status: true,
                    statusCode: 200,
                    message: 'Product added to cart successfully'
                }
            } else {
                const newProduct = new db.Cart({
                    id,
                    name,
                    author,
                    price,
                    image,
                    description,
                    date,
                    discount
                })
                newProduct.save();
                return {
                    status: true,
                    statusCode: 200,
                    message: 'Product added to cart successfully'
                }
            }
        }
    )
}

const deleteCart = (id) => {
    return db.Cart.findOneAndDelete({ id }).then(
        (result) => {
            if (result) {
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

const deleteAllCart = (id) => {
    return db.Cart.deleteMany().then(
        (result) => {
            if (result) {
                return {
                    status: true,
                    statusCode: 200,
                    message: 'Cart fully cleared sucessfully'
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

const editName = (id, newName) => {
    return db.Product.findOne({ id }).then(
        (user) => {
            if (user) {
                user.name = newName;
                user.save();
                return {
                    status: true,
                    statusCode: 200,
                    message: "Edit title successfull"
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

const editAuthor = (id, newAuthor) => {
    return db.Product.findOne({ id }).then(
        (user) => {
            if (user) {
                user.author = newAuthor;
                user.save();
                return {
                    status: true,
                    statusCode: 200,
                    message: "Edit Author successfull"
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

const editPrice = (id, newPrice) => {
    return db.Product.findOne({ id }).then(
        (user) => {
            if (user) {
                newPrice = parseInt(newPrice);
                user.price = newPrice;
                user.save();
                return {
                    status: true,
                    statusCode: 200,
                    message: "Edit Price successfull"
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

const changeCategory = (id, newCategory) => {
    return db.Product.findOne({ id }).then(
        (user) => {
            if (user) {
                user.category = newCategory;
                user.save();
                return {
                    status: true,
                    statusCode: 200,
                    message: 'edit category successfull'
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

const editHomeValue = (id, newHomeValue) => {
    return db.Product.findOne({ id }).then(
        (user) => {
            if (user) {
                user.home = newHomeValue;
                user.save();
                return {
                    status: true,
                    statusCode: 200,
                    message: user.home
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

const editDiscount = (id, newDiscountValue) => {
    return db.Product.findOne({ id }).then(
        (user) => {
            if (user) {
                newDiscountValue = parseInt(newDiscountValue);
                user.discount = newDiscountValue;
                user.save();
                return {
                    status: true,
                    statusCode: 200,
                    message: 'Edit discount successfull'
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


const editDate = (id, newDate) => {
    return db.Product.findOne({ id }).then(
        (user) => {
            if (user) {
                user.date = newDate;
                user.save();
                return {
                    status: true,
                    statusCode: 200,
                    message: 'Date changed successfull'
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
                    firstName,
                    lastName,
                    email,
                    password,
                    wishlist
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


module.exports = {
    getProducts,
    getAllFiction,
    getAllBestSellers,
    getAllNewArrival,
    getTopBestSellers,
    getTopFiction,
    getTopNewArrival,
    addToWishlist,
    getWishlist,
    deleteWish,
    deleteAllWish,

    getCart,
    deleteCart,
    addToCart,
    deleteAllCart,
    adminLogin,

    editPrice,
    editName,
    editAuthor,
    changeCategory,
    editHomeValue,
    editDiscount,
    editDate,

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
    getOrdersAdmin
}  
