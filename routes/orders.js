const  Order  = require("../models/order");
const auth = require("../middleware/auth");
const asyncHandler = require("express-async-handler");
const router = require("express").Router();

// //CREATE

// // createOrder is fired by stripe webhook
// // example endpoint

router.post(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      userId,
      // shippingAddress,
      // paymentMethod,
      // itemsPrice,
      // taxPrice,
      // shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
      
    } else {
      const order = new Order({
        orderItems,
        userId: req.user._id,
        //   shippingAddress,
        //   paymentMethod,
        // itemsPrice,
        // taxPrice,
        // shippingPrice,
        totalPrice,
      });

      const createOrder = await order.save();
      // console.log(createOrder._id)
      res.status(200).send(createOrder);
    }

    //   const newOrder = new Order(req.body);

    //   try {
    //     const savedOrder = await newOrder.save();
    //     res.status(200).send(savedOrder);
    //   } catch (err) {
    //     res.status(500).send(err);
    //   }
  })
);

router.put('/:orderId', auth, async(req, res) => {
  const orderId = req.params.orderId

  const order = await Order.findById(orderId)
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    
// order.paymentResult = {
//   id: req.body.id,
//   status: req.body.status,
//   update_time: req.body.update_time,
//   email_address: req.body.email_address,
// };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
} else {
res.status(404);
throw new Error("Order Not Found");
}
})


// //UPDATE
// router.put("/:id", isAdmin, async (req, res) => {
//   try {
//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).send(updatedOrder);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// //DELETE
// router.delete("/:id", isAdmin, async (req, res) => {
//   try {
//     await Order.findByIdAndDelete(req.params.id);
//     res.status(200).send("Order has been deleted...");
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// //GET USER ORDERS
// router.get("/find/:userId", isUser, async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId });
//     res.status(200).send(orders);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// //GET ALL ORDERS

// router.get("/", isAdmin, async (req, res) => {
//   try {
//     const orders = await Order.find();
//     res.status(200).send(orders);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// // GET MONTHLY INCOME

// router.get("/income", isAdmin, async (req, res) => {
//   const date = new Date();
//   const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
//   const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

//   try {
//     const income = await Order.aggregate([
//       { $match: { createdAt: { $gte: previousMonth } } },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//           sales: "$amount",
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: "$sales" },
//         },
//       },
//     ]);
//     res.status(200).send(income);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

module.exports = router;
