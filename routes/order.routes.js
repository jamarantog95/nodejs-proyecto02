
const { Router } = require("express");
const { check } = require("express-validator");
const { createOrder, updateOrder, deleteOrder } = require("../controllers/order.controller");
const { protect } = require("../middlewares/auth.middlewares");
const { validOrderById } = require("../middlewares/order.middlewares");
const { validateFields } = require("../middlewares/validatefield.middlewares");


const router = Router();

router.use(protect);

router.post('/', [
    // isEmpty: Valida que no este vacio
    check('mealId', 'The mealId is required').not().isEmpty(),
    check('quantity', 'The quantity is required').not().isEmpty(),
    check('quantity', 'The price must be a number').isInt(),

    validateFields,
    // restrictTo('admin'),
], createOrder);


router.patch('/:id', [
    validOrderById,
    // restrictTo('admin'),
    //protectAccountOwner
], updateOrder);


router.delete('/:id', validOrderById, deleteOrder);



module.exports = {
    orderRouter: router,
}
