import _listService from "../services/ListService";
import express from "express";
import { Authorize } from "../middleware/authorize.js";

//PUBLIC
export default class ListsController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      .post("", this.createList)
      .use(this.defaultRoute)
      .delete("/:id", this.deleteList);
  }

  // this is pretty neat

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
  }

  async createList(req, res, next) {
    try {
      //only gets boards by user who is logged in
      let data = await _listService.createList(req.body);
      return res.send(data);
    } catch (err) {
      next(err);
    }
  }
  async deleteList(req, res, next) {
    let data = await _listService.deleteList(req.params.id);
  }
}
