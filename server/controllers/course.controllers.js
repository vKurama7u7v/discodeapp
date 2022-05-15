const api = require("../utils/rest-api.utils");
require("dotenv").config({ path: "./config/.env" });

// * ===== OBTENER LISTA CURSOS ===== *
exports.getCursos = async (status) => {
  if (!status) throw new Error("Cursos: Petición Denegada!");

  const { data: dataCursos, response: resCursos } = await api.getCoursesAPI(
    process.env.DJANGO_REST_API,
    "course"
  );

  const { data: dataTemas, response: resTemas } = await api.getCoursesAPI(
    process.env.DJANGO_REST_API,
    "tema"
  );

  const { data: dataLecciones, response: resLecciones } =
    await api.getCoursesAPI(process.env.DJANGO_REST_API, "leccion");

  const { data: dataSlides, response: resSlides } = await api.getCoursesAPI(
    process.env.DJANGO_REST_API,
    "slide"
  );

  // => Validar peticiones

  const courseList = [];

  for await (const curso of dataCursos) {
    if (curso.status) {
      // Filtrando Subcategorias
      const subcategoryList = [];
      for await (const subcategory of curso.subcategorias) {
        subcategoryList.push({
          subcategory_name: subcategory,
        });
      }

      // Filtrando Temas
      const temaList = [];
      for await (const tema of dataTemas) {
        if (curso.id === tema.curso) {
          // Filtrando Lecciones
          const leccionList = [];
          for await (const leccion of dataLecciones) {
            if (tema.id === leccion.tema) {
              // Filtrando Slides
              const slideList = [];
              for await (const slide of dataSlides) {
                if (leccion.id === slide.leccion) {
                  slideList.push({
                    id: slide.id,
                    name: slide.name,
                    leccion: slide.leccion,
                    leccion_name: slide.leccion_name,
                    clase: slide.clase,
                    clase_name: slide.clase_name,
                    type_slide: slide.clase_identifier,
                    content: slide.content,
                    url: slide.url,
                    code: slide.code,
                    createdAt: slide.createdAt,
                  });
                }
              }
              leccionList.push({
                id: leccion.id,
                name: leccion.name,
                tema: leccion.tema,
                tema_name: leccion.tema_name,
                createdAt: leccion.createdAt,
                slides: slideList,
              });
            }
          }

          temaList.push({
            id: tema.id,
            name: tema.name,
            curso: tema.curso,
            curso_name: tema.curso_name,
            createdAt: tema.createdAt,
            lecciones: leccionList,
          });
        }
      }

      courseList.push({
        id: curso.id,
        name: curso.name,
        thumbnail: curso.thumbnail,
        description: curso.description,
        category: curso.category,
        subcategories: subcategoryList,
        status: curso.status,
        createdAt: curso.createdAt,
        temario: temaList,
      });
    }
  }

  return courseList;
};

// * ===== OBTENER DATA CURSO ===== *
exports.getCurso = async (status, idCurso) => {
  if (!status) throw new Error("Curso: Petición Denegada!");

  const { data: dataCurso, response: resCurso } = await api.getDataCourseAPI(
    process.env.DJANGO_REST_API,
    `course/${idCurso}`
  );

  const { data: dataTema, response: resTema } = await api.getDataCourseAPI(
    process.env.DJANGO_REST_API,
    "tema"
  );

  const { data: dataLeccion, response: resLeccion } =
    await api.getDataCourseAPI(process.env.DJANGO_REST_API, "leccion");

  const { data: dataSlide, response: resSlide } = await api.getDataCourseAPI(
    process.env.DJANGO_REST_API,
    "slide"
  );

  // => Validar Peticiones

  if (dataCurso.status) {
    // Filtrando Subcategorias
    const subcategoryList = [];
    for await (const subcategory of dataCurso.subcategorias) {
      subcategoryList.push({
        subcategory_name: subcategory,
      });
    }

    // Filtrando Temas
    const temaList = [];
    for await (const tema of dataTema) {
      if (dataCurso.id === tema.curso) {
        // Filtrando Lecciones
        const leccionList = [];
        for await (const leccion of dataLeccion) {
          if (tema.id === leccion.tema) {
            // Filtrando Slides
            const slideList = [];
            for await (const slide of dataSlide) {
              if (leccion.id === slide.leccion) {
                slideList.push({
                  id: slide.id,
                  name: slide.name,
                  leccion: slide.leccion,
                  leccion_name: slide.leccion_name,
                  clase: slide.clase,
                  clase_name: slide.clase_name,
                  type_slide: slide.clase_identifier,
                  content: slide.content,
                  url: slide.url,
                  code: slide.code,
                  createdAt: slide.createdAt,
                });
              }
            }

            leccionList.push({
              id: leccion.id,
              name: leccion.name,
              tema: leccion.tema,
              tema_name: leccion.tema_name,
              createdAt: leccion.createdAt,
              slides: slideList,
            });
          }
        }

        temaList.push({
          id: tema.id,
          name: tema.name,
          curso: tema.curso,
          curso_name: tema.curso_name,
          createdAt: tema.createdAt,
          lecciones: leccionList,
        });
      }
    }

    const curso = {
      id: dataCurso.id,
      name: dataCurso.name,
      thumbnail: dataCurso.thumbnail,
      description: dataCurso.description,
      category: dataCurso.category,
      subcategories: subcategoryList,
      status: dataCurso.status,
      createdAt: dataCurso.createdAt,
      temario: temaList,
    };

    return curso;
  }

  return null;
};

// * ===== OBTENER DATA LECCIÓN ===== *
exports.getLeccion = async (status, idLeccion) => {
  if (!status) throw new Error("Curso: Petición Denegada!");

  const { data: dataLection, response: resLection } =
    await api.getDataCourseAPI(
      process.env.DJANGO_REST_API,
      `leccion/${idLeccion}`
    );

  const { data: dataSlide, response: resSlide } = await api.getDataCourseAPI(
    process.env.DJANGO_REST_API,
    "slide"
  );

  const { data: dataCompiler, response: resCompiler } =
    await api.getDataCourseAPI(process.env.DJANGO_REST_API, "codigo");

  // Filtrando Slides
  const slideList = [];
  for await (const slide of dataSlide) {
    if (dataLection.id === slide.leccion) {
      slideList.push({
        id: slide.id,
        name: slide.name,
        leccion: slide.leccion,
        leccion_name: slide.leccion_name,
        clase: slide.clase,
        clase_name: slide.clase_name,
        type_slide: slide.clase_identifier,
        content: slide.content,
        url: slide.url,
        code: slide.code,
        createdAt: slide.createdAt,
      });
    }
  }

  let codigo = null;
  for await (const code of dataCompiler) {
    if (dataLection.id === code.leccion) {
      codigo = code;
    }
  }

  const leccion = {
    id: dataLection.id,
    name: dataLection.name,
    tema: dataLection.tema,
    tema_name: dataLection.tema_name,
    createdAt: dataLection.createdAt,
    slides: slideList,
    compiler: codigo,
  };

  return leccion;
};
