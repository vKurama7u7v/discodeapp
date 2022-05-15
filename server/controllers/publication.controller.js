const Publication = require("../models/publication.model");
const User = require("../models/user.model");
const Follow = require("../models/follow.model");
const Comment = require("../models/comment.model");
const Like = require("../models/like.model");
const cloudinary = require("../utils/cloudinary.utils");

// * ===== AUTORIZACIÓN PARA PUBLICAR ===== *
exports.authorizePublishController = async (file, ctx) => {
  const { id } = ctx.user;

  if (!file) throw new Error("Permiso Denegado");

  return {
    id: id,
    status: true,
  };
};

// * ===== CREAR NUEVA PUBLICACIÓN ===== *
exports.newPublishController = async (input) => {
  console.log(input);
  const { status, idUser, idCloud, description, file, typeFile } = input;

  if (!status) throw new Error("Error al Crear Nueva Publicación");

  try {
    const newPublish = new Publication({
      idUser: idUser,
      idCloud: idCloud,
      description: description,
      file: file,
      typeFile: typeFile,
      createAt: Date.now(),
    });

    await newPublish.save();
    return {
      id: idCloud,
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      id: null,
      status: false,
    };
  }
};

// * ===== OBTENER PUBLICACIONES ===== *
exports.getPublications = async (username) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error("Usuario no encontrado");

  const publications = await Publication.find()
    .where({ idUser: user._id })
    .sort({ createAt: -1 }); // Orden descendente

  return publications;
};

// * ===== OBTENER PUBLICACION POR ID ===== *
exports.getPostInfo = async (id) => {
  let publication = null;
  //Buscar la publicacion por id de Publicación
  if (id) publication = await Publication.findById(id);

  // Si no se encuentra
  if (!publication) throw new Error("La publicacion no existe");

  return publication;
};

// * ===== OBTENER PUBLICACIONES DE FOLLOWS ===== *
exports.getPublicationsFollows = async (ctx) => {
  const { id } = ctx.user;
  if (!id) throw new Error("Ups! Algo Salio Mal");

  // Obteniendo Lista de Personas que Sigo
  const followeds = await Follow.find({ idUser: id }).populate("follow");

  //
  const followedsList = [];
  for await (const data of followeds) {
    followedsList.push(data.follow);
  }

  const publicationsList = [];
  for await (const data of followedsList) {
    const publications = await Publication.find()
      .where({
        idUser: data._id,
      })
      .sort({ createAt: -1 })
      .populate("idUser");
    // .limit(10);

    for await (const publication of publications) {
      const comments = await Comment.find({ idPublication: publication._id });
      const likes = await Like.find({ idPublication: publication._id });

      publicationsList.push({
        publication: publication,
        comments: comments.length,
        likes: likes.length,
      });
    }
  }

  const result = publicationsList.sort((a, b) => {
    return new Date(b.publication.createAt) - new Date(a.publication.createAt);
  });

  return result;
};
