const axios = require("axios");

/* ==== OBTENER LENGUAJES DE PROGRAMACIÓN ====*/
exports.getLanguagesAPI = async (url, path) => {
  try {
    const { data, status } = await axios.get(`${url}/${path}`);
    return { data, response: status };
  } catch (error) {
    console.log(error);
    return { data: null, response: false };
  }
};

/* ==== OBTENER CURSOS ====*/
exports.getCoursesAPI = async (url, path) => {
  try {
    const { data, status } = await axios.get(`${url}/${path}`);
    return { data, response: status };
  } catch (error) {
    console.log(error);
    return { data: null, response: false };
  }
};

/* ==== OBTENER DATOS CURSO ====*/
exports.getDataCourseAPI = async (url, path) => {
  try {
    const { data, status } = await axios.get(`${url}/${path}`);
    return { data, response: status };
  } catch (error) {
    console.log(error);
    return { data: null, response: false };
  }
};
