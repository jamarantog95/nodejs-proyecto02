
const { Router } = require("express");
const { check } = require("express-validator");
const { updateUser, deleteUser } = require("../controllers/users.controller");
const { validIfExistUser } = require("../middlewares/user.middlewares");
const { validateFields } = require("../middlewares/validatefield.middlewares");

const router = Router();


router.patch('/:id', [
    // isEmpty: Valida que no este vacio
    check('name', 'The name must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    // isEmail: Valida que este en formato de correo electronico
    check('email', 'The email must be a correct format').isEmail(),

    validateFields,
    validIfExistUser,
], updateUser);


router.delete('/:id', validIfExistUser, deleteUser);


module.exports = {
    userRouter: router,
}
