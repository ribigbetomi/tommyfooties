const express = require("express");
const _ = require("lodash");
const router = express.Router();
const { Sale } = require("../models/sale");
const crypto = require("crypto");
const axios = require("axios");
const { Order } = require("../models/order");
require("dotenv").config();

const secret = process.env.SECRET_KEY;
let url = process.env.CLIENT_URL

router.get("/verify/:reference/:orderId", async (req, res) => {
  let ref = req.params.reference;
  let orderId = req.params.orderId

  let output;
  
  await axios
    .get(`https://api.paystack.co/transaction/verify/${ref}`, {
      headers: {
        authorization: `Bearer ${secret}`,
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
    })
    .then( (response) => {
      output = response;
    })
    .catch((error) => {
      output = error;
      
    });

  
console.log(output.data)
   if (output.data.message === 'Verification successful') {
    res.status(200).redirect(`${url}/checkout-success`);
   } else {
    res.status(404).send('Error occured')
   }
    
});


module.exports = router;
