import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  payment: String,
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  total: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
