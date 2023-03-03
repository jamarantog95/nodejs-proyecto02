const User = require("../models/user.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync,js");
const bcrypt = require('bcryptjs');

exports.loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // REVISAR SI EL USUARIO EXISTE && LA CONTRASEÑA ES CORRECTA
    const user = await User.findOne({
        where: {
            email: email.toLowerCase(),
            status: true,
        }
    });

    //Valida si el usuario esta activo
    if (!user) {
        return next(new AppError('The user could not be found', 404));
    }

    if (!(await bcrypt.compare(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    // SI TODO ESTA OK, ENVIAR UN TOKEN AL CLIENTE
    const token = await generateJWT(user.id);

    res.status(200).json({
        status: 'success',
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    })
});


exports.signupUser = catchAsync(async (req, res) => {

    // OBTENER INFORMACION  DEL REQ BODY
    const { name, email, password, role = 'normal' } = req.body;

    // CREAR UNA INSTANCIA DE LA CLASE USER
    const user = new User({ name, email, password, role });

    // ENCRIPTAR LA CONTRASEÑA
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // GUARDAR EN LA BD CON LAS CONTRASEÑAS ENCRIPTADAS
    await user.save();

    // GENERAR EL JWT
    const token = await generateJWT(user.id);

    // RESPUESTA DEL SERVIDOR
    res.status(201).json({
        status: 'success',
        message: 'User created succesfully',

        token,
        user: {
            id: user.id,
            name: user.name,
            role: user.role,
        }
    });

});
