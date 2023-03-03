const Order = require("../models/order.model");
const catchAsync = require("../utils/catchAsync,js");


exports.validOrderById = catchAsync(async (req, res, next) => {
    // OBTENEMOS ID DE LA REQ PARAMS
    const { id } = req.params;

    // BUSCAR EL RESTAURANT DE FORMA INDIVIDUAL
    const order = await Order.findOne({
        where: {
            // id:id,
            id,
            status: 'active',
        },
    });

    // SI NO EXISTE ENVIAMOS UN ERROR
    if (!order) {
        return next(new AppError('Restaurant not found', 404));
    }

    req.order = order;
    next();

});