const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();

app.use(cors());
const port = 3000;

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];

app.get("/cart/add",(req,res)=>{
  let productId = parseInt(req.query.productId)
  let name = req.query.name
  let price = parseFloat(req.query.price)
  let quantity = parseInt(req.query.quantity)
  cart.push({"productId" : productId, "name" : name, "price" : price, "quantity" : quantity})
  res.json({ "cartItems" : cart})
})

function updateQuantity(cart, productId, quantity){
  for( let i = 0; i < cart.length; i++){
    if(cart[i].productId === productId){
      cart[i].quantity = quantity
    }
  }
  return cart
}

app.get("/cart/edit",(req,res)=>{
  let productId = parseInt(req.query.productId)
  let quantity = parseInt(req.query.quantity)
  let cartItems = updateQuantity(cart, productId, quantity)
  res.json({ "cartItems" : cartItems})
})

app.get("/cart/delete",(req,res)=>{
  let productId = parseInt(req.query.productId)
  let cartItems = cart.filter(data => data.productId !== productId)
  cart = cartItems
  res.json({ "cartItems" : cartItems})
})

app.get("/cart",(req,res)=>{
  res.json({ "cartItems" : cart})
})

function calculateTotalQuantity(cart) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].quantity;
  }
  return total;
}

app.get('/cart/total-quantity', (req, res) => {
  let result = calculateTotalQuantity(cart);
  res.json({ totalQuantity: result });
});

app.get("/cart/total-price",(req,res)=>{
  let totalPrice = 0
  let result = cart.forEach(data => totalPrice += (data.price * data.quantity))
  res.json({ "totalPrice" : totalPrice})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
