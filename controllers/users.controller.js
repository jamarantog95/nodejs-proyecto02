const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync.js");



// ACTUALIZAR LOS DATOS DE UN USUARIO DADO UN ID, SOLO PUEDE ACTUALIZAR SU NAME Y EMAIL
exports.updateUser = catchAsync(async (req, res) => {

    // OBTENEMOS ID DE LA REQ PARAMS
    const { user } = req;

    // OBTENER INFORMACION DEL REQ BODY
    const { name, email } = req.body;

    // ACTUALIZAMOS EL USUARIO ENCONTRADO
    const updateUser = await user.update({
        name,
        email,
    });

    // RESPUESTA DEL SERVIDOR
    res.status(200).json({
        status: 'success',
        message: 'The user has been update successfully',

        updateUser,

    });

})


// DESHABILITAR LA CUENTA DE UN USUARIO
exports.deleteUser = catchAsync(async (req, res) => {

    // OBTENEMOS ID DE LA REQ PARAMS
    const { user } = req;

    // ACTUALIZAMOS EL USUARIO ENCONTRADO
    await user.update({
        status: false
    });

    // RESPUESTA DEL SERVIDOR
    res.status(200).json({
        status: 'success',
        message: 'The user has been disabled',
    });
})


