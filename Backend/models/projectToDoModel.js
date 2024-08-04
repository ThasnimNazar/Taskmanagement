import mongoose from 'mongoose';

// Define schema for Todos
const todoSchema = new mongoose.Schema({
    description: { type: String, required: true },
    project:{type: mongoose.Schema.Types.ObjectId, ref:'Project',required: true},
    user:{  type: mongoose.Schema.Types.ObjectId, ref:'User',required: true},
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now }
});

// Define schema for Projects
const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    user:{  type: mongoose.Schema.Types.ObjectId, ref:'User',required: true},
    createdDate: { type: Date, default: Date.now },
    todos: [] 
});

// Define model for Projects
const Project = mongoose.model('Project', projectSchema);

// Define model for Todos
const Todo = mongoose.model('Todo', todoSchema);

export { Project, Todo };
