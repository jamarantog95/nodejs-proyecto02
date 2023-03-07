// importa express validator
const { check } = require("express-validator");
const { Router } = require("express");

const { findAllMeals, findMeal, createMeal, deleteMeal, updateMeal } = require("../controllers/meals.controller");
const { validMealById } = require("../middlewares/meal.middlewares");
const { validateFields } = require("../middlewares/validatefield.middlewares");
const { protect, restrictTo } = require("../middlewares/auth.middlewares");

const router = Router();

// Esta ruta me va a encontrar todos los comidas, esta ruta viene
// del archivo servidor que tiene un path meal y este ruta se dirige hacia
// el controlador de comidas que se llama findAllMeals
router.get('/', findAllMeals);

// Esta ruta me va a encontrar una comida dado un id, este id se lo especifico
// por el path es decir por los parametros de la url, esta ruta viene
// del archivo servidor que tiene un path product y este ruta se dirige hacia
// el controlador de comidas que se llama findProduct
router.get('/:id', validMealById, findMeal);


router.use(protect);
// Esta ruta me va a crear una comida ,esta ruta viene
// del archivo servidor que tiene un path meal y este ruta se dirige hacia
// el controlador de comidas que se llama createMeal
router.post('/:restaurantId', [
    // isEmpty: Valida que no este vacio
    check('name', 'The name is required').not().isEmpty(),
    check('price', 'The price is required').not().isEmpty(),
    check('price', 'The price must be a number').isInt(),

    validateFields,
    restrictTo('admin'),
], createMeal);


// Esta ruta me va a actualizar una comida dado un id, este id se lo especifico
// por el path es decir por los parametros de la url, esta ruta viene
// del archivo servidor que tiene un path meal y este ruta se dirige hacia
// el controlador de comidas que se llama updateMeal
router.patch('/:id', [
    // isEmpty: Valida que no este vacio
    check('name', 'The name is required').not().isEmpty(),
    check('price', 'The price is required').not().isEmpty(),

    validateFields,
    validMealById,
    // restrictTo('admin'),
], updateMeal);


// Esta ruta me va a deshabilitar una comida dado un id, este id se lo especifico
// por el path es decir por los parametros de la url, esta ruta viene
// del archivo servidor que tiene un path meal y este ruta se dirige hacia
// el controlador de comidas que se llama deleteMeal
router.delete('/:id', validMealById, deleteMeal);


module.exports = {
    mealRouter: router,
}