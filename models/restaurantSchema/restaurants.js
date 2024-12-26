const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, enum: ['new', 'contacted', 'converted', 'inactive'], required: true },
  contacts: [
    {
      contactId: mongoose.Schema.Types.ObjectId,
      name: { type: String, required: true },
      role: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    }
  ],
  keyAccountManager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

RestaurantSchema.index({ keyAccountManager: 1 });

module.exports = mongoose.model('Restaurant', RestaurantSchema);