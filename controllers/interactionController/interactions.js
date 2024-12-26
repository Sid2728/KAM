 const Interaction = require('../../models/interactionSchema/interactions');
 
 const interactionController = {
    addInteraction: async (req, res, next) => {
      try {
        const { restaurantId, type, details, interactionDate, orderDetails } = req.body;
        const interaction = new Interaction({ restaurantId, type, details, interactionDate, orderDetails });
        await interaction.save();
        res.status(201).json(interaction);
      } catch (err) {
        next(err);
      }
    },
  
    getInteractionsByRestaurant: async (req, res, next) => {
      try {
        const interactions = await Interaction.find({ restaurantId: req.params.restaurantId });
        res.status(200).json(interactions);
      } catch (err) {
        next(err);
      }
    },
    deleteInteraction: async(req,res,next)=>{
      try {
        const interaction = await Interaction.findByIdAndDelete(req.params.id);
        if (!interaction) return res.status(404).json({ message: 'Interaction not found' });
        res.status(200).json({ message: 'Interaction deleted successfully' });
      } catch (err) {
        next(err);
      }
    }
  };

  module.exports = interactionController;

