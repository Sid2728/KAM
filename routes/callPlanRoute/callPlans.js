const express = require('express');
const { upsertCallPlan, getTodaysCallPlans, deleteCallPlan } = require('../../controllers/callPlanController/callPlans');
const router = express.Router();

router.post('/', upsertCallPlan);
router.get('/today', getTodaysCallPlans);
router.delete('/:id', deleteCallPlan);

module.exports = router;