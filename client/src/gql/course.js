import { gql } from "@apollo/client";

export const GET_CURSOS = gql`
  query GetCursos($status: Boolean!) {
    getCursos(status: $status) {
      id
      name
      thumbnail
      description
      status
      createdAt
      category
      subcategories {
        subcategory_name
      }
      temario {
        id
        name
        curso
        curso_name
        createdAt
        lecciones {
          id
          name
          tema
          tema_name
          createdAt
          slides {
            id
            name
            leccion
            leccion_name
            clase
            clase_name
            type_slide
            content
            url
            code
            createdAt
          }
        }
      }
    }
  }
`;

export const GET_CURSO = gql`
  query GetCurso($status: Boolean!, $getCursoId: ID!) {
    getCurso(status: $status, id: $getCursoId) {
      id
      name
      thumbnail
      description
      status
      createdAt
      category
      subcategories {
        subcategory_name
      }
      temario {
        id
        name
        curso
        curso_name
        createdAt
        lecciones {
          id
          name
          tema
          tema_name
          createdAt
          slides {
            id
            name
            leccion
            leccion_name
            clase
            clase_name
            type_slide
            content
            url
            code
            createdAt
          }
        }
      }
    }
  }
`;

export const GET_LECCION = gql`
  query GetLeccion($status: Boolean!, $getLeccionId: ID!) {
    getLeccion(status: $status, id: $getLeccionId) {
      id
      name
      tema
      tema_name
      createdAt
      slides {
        id
        name
        leccion
        leccion_name
        clase
        clase_name
        type_slide
        content
        url
        code
        createdAt
      }
      compiler {
        id
        name
        leccion
        leccion_name
        language
        language_name
        code
        createdAt
      }
    }
  }
`;
