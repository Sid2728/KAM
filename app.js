const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoute/auth');
const restaurantRoutes = require('./routes/restaurantRoute/restaurant');
const interactionRoutes = require('./routes/interactionRoute/interactions');
const callPlanRoutes = require('./routes/callPlanRoute/callPlans');

dotenv.config();

const app = express();
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));


app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/interactions', interactionRoutes);
app.use('/api/call-plans', callPlanRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
