const Like = require("../models/like.model");

// * ===== AGREGAR LIKE ===== *
exports.addLikeController = async (idPublication, ctx) => {
  const { id } = ctx.user;
  // Comprobando el contexto
  if (!id) throw new Error("Ups! Algo salio mal.");

  const likeFound = await Like.findOne({
    idPublication,
    idUser: id,
  });

  if (likeFound) return false;

  try {
    const like = new Like({
      idPublication,
      idUser: id,
    });

    await like.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// * ===== ELIMINAR LIKE ===== *
exports.removeLikeController = async (idPublication, ctx) => {
  const { id } = ctx.user;
  // Comprobando el contexto
  if (!id) throw new Error("Ups! Algo salio mal");

  try {
    await Like.findOneAndDelete({ idPublication }).where({ idUser: id });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// * ===== COMPROBAR LIKE ===== *
exports.isLike = async (idPublication, ctx) => {
  const { id } = ctx.user;
  if (!id) throw new Error("Ups! Algo salio mal");

  try {
    const result = await Like.findOne({ idPublication }).where({
      idUser: id,
    });
    if (!result) return false;

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// * ===== CONTAR LIKES ===== *
exports.getLikes = async (idPublication) => {
  try {
    const result = await Like.countDocuments({ idPublication });
    return result;
  } catch (error) {
    console.log(error);
  }
};
