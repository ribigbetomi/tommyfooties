// const express = require("express");
// const Stripe = require("stripe");
// const cors = require("cors");
// // const corsOptions = {
// //   origin: "https://tommyfooties.netlify.app",
// //   optionsSuccessStatus: 200,
// // };

// // const config = require("config");
// require("dotenv").config();
// const { Order } = require("../models/order");
// // const stripeKey = config.get("stripeKey");
// // const clientUrl = config.get("clientUrl");

// const stripe = Stripe(process.env.STRIPE_KEY);
// // const stripe = Stripe(stripeKey);
// // console.log(stripe);

// const router = express.Router();

// // router.use(cors());

// router.get("/", (req, res) => {
//   res.send("Stripe working well");
// });

// router.post(
//   "/create-checkout-session",
//   // cors(corsOptions),
//   async (req, res) => {
//     //   console.log(clientUrl, stripeKey);
//     const customer = await stripe.customers.create({
//       metadata: {
//         userId: req.body.userId,
//         cart: JSON.stringify(req.body.cartItems),
//       },
//     });
//     const line_items = req.body.cartItems.map((item) => {
//       return {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: item.title,
//             description: item.details,
//             metadata: {
//               id: item.id,
//             },
//           },
//           unit_amount: item.price * 100,
//         },
//         quantity: item.qty,
//       };
//     });
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       shipping_address_collection: {
//         allowed_countries: ["NG"],
//       },
//       shipping_options: [
//         {
//           shipping_rate_data: {
//             type: "fixed_amount",
//             fixed_amount: {
//               amount: 500,
//               currency: "usd",
//             },
//             display_name: "Via the bus park",
//             // Delivers between 5-7 business days
//             delivery_estimate: {
//               minimum: {
//                 unit: "business_day",
//                 value: 1,
//               },
//               maximum: {
//                 unit: "business_day",
//                 value: 3,
//               },
//             },
//           },
//         },
//         {
//           shipping_rate_data: {
//             type: "fixed_amount",
//             fixed_amount: {
//               amount: 1000,
//               currency: "usd",
//             },
//             display_name: "Doorstep delivery",
//             // Delivers in exactly 1 business day
//             delivery_estimate: {
//               minimum: {
//                 unit: "business_day",
//                 value: 3,
//               },
//               maximum: {
//                 unit: "business_day",
//                 value: 5,
//               },
//             },
//           },
//         },
//       ],
//       phone_number_collection: {
//         enabled: true,
//       },
//       customer: customer.id,
//       line_items,
//       mode: "payment",
//       success_url: `${process.env.CLIENT_URL}/checkout-success`,
//       cancel_url: `${process.env.CLIENT_URL}/cart`,
//     });

//     //   res.redirect(303, session.url); if the checkout button is wrapped in a form
//     res.send({ url: session.url }); // we use this cos our checkout button is only a button
//   }
// );

// // Create Order

// const createOrder = async (customer, data) => {
//   const Items = JSON.parse(customer.metadata.cart);

//   const products = Items.map((item) => {
//     return {
//       productId: item.id,
//       quantity: item.qty,
//     };
//   });

//   const newOrder = new Order({
//     userId: customer.metadata.userId,
//     customerId: data.customer,
//     paymentIntentId: data.payment_intent,
//     products,
//     subtotal: data.amount_subtotal,
//     total: data.amount_total,
//     shipping: data.customer_details,
//     payment_status: data.payment_status,
//   });

//   try {
//     const savedOrder = await newOrder.save();
//     console.log("Processed Order:", savedOrder);
//   } catch (err) {
//     console.log(err);
//   }
// };

// // Stripe webhook

// // This is your Stripe CLI webhook secret for testing your endpoint locally.

// router.post(
//   "/webhook",
//   // cors(corsOptions),
//   express.json({ type: "application/json" }),
//   async (req, res) => {
//     const sig = req.headers["stripe-signature"];

//     let endpointSecret;

//
//     let data;
//     let eventType;

//     if (endpointSecret) {
//       let event;

//       try {
//         event = await stripe.webhooks.constructEvent(
//           req.body,
//           sig,
//           endpointSecret
//         );
//         console.log("Webhook verified.");
//       } catch (err) {
//         console.log(`Webhook Error: ${err.message}`);
//         res.status(400).send(`Webhook Error: ${err.message}`);
//         return;
//       }
//       // we raise the webhook(event: checkout.session.completed), once we raise the event, the first thing to do is to confirm the event comes from stripe for security reasons
//       // this first try catch block is to verify that the event comes from stripe

//       data = event.data.object;
//       eventType = event.type;
//     } else {
//       data = req.body.data.object;
//       eventType = req.body.type;
//     }

//     // Handle the event
//     if (eventType === "checkout.session.completed") {
//       await stripe.customers
//         .retrieve(data.customer)
//         .then((customer) => {
//           createOrder(customer, data);
//         })
//         .catch((err) => console.log(err.message));
//     }

//     // Return a 200 response to acknowledge receipt of the event
//     res.send().end();
//   }
// );

// module.exports = router;
