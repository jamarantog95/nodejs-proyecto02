const Restaurant = require("../models/restaurants.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync.js");


exports.validRestaurantById = catchAsync(async (req, res, next) => {
    // OBTENEMOS ID DE LA REQ PARAMS
    const { id } = req.params;

    // BUSCAR EL RESTAURANT DE FORMA INDIVIDUAL
    const restaurant = await Restaurant.findOne({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {
            // id:id,
            id,
            status: 'active',
        },
    });

    // SI NO EXISTE ENVIAMOS UN ERROR
    if (!restaurant) {
        return next(new AppError('Restaurant not found', 404));
    }

    req.restaurant = restaurant;
    next();

});

