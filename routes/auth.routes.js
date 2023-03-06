
const { Router } = require("express");
const { check } = require("express-validator");
const { loginUser, signupUser } = require("../controllers/auth.controller");
const { validIfExistUserEmail } = require("../middlewares/user.middlewares");
const { validateFields } = require("../middlewares/validatefield.middlewares");

const router = Router();



router.post('/signup', [
    // isEmpty: Valida que no este vacio
    check('name', 'The username must be mandatory').not().isEmpty(),
    check('email', 'The email must be mandatory').not().isEmpty(),
    // isEmail: Valida que este en formato de correo electronico
    check('email', 'The email must be a correct format').isEmail(),
    check('password', 'The password must be mandatory').not().isEmpty(),

    validateFields,
    validIfExistUserEmail,
], signupUser);


router.post('/login', [
    // isEmpty: Valida que no este vacio
    check('email', 'The email must be mandatory').not().isEmpty(),
    // isEmail: Valida que este en formato de correo electronico
    check('email', 'The email must be a correct format').isEmail(),
    check('password', 'The password must be mandatory').not().isEmpty(),

    validateFields,
], loginUser)



module.exports = {
    authRouter: router,
}
