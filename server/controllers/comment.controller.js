const Comment = require("../models/comment.model");

// * ===== AÑADIR COMENTARIO ===== *
exports.addCommentController = async (input, ctx) => {
  // Comprobando contexto
  try {
    const comment = new Comment({
      idPublication: input.idPublication,
      idUser: ctx.user.id,
      comment: input.comment,
      createdAt: Date.now(),
    });

    console.log(comment);
    await comment.save();
    return comment;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// * ===== OBTENER COMENTARIOS ===== *
exports.getComments = async (idPublication) => {
  const result = await Comment.find({ idPublication })
    .populate("idUser")
    .sort({ createdAt: -1 });
  return result;
};
