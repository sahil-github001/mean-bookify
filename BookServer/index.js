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

// Get all fiction
app.get('/all-fiction', (req, res) => {
    dataServices.getAllFiction().then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// Get all best sellers
app.get('/all-bestSellers', (req, res) => {
    dataServices.getAllBestSellers().then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// Get all new arrival
app.get('/all-newArrival', (req, res) => {
    dataServices.getAllNewArrival().then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// Get top best sellers
app.get('/top-bestSellers', (req, res) => {
    dataServices.getTopBestSellers().then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// Get top fiction
app.get('/top-fiction', (req, res) => {
    dataServices.getTopFiction().then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// Get top new arrival
app.get('/top-newArrival', (req, res) => {
    dataServices.getTopNewArrival().then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// API call to  addTo wishlist
app.post('/addToWishlist', (req, res) => {
    dataServices.addToWishlist(req.body.id, req.body.name, req.body.author, req.body.price, req.body.image,
        req.body.description, req.body.date, req.body.discount).then(
            (result) => {
                res.status(result.statusCode).json(result);
            }
        )
})

// API call to get wishlist
app.get('/getWishlist', (req, res) => {
    dataServices.getWishlist().then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// API call to delete one wishlist
app.delete('/deleteWishlist/:id', (req, res) => {
    dataServices.deleteWish(req.params.id).then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// API call to delete all wishlist
app.delete('/deleteAllWishlist', (req, res) => {
    dataServices.deleteAllWish(req.params.id).then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// API call to  add To cart
app.post('/addToCart', (req, res) => {
    dataServices.addToCart(req.body.id, req.body.name, req.body.author, req.body.price, req.body.image,
        req.body.description, req.body.date, req.body.discount).then(
            (result) => {
                res.status(result.statusCode).json(result);
            }
        )
})

// API call to get cart
app.get('/getCart', (req, res) => {
    dataServices.getCart().then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// Api call to delete one cart
app.delete('/deleteCart/:id', (req, res) => {
    dataServices.deleteCart(req.params.id).then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// API call to delete all cart
app.delete('/deleteAllCart', (req, res) => {
    dataServices.deleteAllCart(req.params.id).then(
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

// API call to edit price
app.post('/editPrice', (req, res) => {
    dataServices.editPrice(req.body.id, req.body.newPrice).then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// API call to edit name
app.post('/editName', (req, res) => {
    dataServices.editName(req.body.id, req.body.newName).then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// API call to edit author
app.post('/editAuthor', (req, res) => {
    dataServices.editAuthor(req.body.id, req.body.newAuthor).then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// API call to change category
app.post('/changeCategory', (req, res) => {
    dataServices.changeCategory(req.body.id, req.body.newCategory).then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// API call to change Home value
app.get('/editHomeValue', (req, res) => {
    dataServices.editHomeValue(req.body.id, req.body.newHomeValue).then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// API call to change discount value
app.post('/editDiscount', (req, res) => {
    dataServices.editDiscount(req.body.id, req.body.newDiscountValue).then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// API call to change date value
app.post('/newDate', (req, res) => {
    dataServices.editDate(req.body.id, req.body.newDate).then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
}) 

// API call to add new user
app.post('/register', (req, res) => {
    dataServices.addUser(req.body.firstName,req.body.lastName, req.body.email, req.body.password).then(
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
    dataServices.deleteWishUser(req.body.id, req.body.email).then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})
 
// API call to Add Order to user
app.post('/addOrder', (req, res) => {
    dataServices.addOrder(req.body.address, req.body.total, req.body.email, req.body.productList, req.body.userName).then(
        (result) => {
            res.status(result.statusCode).json(result)
        }
    )
})

// API call to get order from user
app.post('/getOrderUser', (req, res) => {
    console.log('get order user work')
    console.log(req.body.email)
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


