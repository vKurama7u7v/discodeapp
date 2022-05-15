import Axios from "axios";
import process from "../../config/env.json";

/* ====== UPLOAD AVATAR ====== */
export const uploadPFP = async (id, file) => {
  const fileData = new FormData();
  fileData.append("file", file);
  fileData.append("upload_preset", process.UPLOAD_AVATAR);
  fileData.append("public_id", id);

  const result = await Axios.post(
    `${process.CLOUDINARY_URL}${process.CLOUDINARY_NAME}/image/upload`,
    fileData
  );
  return result;
};

/* ====== UPLOAD PUBLICATION ====== */
export const uploadPublication = async (id, file) => {
  const fileData = new FormData();
  fileData.append("file", file);
  fileData.append("upload_preset", process.PUBLICATION_PRESET);
  fileData.append("public_id", id);

  const result = await Axios.post(
    `${process.CLOUDINARY_URL}${process.CLOUDINARY_NAME}/image/upload`,
    fileData
  );

  return result;
};
