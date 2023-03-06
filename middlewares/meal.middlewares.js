const Meal = require("../models/meals.model");
const catchAsync = require("../utils/catchAsync.js");


exports.validMealById = catchAsync(async (req, res, next) => {
    // OBTENEMOS ID DE LA REQ PARAMS
    const { id } = req.params;

    // BUSCAR EL MEAL DE FORMA INDIVIDUAL
    const meal = await Meal.findOne({
        where: {
            // id:id,
            id,
            status: 'active',
        },
    });

    // SI NO EXISTE ENVIAMOS UN ERROR
    if (!meal) {
        return next(new AppError('Product not found', 404));
    }

    req.meal = meal;
    next();

});
