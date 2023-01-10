const express = require("express");
const _ = require("lodash");
const router = express.Router();
const { Sale } = require("../models/sale");
const crypto = require("crypto");
const axios = require("axios");
const { Order } = require("../models/order");
require("dotenv").config();

const secret = process.env.SECRET_KEY;

router.get("/verify/:reference", async (req, res) => {
  let ref = req.params.reference;

  // console.log(ref);

  let output;

  // console.log(secret);
  await axios
    .get(`https://api.paystack.co/transaction/verify/${ref}`, {
      headers: {
        authorization: `Bearer ${secret}`,
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
    })
    .then((response) => {
      output = response;
    })
    .catch((error) => {
      output = error;
      // toast.error(error.message);
    });

  console.log(output.data);
  // console.log(output.status);
  // console.log(output.data);
  // console.log(output);

  // if (output.data.data.status === "success") res.send("Successful payment");

  res.status(200).send(output.data.message);
});

// router.post("/webhook", async (req, res) => {
//   const url = process.env.CLIENT_URL;
//   let eventType;
//   let event;

//   const hash = crypto
//     .createHmac("sha512", secret)
//     .update(JSON.stringify(req.body))
//     .digest("hex");

//   if (hash == req.headers["x-paystack-signature"]) {
//     event = JSON.parse(req.body);
//     console.log(event);
//     eventType = event.event;

//     if (eventType === "charge.success") {
//       const data = _.at(event.data, [
//         // "reference",
//         "amount",
//         "email",
//         "first_name",
//         "cart_items",
//         "userId",
//       ]);

//       [
//         // reference,
//         amount,
//         email,
//         first_name,
//         cart_items,
//         userId,
//       ] = data;

//       newSale = {
//         // reference,
//         amount,
//         email,
//         first_name,
//         cart_items,
//         userId,
//       };

//       const sale = new Sale(newSale);
//       await sale.save();
//       // sale
//       //   .save()
//       //   .then((sale) => {
//       //     //   if (sale) {
//       //     //     res.redirect("/receipt/" + reference);
//       //     //   }
//       //     console.log(sale);
//       //   })
//       //   .catch((e) => {
//       //     res.redirect(`${url}/error`);
//       //   });
//     }
//     // Order;

//     // await stripe.customers
//     //   .retrieve(data.customer)
//     //   .then((customer) => {
//     //     createOrder(customer, data);
//     //   })
//     //   .catch((err) => console.log(err.message));
//   }
//   res.send(200);
// });

// router.post("/pay", (req, res) => {
//   const form = _.pick(req.body, ["amount", "userEmail", "userName"]);
//   form.metadata = {
//     full_name: form.userName,
//   };
//   form.amount *= 100;
//   initializePayment(form, (error, body) => {
//     if (error) {
//       console.log(error);
//       return;
//     }
//     response = JSON.parse(body);
//     res.redirect(response.data.authorization_url);
//   });
// });

// router.get("/callback", (req, res) => {
//   const ref = req.query.reference;
//   verifyPayment(ref, (error, body) => {
//     if (error) {
//       console.log(error);
//       return res.redirect("/error");
//     }
//     response = JSON.parse(body);

//     const data = _.at(response.data, [
//       "reference",
//       "amount",
//       "customer.email",
//       "metadata.full_name",
//     ]);
//     [reference, amount, email, full_name] = data;
//     newSale = { reference, amount, email, full_name };
//     const sale = new Sale(newSale);
//     sale
//       .save()
//       .then((sale) => {
//         if (sale) {
//           res.redirect("/receipt/" + sale._id);
//         }
//       })
//       .catch((e) => {
//         res.redirect("/error");
//       });
//   });
// });

// router.post("/sales", (req, res) => {
//   // const ref = req.query.reference;
//   // verifyPayment(ref, (error, body) => {
//   //   if (error) {
//   //     console.log(error);
//   //     return res.redirect("/error");
//   //   }
//   //   response = JSON.parse(body);

//   response = JSON.parse(req.body);

//   // });
// });

// router.get("/receipt/:id", (req, res) => {
//   const id = req.params.id;
//   Sale.findById(id)
//     .then((sale) => {
//       if (!sale) {
//         //handle error when the donor is not found
//         res.redirect("/error");
//       }
//       // res.render("success.pug", { sale });
//       res.redirect(`${process.env.CLIENT_URL}/checkout-success`);
//     })
//     .catch((e) => {
//       res.redirect("/error");
//     });
// });

module.exports = router;
