const mongoose = require('mongoose');

const CallPlanSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  callFrequencyDays: { type: Number, required: true },
  lastCallDate: { type: Date },
  nextCallDate: { type: Date, required: true },
});

CallPlanSchema.index({ nextCallDate: 1 });

module.exports = mongoose.model('CallPlan', CallPlanSchema);