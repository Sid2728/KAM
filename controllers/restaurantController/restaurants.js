const Restaurant = require('../../models/restaurantSchema/restaurants');
const Interaction = require('../../models/interactionSchema/interactions');

const restaurantController = {
    addRestaurant: async(req,res,next)=>{
        try {
            const { name, address, status, contacts, keyAccountManager } = req.body;
            const restaurant = new Restaurant({ name, address, status, contacts, keyAccountManager });
            await restaurant.save();
            res.status(201).json(restaurant);
          } catch (err) {
            next(err);
          }
    },
    getRestaurantById: async(req,res,next)=>{
        try {
            const restaurant = await Restaurant.findById(req.params.id);
            if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
            res.status(200).json(restaurant);
          } catch (err) {
            next(err);
          }
    },
    updateRestaurant: async(req,res,next)=>{
        try {
            const updates = req.body;
            const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, updates, { new: true });
            if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
            res.status(200).json(restaurant);
          } catch (err) {
            next(err);
          }
    },
    deleteRestaurant: async(req,res,next)=>{
        try {
            const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
            if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
            res.status(200).json({ message: 'Restaurant deleted successfully' });
          } catch (err) {
            next(err);
          }
    },
    getPerformanceMetrics : async(req, res ,next)=>{
      try {
        const metrics = await Restaurant.aggregate([
          {
            $lookup: {
              from: 'interactions',
              localField: '_id',
              foreignField: 'restaurantId',
              as: 'interactions',
            },
          },
          {
            $project: {
              name: 1,
              status: 1,
              address: 1,
              lastInteractionDate: {
                $max: {
                  $map: {
                    input: '$interactions',
                    as: 'interaction',
                    in: '$$interaction.interactionDate',
                  },
                },
              },
              totalOrders: {
                $size: {
                  $filter: {
                    input: '$interactions',
                    as: 'interaction',
                    cond: { $eq: ['$$interaction.type', 'order'] },
                  },
                },
              },
              totalOrderValue: {
                $sum: {
                  $map: {
                    input: '$interactions',
                    as: 'interaction',
                    in: { $ifNull: ['$$interaction.orderDetails.orderAmount', 0] },
                  },
                },
              },
            },
          },
          {
            $sort: { totalOrderValue: -1 },
          },
        ]);
    
        res.status(200).json(metrics);
      } catch (err) {
        next(err);
      }
    },
    calculatePerformanceMetrics : async (req, res) => {
      try {
        const metrics = await Interaction.aggregate([
          {
            $group: {
              _id: '$restaurantId',
              totalOrders: {
                $sum: { $cond: [{ $eq: ['$type', 'order'] }, 1, 0] }
              },
              totalOrderValue: {
                $sum: { $cond: [{ $eq: ['$type', 'order'] }, '$orderDetails.orderAmount', 0] }
              },
              lastInteractionDate: { $max: '$interactionDate' }
            }
          },
          {
            $lookup: {
              from: 'restaurants',
              localField: '_id',
              foreignField: '_id',
              as: 'restaurantDetails'
            }
          },
          {
            $unwind: '$restaurantDetails'
          },
          {
            $project: {
              name: '$restaurantDetails.name',
              status: '$restaurantDetails.status',
              address: '$restaurantDetails.address',
              totalOrders: 1,
              totalOrderValue: 1,
              lastInteractionDate: 1,
              performanceCategory: {
                $cond: [
                  { $or: [{ $gt: ['$totalOrders', 3] }, { $gt: ['$totalOrderValue', 1000] }] },
                  'Well-Performing',
                  'Underperforming'
                ]
              }
            }
          }
        ]);
    
        res.status(200).json(metrics);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
};

module.exports = restaurantController;

