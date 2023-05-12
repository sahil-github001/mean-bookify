# Bookify

Bookify is a web application that allows users to browse, search, and purchase books, and allows administrators to manage book data and orders.

## Features

### User Features

- Browse books by category
- Search for a specific book using the search bar
- Add books to wishlist or cart
- View wishlist and cart
- Proceed to checkout and enter delivery details
- View order history

### Admin Features

- Add, edit, or delete book data
- Update order statuses
- View all orders

## Installation

1. Install Node.js and npm.
2. Clone the repository
3. Install dependencies: `cd bookify && npm install`
4. Start the server: `npm start`

### Setting up the database

1. Create two collections in MongoDB Community Edition using MongoDB Compass or the command-line interface (CLI):
   - `products`: This collection will contain data for all books in the store. Import the `products.json` file from the `server` folder to populate the collection with sample data.
   - `admins`: This collection will contain login information for administrators. Import the `admins.json` file from the `server` folder.
2. Monogdb connection string  `mongodb://0.0.0.0:27017` to connect to your MongoDB.

## Usage

To use Bookify as a user:

1. Open `http://localhost:4200` in your web browser.
2. Browse books by category or search for a specific book using the search bar.
3. Add books to your wishlist or cart by clicking the corresponding buttons on the book card.
4. View your wishlist or cart by clicking the button links in the header.
5. Proceed to checkout by clicking the "Checkout" button on the cart page and filling out the delivery form.
6. View your order history by clicking the "View Order Items" link in the footer.

To access the admin dashboard:

1. Go to `http://localhost:4200/home/admin` or click `ADMIN` link in footer.
2. Enter the admin  password from `backend/admins.json`.
3. Use the dashboard to add, edit, or delete book data, or update order statuses.

Note: The frontend runs on port 4200 and the backend runs on port 3000.




