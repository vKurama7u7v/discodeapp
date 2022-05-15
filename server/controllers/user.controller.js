// Importaciones
const User = require("../models/user.model");
const createToken = require("../utils/tokens.utils");
const createEmail = require("../utils/emails.utils");
const cloudinary = require("../utils/cloudinary.utils");

require("dotenv").config({ path: "./config/.env" });

const _ = require("lodash");
const { OAuth2Client } = require("google-auth-library");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// Error Personalizado
const { errorHandler } = require("../helpers/dbErrorHanding");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.MAIL_KEY);

// * ===== REGISTRO DE USUARIOS ===== *
exports.registerController = async (req, res) => {
  const newUser = req;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    console.log(firstError);
  } else {
    // Reseteando Email & Username
    newUser.email = newUser.email.toLowerCase();
    newUser.username = newUser.username.toLowerCase();

    const { email, username, password } = newUser;

    // Revisamos si el email esta en uso
    const foundEmail = await User.findOne({ email });
    // Si encuentra el email
    if (foundEmail) throw new Error("Este Email ya esta en uso!");

    // Revisamos si el Username esta en uso
    const foundUsername = await User.findOne({ username });
    // Si encuentra el Username
    if (foundUsername) throw new Error("Este Username ya esta en uso!");

    // Encriptando Password
    const salt = await bcryptjs.genSaltSync(10);
    newUser.password = await bcryptjs.hash(password, salt);

    // Creando token
    const token = createToken.activateAccountToken(
      newUser,
      process.env.JWT_ACCOUNT_ACTIVATION,
      "24h"
    );

    // Preparando estructura de Correo
    const emailData = createEmail.activateEmail(
      newUser,
      process.env.EMAIL_FROM,
      process.env.CLIENT_URL,
      token
    );

    // Enviando email
    sgMail
      .send(emailData)
      .then(() => {
        console.log(`Email enviado a ${newUser.email}`);
      })
      .catch((err) => {
        console.log(err);
      });

    try {
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }
  return null;
};

// * ===== ACTIVACION DE CUENTAS ===== *
exports.activationController = async (req, res) => {
  const { token } = req;

  if (!token)
    throw new Error("Error al Regístrar Usuario. Intentalo Nuevamente");

  try {
    const validToken = jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION);
    if (!validToken) throw new Error("Este token no es valido");
  } catch (error) {
    if (error) throw new Error("Ups, el token ha expirado");
  }

  const { first_name, last_name, username, email, password } =
    jwt.decode(token);

  const newUser = new User({
    first_name,
    last_name,
    username,
    email,
    password,
  });

  const foundUser = await User.findOne({ email: email.toLowerCase() });
  if (foundUser) throw new Error("Está cuenta ya ha sido activada");

  const response = await newUser.save(newUser);
  if (!response) throw new Error("Error al Regístrar Usuario");

  console.log("Usuario registrado");

  return null;
};

// * ===== INICIAR SESIÓN DE USUARIOS ===== *
exports.loginController = async (input) => {
  const { email, password } = input;

  // Revisamos si el usuario esta regisitrado
  const userFound = await User.findOne({ email: email.toLowerCase() });
  // Si no encuentra el usuario
  if (!userFound) throw new Error("Error en el email o contraseña!");
  console.log(userFound);

  // comparando contraseña con contraseña encriptada
  const passwordSuccess = await bcryptjs.compare(password, userFound.password);
  // Si la contraseña no es correcta
  if (!passwordSuccess) throw new Error("Error en el email o contraseña!");

  return {
    token: createToken.loginAccountToken(
      userFound,
      process.env.JWT_SECRET,
      "7d"
    ),
  };
};

// * ===== OLVIDE MI CONTRASEÑA ===== *
exports.forgotController = (req, res) => {
  const { email } = req;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    console.log(firstError);
  } else {
    // Buscar si el usuario existe
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err || !user)
        throw new Error("Ninguna cuenta con este Correo Electrónico existe!");

      // Si existe, genero un token que es valido solo por 15 minutos
      const token = createToken.forgotPasswordToken(
        user,
        process.env.JWT_RESET_PASSWORD,
        "15m"
      );

      // Preparando email
      const emailData = createEmail.forgotPasswordEmail(
        user,
        process.env.EMAIL_FROM,
        process.env.CLIENT_URL,
        token
      );

      return user.updateOne({ resetPasswordLink: token }, (err, success) => {
        // Si ocurre un error
        if (err) {
          console.log(errorHandler(err));
        } else {
          // Enviando email
          sgMail
            .send(emailData)
            .then(() => {
              console.log(`Email enviado a ${email}`);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    });
  }
};

// * ===== RESTABLECER CONTRASEÑA ===== *
exports.resetPasswordController = async (input) => {
  const { resetPasswordLink, password } = input;
  const newPassword = password;
  const errors = validationResult(input);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    console.log(firstError);
  } else {
    // Si token = undefined
    if (!resetPasswordLink) throw new Error("Ups! Algo salio mal");
    if (!newPassword) throw new Error("Contraseña Vacia");

    const foundToken = await User.findOne({ resetPasswordLink });
    if (!foundToken)
      throw new Error("Ups! Algo salio mal. Intentalo nuevamente");

    const {
      id,
      // password
    } = foundToken;
    // const passwordCompare = await bcryptjs.compare(newPassword, password);
    // if (passwordCompare)
    //   throw new Error("Las contraseña nueva y anterior son iguales");

    // Encriptando Contraseña
    const salt = await bcryptjs.genSaltSync(10);
    encryptedPass = await bcryptjs.hash(newPassword, salt);

    // Validando token => true/false
    const validToken = jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD
    );
    if (!validToken) throw new Error("Ups, este token ya ha expirado");

    // Payload campos actualizados
    const updateFields = {
      password: encryptedPass,
      resetPasswordLink: "",
      updatedAt: Date.now(),
    };

    try {
      // Realizando el Update
      await User.findByIdAndUpdate(id, updateFields);
      console.log("Contraseña restablecida con exito!");
    } catch (error) {
      console.log(error);
    }
  }
};

// * ===== AUTH CON GOOGLE ===== *
const client = new OAuth2Client(process.env.GOOGLE_CLIENT);
exports.googleController = async (input) => {
  const { token } = input;

  if (!token)
    throw new Error("Error al loguearse con Google. Intentalo nuevamente");

  const idToken = token;
  const googleVerify = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT,
  });

  if (!googleVerify) throw new Error("Error al verificar Token");

  const { email_verified, given_name, family_name, email, picture } =
    googleVerify.payload;

  if (!email_verified)
    throw new Error("El email de esta cuenta, no esta verificado.");

  // Verificar si el usuario ya esta registrado con el email
  const foundEmail = await User.findOne({ email: email.toLowerCase() });
  let genToken;
  // Lo esta....
  if (foundEmail) {
    console.log("Iniciando sesion con Google...");
    genToken = foundEmail;

    // No lo esta....
  } else {
    console.log("Regístrando con Google...");
    // Encriptando Password
    const salt = await bcryptjs.genSaltSync(10);
    const password = await bcryptjs.hash(email, salt);

    const first_name = given_name.toString();
    const last_name = family_name.toString();

    let username;
    // Obtener la parte del usuario del email
    // aurelio.marin@iest.edu.mx => aurelio.marin
    const lastIndex = email.toString().lastIndexOf("@");
    const genUsername = email.slice(0, lastIndex);

    // Comprobar existencia de username en BD
    const foundUsername = await User.findOne({ username: genUsername });

    // Si existe..
    if (foundUsername) {
      // si el username contiene numeros, removerlos y asignarle un numero random
      // aurelios.mb12 => aurelios.mb(numero_random del 0 al 999)
      username =
        genUsername.replace(/\d.*\d/, "") +
        Math.floor(Math.random() * (999 - 0 + 1) + 0);

      // Si no existe....
    } else {
      username = genUsername;
    }

    // Pendiente..... validar más

    const newUser = new User({
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      password: password,
      avatar: picture,
    });

    const response = await newUser.save(newUser);
    if (!response)
      throw new Error(
        "Error al Regístrar Usuario con Google. Intentalo nuevamente"
      );

    genToken = response;
  }

  return {
    token: createToken.loginAccountToken(
      genToken,
      process.env.JWT_SECRET,
      "7d"
    ),
  };
};

// * ===== OBTENIENDO DATOS DEL USUARIO ===== *
exports.getUser = async (id, username) => {
  let user = null;

  // Buscar el usuario ya sea por id o por username
  if (id) user = await User.findById(id);
  if (username) user = await User.findOne({ username });

  // En caso de que no se encuentre
  if (!user) throw new Error("El Usuario no existe");

  return user;
};

// * ===== ELIMINAR AVATAR ===== *
exports.deletePFPController = async (input, ctx) => {
  const { id } = ctx.user;
  const folder = "avatar";

  if (!id) throw new Error("Error al Eliminar Avatar");

  // Eliminando Avatar de Cloudinary
  const { status } = await cloudinary.destroyAvatar(id, folder);
  // if (!status) throw new Error("Error 404 Cloudinary");

  try {
    // Buscando usuario por ID y Actualizarlo
    await User.findByIdAndUpdate(id, { avatar: "" });
    return {
      id,
      status: true,
    };
  } catch (error) {
    console.log("Error al Eliminar Avatar");
    return {
      id,
      status: false,
    };
  }
};

// * ===== UPLOAD AVATAR ===== *
exports.uploadPFPController = async (file, ctx) => {
  const { id } = ctx.user;

  if (!file) throw new Error("Permiso Denegado");

  let user = null;
  // Buscar el usuario por ID
  if (id) user = await User.findById(id);

  // En caso de que no se encuentre
  if (!user) throw new Error("El usuario no se encontro");

  return {
    id: id,
    urlAvatar: user.avatar,
    status: true,
  };
};

// * ===== UPDATE AVATAR ===== *
exports.changePFPController = async (input, ctx) => {
  const { id } = ctx.user;
  const { status, avatar } = input;

  if (!status) throw new Error("Error al Actualizar Avatar");

  try {
    await User.findByIdAndUpdate(id, { avatar: avatar });
    return {
      id: id,
      urlAvatar: avatar,
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      id: null,
      urlAvatar: null,
      status: false,
    };
  }
};

// * ===== UPDATE INFO USER ===== *
exports.updateUserInfoController = async (input, ctx) => {
  const { id } = ctx.user;

  let user = null;

  // Buscando al Usuario por ID en la BD
  if (id) user = await User.findById(id);
  if (!user) throw new Error("Error al Actualizar Información");

  // Destructurando de usuario encontrado
  const {
    first_name: nombre,
    last_name: apellido,
    description: descripcion,
  } = user;

  let desc;
  // La descripción existe en BD
  if (!descripcion) {
    desc = "";
  } else {
    desc = descripcion;
  }

  const compareInfo = {
    first_name: nombre,
    last_name: apellido,
    description: desc,
  };

  // Destructurando valores de entrada
  const { first_name, last_name, description } = input;

  // Comprobando si exiten cambios de la info anterior a la actual
  if (JSON.stringify(input) === JSON.stringify(compareInfo))
    throw new Error("No se detectaron cambios a Actualizar");

  try {
    // Actualizando Info
    const result = await User.findByIdAndUpdate(id, {
      first_name,
      last_name,
      description,
    });
    console.log(result);

    return {
      first_name: first_name,
      last_name: last_name,
      description: description,
    };
  } catch (error) {
    return {
      first_name: null,
      last_name: null,
      description: null,
    };
  }
};

// * ===== UPDATE WEBSITES USER ===== *
exports.updateUserWebController = async (input, ctx) => {
  const { id } = ctx.user;

  let user = null;

  // Buscando al Usuario por ID en la BD
  if (id) user = await User.findById(id);
  if (!user) throw new Error("Error al Actualizar Información");

  // Destructurando de usuario encontrado
  const {
    siteWeb: website,
    linkedinWeb: linkedin,
    githubWeb: github,
    dribbbleWeb: dribble,
  } = user;

  const compareInfo = {
    siteWeb: website,
    linkedinWeb: linkedin,
    githubWeb: github,
    dribbbleWeb: dribble,
  };

  // Destructurando valores de entrada
  const { siteWeb, linkedinWeb, githubWeb, dribbbleWeb } = input;

  // Comprobando si exiten cambios de la info anterior a la actual
  if (JSON.stringify(input) === JSON.stringify(compareInfo))
    throw new Error("No se detectaron cambios a Actualizar");

  try {
    const result = await User.findByIdAndUpdate(id, {
      siteWeb,
      linkedinWeb,
      githubWeb,
      dribbbleWeb,
    });
    console.log(result);

    return {
      siteWeb: siteWeb,
      linkedinWeb: linkedinWeb,
      githubWeb: githubWeb,
      dribbbleWeb: dribbbleWeb,
    };
  } catch (error) {
    return {
      siteWeb: null,
      linkedinWeb: null,
      githubWeb: null,
      dribbbleWeb: null,
    };
  }
};

// * ===== ACTUALIZAR PASSWORD ===== *
exports.changePasswordController = async (input, ctx) => {
  const { id } = ctx.user;

  let user = null;
  // Buscando User en BD
  if (id) user = await User.findById(id);
  if (!user) throw new Error("Error al Actualizar Contraseña de Usuario");

  // Validando Pass
  const { password } = input;
  if (!password) throw new Error("Contraseña Vacia");

  // Encriptando Pass
  const salt = await bcryptjs.genSaltSync(10);
  encryptedPass = await bcryptjs.hash(password, salt);

  try {
    // Actualizando Pass
    await User.findByIdAndUpdate(id, { password: encryptedPass });
    return {
      id: id,
      status: true,
    };
  } catch (error) {
    return {
      id: null,
      status: false,
    };
  }
};

// * ===== BUSCAR USUARIO===== *
exports.searchUserController = async (search) => {
  const users = await User.find({
    username: { $regex: search, $options: "i" },
  });

  return users;
};
