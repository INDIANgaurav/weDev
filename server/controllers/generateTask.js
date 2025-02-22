const axios = require("axios");

const API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;
const Task = require("../models/taskModel");  

const generateTasks = async (req, res) => {
    try {
        const { topic } = req.body;
        console.log( "your topic is here ->" ,  topic)
        if (!topic) {
            return res.status(400).json({ error: "Topic is required" });
        }

        const prompt = `Generate a list of 5 concise, actionable tasks to learn about ${topic}. Return only the tasks, no numbering or formatting.`;

        const response = await axios.post(GEMINI_URL, {
            contents: [{ parts: [{ text: prompt }] }]
        });

        const tasks = response.data.candidates[0].content.parts[0].text.split("\n");
        res.json({ tasks });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

 

const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;  
        const { newTask } = req.body;  

        if (!newTask) {
            return res.status(400).json({ error: "newTask is required" });
        }

         
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { task: newTask },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
console.log("your updated task")
        res.json({ success: true, message: "Task updated successfully", updatedTask });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

 



module.exports = { generateTasks,updateTask };
