const express = require('express');
const router = express.Router();
const fs = require('fs');
const Cart = require('../models/cart');
const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Shopping Cart',
    products: products
  });
});

router.get('/add/:id', (req, res, next) => {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  const product = products.filter(item => item.id == productId);
  cart.add(product[0], productId);
  req.session.cart = cart;
  res.redirect('/');
});

router.get('/cart', (req, res, next) => {
  if (!req.session.cart) {
    return res.render('cart', {
      products: null
    });
  }
  const cart = new Cart(req.session.cart);
  res.render('cart', {
    title: 'Shopping Cart',
    products: cart.getItems(),
    totalPrice: cart.totalPrice
  });
});

router.get('/remove/:id', (req, res, next) => {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.remove(productId);
  req.session.cart = cart;
  res.redirect('/cart');
});

module.exports = router;
