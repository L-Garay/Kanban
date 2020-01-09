import mongoose from "mongoose";
import Comment from "../models/Comment";

const _repository = mongoose.model("Comment", Comment);

class CommentService {
  async getCommentsByTaskId(id) {
    let data = await _repository.find({ listId: id });
    return data;
  }
  async deleteComment(id) {
    let data = await _repository.findOneAndDelete({ _id: id });
    return data;
  }
  async createComment(body) {
    let data = await _repository.create(body);
    return data;
  }
  async getComments(id) {
    let data = await _repository.find({ authorId: id });
    return data;
  }
}

const _commentService = new CommentService();
export default _commentService;
