// Importaciones
const jwt = require("jsonwebtoken");

// * ===== CREAR TOKEN PARA ACTIVAR CUENTAS ===== *
exports.activateAccountToken = (user, SECRET_KEY, expiresIn) => {
  const { first_name, last_name, username, email, password } = user;
  const payload = {
    first_name,
    last_name,
    username,
    email,
    password,
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

// * ===== CREAR TOKEN PARA INICIAR SESIÓN ===== *
exports.loginAccountToken = (user, SECRET_KEY, expiresIn) => {
  const { id, first_name, last_name, username, email, role, avatar } = user;
  const payload = {
    id,
    first_name,
    last_name,
    username,
    email,
    role,
    avatar,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

// * ===== CREAR TOKEN PARA INICIAR SESIÓN CON GOOGLE ===== *
exports.signInWithGoogleToken = (user, SECRET_KEY, expiresIn) => {
  const { _id } = user;
  const payload = {
    _id,
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

// * ===== CREAR TOKEN PARA RECUPERAR PASS ===== *
exports.forgotPasswordToken = (user, SECRET_KEY, expiresIn) => {
  const { _id } = user;
  const payload = {
    _id,
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};
