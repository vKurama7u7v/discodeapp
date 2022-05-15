const Follow = require("../models/follow.model");
const { where } = require("../models/user.model");
const User = require("../models/user.model");

// * ===== SEGUIR A USUARIO ===== *
exports.followUserController = async (username, ctx) => {
  const userFound = await User.findOne({ username });
  if (!userFound) throw new Error("Usuario no encontrado");

  const followFound = await Follow.findOne({
    idUser: ctx.user.id,
    follow: userFound._id,
  });

  if (followFound) throw new Error("Ya sigues a este usuario");

  try {
    const follow = new Follow({
      idUser: ctx.user.id,
      follow: userFound._id,
    });

    await follow.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// * ===== COMPROBAR SI ESTOY SIGUIENDO A UN USUARIO ===== *
exports.isFollowController = async (username, ctx) => {
  const userFound = await User.findOne({ username });
  if (!userFound) throw new Error("Usuario no encontrado");

  const follow = await Follow.find({ idUser: ctx.user.id })
    .where("follow") // Propiedad Follow
    .equals(userFound._id); // Este siguiendo a otro user (id)

  if (follow.length > 0) {
    return true;
  }
  return false;
};

// * ===== DEJAR DE SEGUIR A USUARIO ===== *
exports.unfollowUserController = async (username, ctx) => {
  const userFound = await User.findOne({ username });
  if (!userFound) throw new Error("Usuario no encontrado");

  const follow = await Follow.deleteMany({ idUser: ctx.user.id })
    .where("follow")
    .equals(userFound._id);

  if (follow.deletedCount > 0) {
    return true;
  }
  return false;
};

// * ===== OBTENER LISTA SEGUIDORES ===== *
exports.getFollowersController = async (username, ctx) => {
  const user = await User.findOne({ username });
  const followers = await Follow.find({ follow: user._id }).populate("idUser");

  const followersList = [];
  for await (const data of followers) {
    followersList.push(data.idUser);
  }
  return followersList;
};

// * ===== OBTENER LISTA SEGUIDOS ===== *
exports.getFollowsController = async (username, ctx) => {
  const user = await User.findOne({ username });
  const follows = await Follow.find({ idUser: user._id }).populate("follow");

  const followsList = [];
  for await (const data of follows) {
    followsList.push(data.follow);
  }

  return followsList;
};
