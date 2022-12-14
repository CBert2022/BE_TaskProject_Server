const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const projectSchema = new Schema({
title: {
    type: String,
    required: true,
},
description: String,
createdBy: { type: Schema.Types.ObjectId, ref: "User" },
tasks: {type: [{type: Schema.Types.ObjectId, ref: "Task"}] ,index: true},
position: Number,
});

module.exports = model("Project", projectSchema);