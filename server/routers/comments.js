const express = require("express");
const router = express.Router();
const { success, sendError } = require("../helpers/responses");
const {
  getComments,
  deleteComment,
  deleteAllCommentsInPost,
  editComment,
  createComment,
  likeComment,
  dislikeComment,
} = require("../controllers/comments");
const {
  commentPostShemaValidator,
  commentGetSchemaValidor,
  commentDeleteSchemaValidor,
  commentDeleteAllSchemaValidor,
  commentUpdateAllSchemaValidor,
} = require("../helpers/shemaValidators");
const { errorRouterHandler } = require("../middlewares/errorsHandling");
const validation = require("../middlewares/validationHandler");

function commentsRouter(app) {
  app.use("/api/comments", router);
  app.use("/api/comments", errorRouterHandler);

  router.post(
    "/",
    validation(commentPostShemaValidator),
    async (req, res, next) => {
      try {
        const payload = req.body;
        const saved = await createComment(payload);
        res.status(201);
        res.json(success(saved, 201));
      } catch (err) {
        next({
          errClient: "An error ocurred while creating the comment",
          errLog: err,
        });
      }
    }
  );

  router.get(
    "/:id",
    validation(commentGetSchemaValidor, "params"),
    async (req, res, next) => {
      try {
        const id = req.params.id;
        const comments = await getComments(id);
        res.json(success(comments));
      } catch (err) {
        next({
          errClient: "An error ocurred while querying the comment",
          errLog: err,
        });
      }
    }
  );

  // delete only comment
  router.delete(
    "/:id",
    validation(commentDeleteSchemaValidor, "params"),
    async (req, res, next) => {
      try {
        const id = req.params.id;
        const data = await deleteComment(id);
        res.json(success({ id, ...data }));
      } catch (err) {
        next({
          errClient: "An error ocurred while deleting the comment",
          errLog: err,
        });
      }
    }
  );

  // delete all comments in only post
  router.delete(
    "/all/:id",
    validation(commentDeleteAllSchemaValidor, "params"),
    async (req, res, next) => {
      try {
        const id_post = req.params.id;
        const data = await deleteAllCommentsInPost(id_post);
        res.json(success(data));
      } catch (err) {
        next({
          errClient: "An error ocurred while deleting the all comments",
          errLog: err,
        });
      }
    }
  );

  router.put(
    "/:id",
    validation(commentUpdateAllSchemaValidor, "params"),
    async (req, res, next) => {
      try {
        const id = req.params.id;
        const payload = req.body;
        const data = await editComment(id, payload);
        res.json(success({ id, ...data }));
      } catch (err) {
        next({
          errClient: "An error ocurred while editing the comment",
          errLog: err,
        });
      }
    }
  );

  router.post("/like/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const comment = await likeComment(id);
      res.json(success(comment));
    } catch (err) {
      next({
        errClient: "An error ocurred while like the comment",
        errLog: err,
      });
    }
  });

  router.post("/dislike/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const comment = await dislikeComment(id);
      res.json(success(comment));
    } catch (err) {
      next({
        errClient: "An error ocurred while dislike the comment",
        errLog: err,
      });
    }
  });
}

module.exports = commentsRouter;
