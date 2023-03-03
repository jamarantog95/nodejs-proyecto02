const Meal = require("../models/meals.model");
const catchAsync = require("../utils/catchAsync,js");

exports.findAllMeals = catchAsync(async (req, res) => {

    // BUSCAMOS TODOS LAS COMIDAS CON STATUS TRUE
    const meals = await Meal.findAll({
        where: {
            status: 'active',
        }
    });

    // RESPUESTA DEL SERVIDOR
    res.status(200).json({
        status: 'success',
        message: 'The meals has been show.',
        //Enviamos todos las comidas
        meals

    });

});


exports.findMeal = catchAsync(async (req, res) => {

    // DESTRUCTURING DE LA REQ
    const { meal } = req;

    // RESPUESTA DEL SERVIDOR
    res.status(200).json({
        status: 'success',
        message: 'The meal was found successfully.',
        //Enviamos la comida a consultar
        meal
    });

});


exports.createMeal = catchAsync(async (req, res) => {

    // OBTENER INFORMACION  DEL REQ BODY
    const { name, price, restaurantId } = req.body;
    const { sessionUser } = req;

    // CREAR UN NUEVO PRODUCTO
    const meal = await Meal.create({
        name: name.toLowerCase(),
        price,
        restaurantId: sessionUser.restaurantId,
    });

    // RESPUESTA DEL SERVIDOR
    res.status(201).json({
        status: 'success',
        message: 'The meal was created. ',

        meal,

    });

});


exports.updateMeal = catchAsync(async (req, res) => {

    // DESTRUCTURING DE LA REQ
    const { meal } = req;

    // OBTENER INFORMACION A ACTUALIZAR DEL REQ BODY
    const { name, price } = req.body;

    // BUSCAR EL PRODUCTO A ACTUALIZAR
    const updateMeal = await meal.update({
        name,
        price,
    });

    // SI NO EXISTE ENVIAMOS UN ERROR
    res.status(200).json({
        status: 'success',
        message: 'The meal has been update successfully',

        updateMeal,

    });

});


exports.deleteMeal = catchAsync(async (req, res) => {

    // DESTRUCTURING DE LA REQ
    const { meal } = req;

    // OBTENER INFORMACION A ACTUALIZAR DEL REQ BODY
    await meal.update({
        status: 'disabled'
    });
    // await product.destroy();

    // RESPUESTA DEL SERVIDOR
    res.status(200).json({
        status: 'success',
        message: 'The meal has been disabled',
    });

});