const express = require('express');
const interactionController = require('../../controllers/interactionController/interactions')
const interactionRouter = express.Router();

interactionRouter.post('/', interactionController.addInteraction);
interactionRouter.get('/restaurant/:restaurantId', interactionController.getInteractionsByRestaurant);
interactionRouter.delete('/:id', interactionController.deleteInteraction);


module.exports = interactionRouter;