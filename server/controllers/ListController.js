import _listService from "../services/ListService";
import express from "express";
import { Authorize } from "../middleware/authorize.js";
import _taskService from "../services/TaskService";

//PUBLIC
export default class ListsController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      .post("", this.createList)
      .delete("/:id", this.deleteList)
      .get("/:id/tasks", this.getTasksByListId)
      .use(this.defaultRoute);
  }

  // this is pretty neat
  async getTasksByListId(req, res, next) {
    try {
      let data = await _taskService.getTasksByListId(req.params.id);
      return res.send(data);
    } catch (err) {
      next(err);
    }
  }
  async createList(req, res, next) {
    try {
      let data = await _listService.createList(req.body);
      return res.send(data);
    } catch (err) {
      next(err);
    }
  }
  async deleteList(req, res, next) {
    try {
      let data = await _listService.deleteList(req.params.id);
      return res.send("deleted");
    } catch (err) {
      next(err);
    }
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Routerrrrrrrrrrr" });
  }
}
