const CodeSandbox = require("../models/sandbox.model");
const api = require("../utils/rest-api.utils");
require("dotenv").config({ path: "./config/.env" });

function CastCategory(category) {
  if (category === 1) {
    return "programacion";
  } else if (category === 2) {
    return "web";
  } else if (category === 3) {
    return "database";
  }
}

// * ===== OBTENER LISTA DE LENGUAJES ===== *
exports.getProgrammingLanguages = async (status) => {
  if (!status) throw new Error("Lenguajes: Petición Denegada!");

  const { data, response } = await api.getLanguagesAPI(
    process.env.DJANGO_REST_API,
    "language"
  );

  const languageList = [];
  for await (const item of data) {
    languageList.push({
      id: item.id,
      name: item.name,
      language: item.language,
      category: item.category,
      icon: item.icon,
      createdAt: item.createdAt,
    });
  }

  return languageList;
};

// * ===== NUEVA SANDBOX ===== *
exports.newSandboxController = async (input, ctx) => {
  const { id } = ctx.user;
  if (!id) throw new Error("Algo salio mal al crear una nueva Sandbox");

  const { name, language, icon, name_language } = input;
  try {
    // Creando objeto para guardar en Base de Datos
    const newSandbox = new CodeSandbox({
      idUser: id,
      name: name,
      language: language,
      // content: {
      //   language: language,
      //   files: [
      //     { name: "first.ext", content: "" },
      //     { name: "second.ext", content: "// code" },
      //   ],
      // },
      name_language: name_language,
      icon: icon,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Guardando en Base de datos
    await newSandbox.save();
    console.log(newSandbox);
    return newSandbox;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// * ===== OBTENER LISTA DE MIS CODESANDBOX ===== *
exports.getCodeSandboxes = async (status, ctx) => {
  if (!status) throw new Error("Petición Denegada!");

  const { id } = ctx.user;
  if (!id) throw new Error("Ups! Algo salio mal");

  const sandboxes = await CodeSandbox.find()
    .where({ idUser: id })
    .sort({ updatedAt: -1 });

  return sandboxes;
};

// * ===== OBTENER OBTENER CODESANDBOX ===== *
exports.getCodeSandbox = async (idSandbox) => {
  let sandbox = null;

  // Buscamos el CodeSandbox por ID
  if (idSandbox) sandbox = await CodeSandbox.findById(idSandbox);

  // Si no la encuatra
  if (!sandbox) throw new Error("La CodeSandbox no existe");

  return sandbox;
};

// * ===== GUARDAR CODESANDBOX ===== *
exports.saveSandboxController = async (id, files) => {
  if (!files) throw new Error("Error al Guardar tu CodeSandbox");

  try {
    if (id)
      await CodeSandbox.findByIdAndUpdate(id, {
        content: files,
        updatedAt: Date.now(),
      });

    return { id, status: true };
  } catch (error) {
    console.log(error);
    return null;
  }
};

// * ===== ELIMINAR CODESANDBOX ===== *
exports.deleteSandboxController = async (id, ctx) => {
  const { id: idUser } = ctx.user;
  if (!idUser) throw new Error("Error al eliminar Avatar");

  try {
    await CodeSandbox.findByIdAndDelete(id);
    return { id, status: true };
  } catch (error) {
    console.log(error);
    return { id: null, status: false };
  }
};
