const express = require('express');
const cors = require('cors');
const dataServices = require('./service/dataServices')

const app = express();

app.use(express.json());

app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(3000, () => {
    console.log('listening to port : 3000');
});

// Get all products
app.get('/all-products', (req, res) => {
    dataServices.getProducts().then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// API call to add wishlist to User
app.post('/addWishToUser', (req, res) => {
    dataServices.addWishlistToUser(req.body.id, req.body.name, req.body.author, req.body.price, req.body.image,
        req.body.description, req.body.date, req.body.discount, req.body.email).then(
            (result) => {
                res.status(result.statusCode).json(result);
            }
        )
})

// API call to get wishlist from user
app.post('/getWishFromUser', (req, res) => {
    dataServices.getWishFromUser(req.body.email).then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// API call clear all wishlist from user
app.post('/clearAllWishUser', (req, res) => {
    dataServices.deleteAllWishFromUser(req.body.email).then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// API call clear all wishlist from user
app.post('/deleteWishUser', (req, res) => {
    dataServices.deleteWishUser(req.body.index, req.body.email).then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// API call to add cart to User
app.post('/addCartToUser', (req, res) => {
    dataServices.addCartToUser(req.body.id, req.body.name, req.body.author, req.body.price, req.body.image,
        req.body.description, req.body.date, req.body.discount, req.body.email).then(
            (result) => {
                res.status(result.statusCode).json(result);
            }
        )
})

// API call to get cart from user
app.post('/getCartFromUser', (req, res) => {
    dataServices.getCartFromUser(req.body.email).then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// API call to remove cart from user
app.post('/deleteCartFromUser', (req, res) => {
    dataServices.deleteCartUser(req.body.email, req.body.index).then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})
// API call to remove all cart from user
app.post('/deleteAllCartFromUser', (req, res) => {
    dataServices.deleteAllCartFromUser(req.body.email).then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})


// API call to login as admin
app.post('/loginAdmin', (req, res) => {
    dataServices.adminLogin(req.body.password).then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// API call to edit product details
app.post('/editProductDetails', (req, res) => {
    dataServices.editProductDetails(req.body.id, req.body.newValue, req.body.keyValue).then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})


// API call to add new user
app.post('/register', (req, res) => {
    dataServices.addUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password).then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// API call to login user
app.post('/login', (req, res) => {
    dataServices.login(req.body.email, req.body.password).then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// API call to Add Order to user
app.post('/addOrder', (req, res) => {
    dataServices.addOrder(req.body.address, req.body.total, req.body.email, 
                            req.body.productList, req.body.userName).then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// API call to get order from user
app.post('/getOrderUser', (req, res) => {
    dataServices.getOrderUser(req.body.email).then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// API call to get order from user
app.get('/getOrderAdmin', (req, res) => {
    dataServices.getOrdersAdmin().then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// API call to get mark order as delivered
app.put('/delivered', (req, res) => {
    dataServices.delivered(req.body.orderId, req.body.email).then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})
