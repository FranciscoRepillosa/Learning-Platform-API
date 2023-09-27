const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema({
    priceInCents: Number,
    buyerId: String,
    sellerId: String,
    Date: Date,
    productId: String,
    productName: String
});

const Sales = mongoose.model("Sales", SalesSchema);

module.exports = Sales;