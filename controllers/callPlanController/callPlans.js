const CallPlan = require('../../models/callPlanSchema/callPlans');

const callPlanController = {
    upsertCallPlan: async(req,res,next)=>{
        try {
            const { restaurantId, callFrequencyDays, lastCallDate, nextCallDate } = req.body;
            const callPlan = await CallPlan.findOneAndUpdate(
              { restaurantId },
              { callFrequencyDays, lastCallDate, nextCallDate },
              { upsert: true, new: true }
            );
            res.status(200).json(callPlan);
          } catch (err) {
            next(err);
          }
    },
    getTodaysCallPlans: async(req, res , next)=>{
        try {
            const today = new Date().toISOString().split('T')[0];
            const callPlans = await CallPlan.find({ nextCallDate: today });
            res.status(200).json(callPlans);
          } catch (err) {
            next(err);
          }
    },
    deleteCallPlan: async(req, res , next)=>{
        try {
            const callPlan = await CallPlan.findByIdAndDelete(req.params.id);
            if (!callPlan) return res.status(404).json({ message: 'Call plan not found' });
            res.status(200).json({ message: 'Call plan deleted successfully' });
          } catch (err) {
            next(err);
          }
    }

};

module.exports = callPlanController;