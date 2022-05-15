const cloudinary = require("../config/cloudinary.config");

/* ==== ELIMINAR AVATAR DE CLOUDINARY ====*/
exports.destroyAvatar = async (id, folder) => {
  try {
    const result = await cloudinary.uploader.destroy(`${folder}/${id}`);
    if (result.result !== "not found") {
      return { result, status: true };
    } else {
      return { result, status: false };
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error al Eliminar Avatar");
  }
};
