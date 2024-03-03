const mongoose = require('mongoose');
const { Schema } = mongoose;

const couponsSchema = new Schema({
    product: String,
    link: String
});

mongoose.model('coupon', couponsSchema);
