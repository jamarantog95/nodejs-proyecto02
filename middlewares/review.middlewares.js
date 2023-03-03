const Review = require("../models/review.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync,js");


exports.validReviewById = catchAsync(async (req, res, next) => {
    // OBTENEMOS ID DE LA REQ PARAMS
    const { id } = req.params;

    // BUSCAR LA RESEÑA DE FORMA INDIVIDUAL
    const review = await Review.findOne({
        where: {
            // id:id,
            id,
            status: 'active',
        },
    });

    // SI NO EXISTE ENVIAMOS UN ERROR
    if (!review) {
        return next(new AppError('Review not found', 404));
    }

    req.review = review;
    next();

});

