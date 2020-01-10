import mongoose from "mongoose";
import List from "./List";
import Task from "./Task";
import Comment from "./Comment";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
const _listRepo = mongoose.model("List", List);
const _taskRepo = mongoose.model("Task", Task);
const _commentRepo = mongoose.model("Comment", Comment);

const Board = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    authorId: { type: ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

Board.pre("findOneAndRemove", function(next) {
  //lets find all the lists and remove them
  Promise.all([
    _listRepo.deleteMany({ boardId: this._conditions._id }),
    _taskRepo.deleteMany({ boardId: this._conditions._id }),
    _commentRepo.deleteMany({ boardId: this._conditions._id })
  ])
    .then(() => next())
    .catch(err => next(err));
});

export default Board;
