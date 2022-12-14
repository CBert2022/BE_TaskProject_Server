const { Schema, model } = require("mongoose");


const taskSchema = new Schema(
  {
    title: {
        type: String,
        required: true,
    },
    description: String,
    dueDate: Date,
    project: { type: Schema.Types.ObjectId, ref: "Project" },
    important: Boolean,
    done: {type: Boolean, default: false},
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  },
  { index: true}
);

const Task = model("Task", taskSchema);

module.exports = Task;
