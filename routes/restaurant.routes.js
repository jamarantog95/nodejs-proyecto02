
const { Router } = require("express");
const { check } = require("express-validator");
const { findAllRestaurants, findRestaurant, updateRestaurant, createRestaurant, deleteReview, updateReview, createReview, deleteRestaurant } = require("../controllers/restaurant.controller");
const { protect } = require("../middlewares/auth.middlewares");
const { validRestaurantById } = require("../middlewares/restaurant.middlewares");
const { validReviewById } = require("../middlewares/review.middlewares");
const { validateFields } = require("../middlewares/validatefield.middlewares");

const router = Router();


router.use(protect);


router.get('/', findAllRestaurants);


router.get('/:id', validRestaurantById, findRestaurant);


router.post('/', [
    // isEmpty: Valida que no este vacio
    check('name', 'The name is required').not().isEmpty(),
    check('address', 'The address is required').not().isEmpty(),
    check('rating', 'The rating is required').not().isEmpty(),
    check('rating', 'The rating must be range a 1 or 5').isInt({ min: 1, max: 5 }),

    validateFields,
    // restrictTo('admin'),
], createRestaurant);


router.patch('/:id', [
    // isEmpty: Valida que no este vacio
    check('name', 'The name is required').not().isEmpty(),
    check('address', 'The address is required').not().isEmpty(),

    validateFields,
    validRestaurantById,
    // restrictTo('admin'),
    //protectAccountOwner
], updateRestaurant);


router.delete('/:id', validRestaurantById, deleteRestaurant);



router.post('/reviews/:id', [
    // isEmpty: Valida que no este vacio
    check('comment', 'The comment is required').not().isEmpty(),
    check('rating', 'The rating is required').not().isEmpty(),

    validateFields,
    // restrictTo('admin'),
], createReview);


router.patch('/reviews/restaurantId/:id', [
    // isEmpty: Valida que no este vacio
    check('comment', 'The comment is required').not().isEmpty(),
    check('rating', 'The rating is required').not().isEmpty(),

    validateFields,
    validReviewById
    // restrictTo('admin'),
    //protectAccountOwner
], updateReview);


router.delete('/reviews/restaurantId/:id', validReviewById, deleteReview);


module.exports = {
    restaurantRouter: router,
}
