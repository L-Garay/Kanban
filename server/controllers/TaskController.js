import _taskService from "../services/TaskService";
import express from "express";
import { Authorize } from "../middleware/authorize.js";
import _commentService from "../services/CommentService";

//PUBLIC
export default class TasksController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      .post("", this.createTask)
      .get("", this.getTasks)
      .get("/:id/comments", this.getCommentsByTaskId)
      .put("/:id", this.moveTask)
      .delete("/:id", this.deleteTask)
      .use(this.defaultRoute);
  }

  // this is pretty neat

  async moveTask(req, res, next) {
    try {
      let data = await _taskService.moveTask(req.params.id);
    } catch (error) {
      next(error);
    }
  }
  async getCommentsByTaskId(req, res, next) {
    try {
      let data = await _commentService.getCommentsByTaskId(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async createTask(req, res, next) {
    try {
      //only gets boards by user who is logged in
      let data = await _taskService.createTask(req.body);
      return res.send(data);
    } catch (err) {
      next(err);
    }
  }
  async deleteTask(req, res, next) {
    let data = await _taskService.deleteTask(req.params.id);
    return res.send("deleted");
  }

  async getTasks(req, res, next) {
    let data = await _taskService.getTasks(req.session.uid);
    return res.send(data);
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Routerrrrrrr" });
  }
}
