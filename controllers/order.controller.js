const Order = require("../models/order.model");
const catchAsync = require("../utils/catchAsync,js");



exports.createOrder = catchAsync(async (req, res) => {

    // OBTENER INFORMACION  DEL REQ BODY
    const { mealId, quantity } = req.body;
    const { sessionUser } = req;

    // CREAR UN NUEVO PRODUCTO
    const order = await Order.create({
        mealId,
        quantity,
        userId: sessionUser.userId,
    });

    // RESPUESTA DEL SERVIDOR
    res.status(201).json({
        status: 'success',
        message: 'The order was created. ',

        order,

    });

});


exports.findAllOrders = catchAsync(async (req, res) => {

    // BUSCAMOS TODOS LAS COMIDAS CON STATUS TRUE
    const orders = await Order.findAll({
        where: {
            status: 'active',
        }
    });

    // RESPUESTA DEL SERVIDOR
    res.status(200).json({
        status: 'success',
        message: 'The orders has been show.',
        //Enviamos todos las comidas
        orders

    });

});


exports.updateOrder = catchAsync(async (req, res) => {

    // DESTRUCTURING DE LA REQ
    const { order } = req;

    // OBTENER INFORMACION A ACTUALIZAR DEL REQ BODY
    await order.update({
        status: 'completed'
    });


    // RESPUESTA DEL SERVIDOR
    res.status(200).json({
        status: 'success',
        message: 'The order has been completed',
    });

});


exports.deleteOrder = catchAsync(async (req, res) => {

    // DESTRUCTURING DE LA REQ
    const { order } = req;

    // OBTENER INFORMACION A ACTUALIZAR DEL REQ BODY
    await order.update({
        status: 'cancelled'
    });


    // RESPUESTA DEL SERVIDOR
    res.status(200).json({
        status: 'success',
        message: 'The order has been cancelled',
    });

});