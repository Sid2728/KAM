const mongoose = require('mongoose');

const InteractionSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  type: { type: String, enum: ['call', 'order'], required: true },
  details: String,
  interactionDate: { type: Date, required: true },
  orderDetails: {
    orderId: String,
    orderAmount: Number,
    orderDate: Date,
  },
});

InteractionSchema.index({ restaurantId: 1, interactionDate: -1 });

module.exports = mongoose.model('Interaction', InteractionSchema);