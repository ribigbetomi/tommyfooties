const mongoose = require("mongoose");
const saleSchema = new mongoose.Schema({
  first_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
  cart_items: {
    type: [],
    required: true,
  },
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = { Sale };
