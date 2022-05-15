// Importacion de Controladores
const userController = require("../controllers/user.controller");
const followController = require("../controllers/follow.controller");
const publicationController = require("../controllers/publication.controller");
const commentController = require("../controllers/comment.controller");
const likeController = require("../controllers/like.controller");
const sandboxController = require("../controllers/sandbox.controller");
const courseController = require("../controllers/course.controllers");
const { GraphQLUpload } = require("graphql-upload");

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    // User
    getUser: (_, { id, username }) => userController.getUser(id, username),
    searchUsers: (_, { search }) => userController.searchUserController(search),

    // Follow
    isFollow: (_, { username }, ctx) =>
      followController.isFollowController(username, ctx),
    getFollowers: (_, { username }, ctx) =>
      followController.getFollowersController(username, ctx),
    getFollows: (_, { username }, ctx) =>
      followController.getFollowsController(username, ctx),

    // Publicaciones
    getPostInfo: (_, { id }) => publicationController.getPostInfo(id),
    getPublications: (_, { username }) =>
      publicationController.getPublications(username),
    getPublicationsFollows: (_, {}, ctx) =>
      publicationController.getPublicationsFollows(ctx),

    // Comentarios
    getComments: (_, { idPublication }) =>
      commentController.getComments(idPublication),

    // Likes
    isLike: (_, { idPublication }, ctx) =>
      likeController.isLike(idPublication, ctx),
    countLikes: (_, { idPublication }) =>
      likeController.getLikes(idPublication),

    // CodeSandbox
    getLanguages: (_, { status }) =>
      sandboxController.getProgrammingLanguages(status),
    getCodeSandboxes: (_, { status }, ctx) =>
      sandboxController.getCodeSandboxes(status, ctx),
    getCodeSandbox: (_, { id }) => sandboxController.getCodeSandbox(id),

    // Cursos
    getCursos: (_, { status }) => courseController.getCursos(status),
    getCurso: (_, { status, id }) => courseController.getCurso(status, id),
    getLeccion: (_, { status, id }) => courseController.getLeccion(status, id),
  },

  Mutation: {
    // # AUTH USER
    register: (_, { input }) => userController.registerController(input),
    activate: (_, { input }) => userController.activationController(input),
    login: (_, { input }) => userController.loginController(input),
    forgot: (_, { input }) => userController.forgotController(input),
    reset: (_, { input }) => userController.resetPasswordController(input),
    googleSignIn: (_, { input }) => userController.googleController(input),

    // # AVATAR
    destroyAvatar: (_, { input }, ctx) =>
      userController.deletePFPController(input, ctx),
    updateAvatar: (_, { file }, ctx) =>
      userController.uploadPFPController(file, ctx),
    changeAvatar: (_, { input }, ctx) =>
      userController.changePFPController(input, ctx),

    // # INFO USER
    updateInfoUser: (_, { input }, ctx) =>
      userController.updateUserInfoController(input, ctx),
    updateContactUser: (_, { input }, ctx) =>
      userController.updateUserWebController(input, ctx),
    changePassword: (_, { input }, ctx) =>
      userController.changePasswordController(input, ctx),

    // # FOLLOW
    follow: (_, { username }, ctx) =>
      followController.followUserController(username, ctx),
    unfollow: (_, { username }, ctx) =>
      followController.unfollowUserController(username, ctx),

    // # PUBLICACIONES
    authorizeFile: (_, { file }, ctx) =>
      publicationController.authorizePublishController(file, ctx),
    publish: (_, { input }) =>
      publicationController.newPublishController(input),

    // # COMENTARIOS
    addComment: (_, { input }, ctx) =>
      commentController.addCommentController(input, ctx),

    // # LIKES
    addLike: (_, { idPublication }, ctx) =>
      likeController.addLikeController(idPublication, ctx),
    removeLike: (_, { idPublication }, ctx) =>
      likeController.removeLikeController(idPublication, ctx),

    // # CODESANDBOX
    newCodeSandbox: (_, { input }, ctx) =>
      sandboxController.newSandboxController(input, ctx),
    saveSandbox: (_, { id, files }) =>
      sandboxController.saveSandboxController(id, files),
    removeSandbox: (_, { id }, ctx) =>
      sandboxController.deleteSandboxController(id, ctx),
  },
};

module.exports = resolvers;
