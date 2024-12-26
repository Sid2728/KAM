const express = require('express');
const restaurantController = require('../../controllers/restaurantController/restaurants');
const authMiddleware = require('../../middleware/authMiddleware/auth');
const restaurantRouter = express.Router();

restaurantRouter.use(authMiddleware.authenticate); 

restaurantRouter.post('/', restaurantController.addRestaurant);
restaurantRouter.get('/:id', restaurantController.getRestaurantById);
restaurantRouter.put('/:id', restaurantController.updateRestaurant);
restaurantRouter.delete('/:id', restaurantController.deleteRestaurant);
restaurantRouter.get('/metrics/track', restaurantController.getPerformanceMetrics);
restaurantRouter.get('/metrics/calculate', restaurantController.calculatePerformanceMetrics);

module.exports = restaurantRouter;