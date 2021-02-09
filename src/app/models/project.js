const mongoose = require('../../database');
const bcrypt = require('brcyptjs');

const ProjectSchema = new mongoose.Schema({
title: {
        type: String,
        require: true,
},
    description: {
    type: String,
    require: true,
    },

user: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'User',
   require: true,
   taks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
   }],
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


const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;