import mongoose from "mongoose";
import List from "../models/List";

const _repository = mongoose.model("List", List);

class ListService {
  async getListByBoardId(id) {
    let data = await _repository.find({ boardId: id });
    return data;
  }
  async createList(body) {
    let data = await _repository.create(body);
    return data;
  }
}

const _listService = new ListService();
export default _listService;
