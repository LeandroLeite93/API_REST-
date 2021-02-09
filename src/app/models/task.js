const mongoose = require('../../database');
const bcrypt = require('brcyptjs');

const TaskSchema = new mongoose.Schema({
title: {
        type: String,
        require: true,
},
project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    require: 'true',
},
assignedTo: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'User',
   require: true,
},
completed: {
   type: 'Boolean',
   require: 'true',
   default: 'false',
},
email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
},
createdAt: {
    type: Date,
    default: date.now, 
},
})


const Task = mongoose.model('Task', TaskSchema);
module.exports = Project;