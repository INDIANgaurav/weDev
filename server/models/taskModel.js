const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true, // Task description is required
        trim: true
    },
    completed: {
        type: Boolean,
        default: false // Default: task is not completed
    },
    createdAt: {
        type: Date,
        default: Date.now // Auto-set the creation date
    }
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
