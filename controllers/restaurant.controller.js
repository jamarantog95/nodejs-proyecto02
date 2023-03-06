const Restaurant = require("../models/restaurants.model");
const Review = require("../models/review.model");
const catchAsync = require("../utils/catchAsync.js");


exports.findAllRestaurants = catchAsync(async (req, res) => {

    // BUSCAMOS TODOS LOS RESTAURANTES CON STATUS TRUE
    const restaurants = await Restaurant.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {
            status: 'active',
        }
    });

    // RESPUESTA DEL SERVIDOR
    res.status(200).json({
        status: 'success',
        message: 'The restaurants has been show.',
        //Enviamos todos los restaurantes
        restaurants

    });

});


exports.findRestaurant = catchAsync(async (req, res) => {

    // DESTRUCTURING DE LA REQ
    const { restaurant } = req;

    // RESPUESTA DEL SERVIDOR
    res.status(200).json({
        status: 'success',
        message: 'The restaurant was found successfully.',
        //Enviamos el restaurante a consultar
        restaurant
    });

});


exports.createRestaurant = catchAsync(async (req, res) => {

    // OBTENER INFORMACION  DEL REQ BODY
    const { name, address, rating } = req.body;

    // CREAR UN NUEVO PRODUCTO
    const restaurant = await Restaurant.create({
        name: name.toLowerCase(),
        address: address.toLowerCase(),
        rating,
    });

    // RESPUESTA DEL SERVIDOR
    res.status(201).json({
        status: 'success',
        message: 'The restaurant was created. ',

        restaurant,

    });

});


exports.updateRestaurant = catchAsync(async (req, res) => {

    // DESTRUCTURING DE LA REQ
    const { restaurant } = req;

    // OBTENER INFORMACION A ACTUALIZAR DEL REQ BODY
    const { name, address } = req.body;

    // BUSCAR EL RESTAURANTE A ACTUALIZAR
    const updateRestaurant = await restaurant.update({
        name,
        address,
    });

    // SI NO EXISTE ENVIAMOS UN ERROR
    res.status(200).json({
        status: 'success',
        message: 'The restaurant has been update successfully',

        updateRestaurant,

    });

});


exports.deleteRestaurant = catchAsync(async (req, res) => {

    // DESTRUCTURING DE LA REQ
    const { restaurant } = req;

    // OBTENER INFORMACION A ACTUALIZAR DEL REQ BODY
    await restaurant.update({
        status: 'disabled'
    });
    // await product.destroy();

    // RESPUESTA DEL SERVIDOR
    res.status(200).json({
        status: 'success',
        message: 'The product has been disabled',
    });

});




exports.createReview = catchAsync(async (req, res) => {

    // OBTENER INFORMACION  DEL REQ BODY
    const { comment, rating } = req.body;
    const { sessionUser } = req;


    // CREAR UN NUEVA RESEÑA
    const review = await Review.create({
        userId: sessionUser.id,
        restaurantId: sessionUser.id,
        comment: comment.toLowerCase(),
        rating,
    });

    // RESPUESTA DEL SERVIDOR
    res.status(201).json({
        status: 'success',
        message: 'The review was created. ',

        review,

    });

});


exports.updateReview = catchAsync(async (req, res) => {

    // DESTRUCTURING DE LA REQ
    const { review } = req;

    // OBTENER INFORMACION A ACTUALIZAR DEL REQ BODY
    const { comment, rating } = req.body;

    // BUSCAR EL RESEÑA A ACTUALIZAR
    const updateReview = await review.update({
        comment,
        rating,
    });

    // SI NO EXISTE ENVIAMOS UN ERROR
    res.status(200).json({
        status: 'success',
        message: 'The review has been update successfully',

        updateReview,

    });

});


exports.deleteReview = catchAsync(async (req, res) => {

    // DESTRUCTURING DE LA REQ
    const { review } = req;

    // OBTENER INFORMACION A ACTUALIZAR DEL REQ BODY
    await review.update({
        status: 'deleted'
    });

    // RESPUESTA DEL SERVIDOR
    res.status(200).json({
        status: 'success',
        message: 'The review has been deleted',
    });

});
