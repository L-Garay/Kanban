import _commentService from "../services/CommentService";
import express from "express";
import { Authorize } from "../middleware/authorize.js";

//PUBLIC
export default class CommentsController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      .post("", this.createComment)
      .get("", this.getComments)
      .delete("/:id", this.deleteComment)
      .use(this.defaultRoute);
  }

  // this is pretty neat

  async createComment(req, res, next) {
    try {
      //only gets boards by user who is logged in
      let data = await _commentService.createComment(req.body);
      return res.send(data);
    } catch (err) {
      next(err);
    }
  }
  async deleteComment(req, res, next) {
    let data = await _commentService.deleteComment(req.params.id);
    return res.send("deleted");
  }

  async getComments(req, res, next) {
    let data = await _commentService.getComments(req.session.uid);
    return res.send(data);
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Routerrrrrrr" });
  }
}
