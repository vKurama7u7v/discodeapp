// Importaciones
const { gql } = require("apollo-server-express");

// Definiciones (Querys, etc)
// Que datos va a mandar el servidor
// Clave - Valor
const typeDefs = gql`
  scalar Upload

  # *===== TYPES =====*
  type User {
    id: ID
    # Auth
    username: String
    first_name: String
    last_name: String
    email: String
    password: String
    resetPasswordLink: String
    # Info
    role: String
    avatar: String
    siteWeb: String
    linkedinWeb: String
    githubWeb: String
    dribbbleWeb: String
    description: String
    # Permisos
    is_superuser: Boolean
    is_staff: Boolean
    is_active: Boolean
    # Date
    createdAt: String
    updatedAt: String
  }

  type Publication {
    id: ID
    idUser: ID
    idCloud: String
    description: String
    file: String
    typeFile: String
    createdAt: String
  }

  type Comment {
    idPublication: ID
    idUser: User
    comment: String
    createdAt: String
  }

  type PublicationUser {
    id: ID
    idUser: User
    idCloud: String
    description: String
    file: String
    typeFile: String
    createAt: String
  }

  type FeedPublication {
    publication: PublicationUser
    comments: Int
    likes: Int
  }

  type Language {
    id: ID
    name: String
    language: String
    category: String
    icon: String
    createdAt: String
  }

  type CodeSandbox {
    id: ID
    idUser: ID
    name: String
    language: String
    content: [FilesCodeSandbox]
    name_language: String
    icon: String
    createdAt: String
    updatedAt: String
  }

  type FilesCodeSandbox {
    name: String
    content: String
  }

  type Curso {
    id: ID
    name: String
    thumbnail: String
    description: String
    status: Boolean
    createdAt: String
    category: String
    subcategories: [Subcategories]
    temario: [Temas]
  }

  type Subcategories {
    subcategory_name: String
  }

  type Temas {
    id: ID
    name: String
    curso: ID
    curso_name: String
    createdAt: String
    lecciones: [Lecciones]
  }

  type Lecciones {
    id: ID
    name: String
    tema: ID
    tema_name: String
    createdAt: String
    slides: [Slides]
    compiler: Compilador
  }

  type Slides {
    id: ID
    name: String
    leccion: ID
    leccion_name: String
    clase: ID
    clase_name: String
    type_slide: String
    content: String
    url: String
    code: String
    createdAt: String
  }

  type Compilador {
    id: ID
    name: String
    leccion: ID
    leccion_name: String
    language: ID
    language_name: String
    code: String
    createdAt: String
  }

  type Token {
    token: String
  }

  type Email {
    email: String
  }

  type Reset {
    resetPasswordLink: String
    password: String
  }

  type UploadAvatar {
    id: ID
    urlAvatar: String
    status: Boolean
  }

  type Status {
    id: ID
    status: Boolean
  }

  # *===== INPUTS =====*
  input UserInput {
    username: String!
    first_name: String!
    last_name: String!
    email: String!
    password: String!
  }

  input ActivateInput {
    token: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input ForgotInput {
    email: String!
  }

  input ResetPassInput {
    resetPasswordLink: String!
    password: String!
  }

  input PasswordInput {
    password: String!
  }

  input GoogleSignInInput {
    token: String!
  }

  input IdentifierInput {
    id: ID!
  }

  input StatusInput {
    id: ID!
    status: Boolean!
  }

  input AvatarInput {
    id: ID!
    status: Boolean!
    avatar: String!
  }

  input InfoUserInput {
    first_name: String!
    last_name: String!
    description: String
  }

  input ContactUserInput {
    siteWeb: String
    linkedinWeb: String
    githubWeb: String
    dribbbleWeb: String
  }

  input PublishInput {
    idUser: ID!
    idCloud: String!
    description: String
    file: String!
    typeFile: String!
    status: Boolean!
  }

  input CommentInput {
    idPublication: ID
    comment: String
  }

  input SandboxInput {
    name: String!
    language: String!
    icon: String!
    name_language: String!
  }

  input IdSandboxInput {
    id: ID!
    status: Boolean!
  }

  input FilesSandboxInput {
    name: String!
    content: String!
  }

  # *===== QUERYS =====*
  type Query {
    # User
    getUser(id: ID, username: String): User
    searchUsers(search: String): [User]

    # Follow
    isFollow(username: String!): Boolean
    getFollowers(username: String!): [User]
    getFollows(username: String!): [User]

    # Publicaciones
    getPostInfo(id: ID!): Publication
    getPublications(username: String!): [Publication]
    getPublicationsFollows: [FeedPublication]

    # Comentarios
    getComments(idPublication: ID!): [Comment]

    # Likes
    isLike(idPublication: ID!): Boolean
    countLikes(idPublication: ID!): Int

    # CodeSandbox
    getLanguages(status: Boolean!): [Language]
    getCodeSandboxes(status: Boolean!): [CodeSandbox]
    getCodeSandbox(id: ID!): CodeSandbox

    # Cursos
    getCursos(status: Boolean!): [Curso]
    getCurso(status: Boolean!, id: ID!): Curso
    getLeccion(status: Boolean!, id: ID!): Lecciones
  }

  # *===== MUTATIONS =====*
  type Mutation {
    # Funcion que recibe un Input
    # y retorna un Type

    # => Users:
    register(input: UserInput): User
    activate(input: ActivateInput): Token
    login(input: LoginInput): Token
    forgot(input: ForgotInput): Email
    reset(input: ResetPassInput): Reset
    googleSignIn(input: GoogleSignInInput): Token
    updateAvatar(file: Upload): UploadAvatar
    destroyAvatar(input: IdentifierInput): Status
    changeAvatar(input: AvatarInput): UploadAvatar
    updateInfoUser(input: InfoUserInput): User
    updateContactUser(input: ContactUserInput): User
    changePassword(input: PasswordInput): Status

    # => Follow:
    follow(username: String!): Boolean
    unfollow(username: String!): Boolean

    # => Publicaciones:
    authorizeFile(file: Upload): Status
    publish(input: PublishInput): Status

    # => Comentarios:
    addComment(input: CommentInput): Comment

    # => Likes:
    addLike(idPublication: ID!): Boolean
    removeLike(idPublication: ID!): Boolean

    # => CodeSandbox:
    newCodeSandbox(input: SandboxInput): CodeSandbox
    saveSandbox(id: ID!, files: [FilesSandboxInput]): Status
    removeSandbox(id: ID!): Status

    # => Cursos:
  }
`;

module.exports = typeDefs;
