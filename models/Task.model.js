const { Schema, model } = require("mongoose");


const taskSchema = new Schema(
  {
    title: {
        type: String,
    },
    description: String,
    dueDate: Date,
    project: { type: Schema.Types.ObjectId, ref: "Project" },
  },
  {
    timestamps: true,
  }
);

const Task = model("Task", taskSchema);

module.exports = Task;
