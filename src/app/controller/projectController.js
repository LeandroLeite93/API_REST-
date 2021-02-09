const { Router } = require('express');
const express = require('express');
const authMiddelware = require('../../middelwares/auth');

const Project = require('../models/project');
const Task = require('../models/taks');


const router = express.Router();

router.use(authMiddelware);

router.get('/', async (req, res) => {
    try{
        const projects = await Project.find().populate('user'); 
 
       return res.send({ projects });
     } catch (err) {
         return res.status(400).send({ error: 'Error loading projects'});
     }
});

router.get('/:projectId', async (req, res) => {
    try{
       const project = await Project.findById(req.params.projectId).populate('[user, Task]'); 

      return res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting project'});
    }
});

router.post('/', async(req, res) => {
  try {
    const { title, description, task} = req.body;

    const project = await Project.create({ title, description, user: req.userId });

   await Promise.all(task.map(async task => {
        const projectTask = new Task({ ...task, project: project._Id});

       await projectTask.save();
        project.taks.push(projectTask);
    }));

    await project.save();

    return res.send({ project }); 

    } catch (err) {
        return res.status(400).send({ error: 'Error creating new project'});
    }
});

router.put('/:projectId', async (req, res) => {
    try {
        const { title, description, task} = req.body;
    
        const project = await Project.findByIdAndUpdate(req.params.projectId,{ 
            title, 
            description
        }, { new: true });

        project.taskn = [];
        await Taks.remove({ project: project._Id });
    
       await Promise.all(task.map(async task => {
            const projectTask = new Task({ ...task, project: project._Id});
    
           await projectTask.save();
            project.taks.push(projectTask);
        }));
    
        await project.save();
    
        return res.send({ project }); 
    
        } catch (err) {
            return res.status(400).send({ error: 'Error updating project'});
        }
});

router.delete('/:projectId', async (req, res) => {
    try{
        const project = await Project.findByIdAndRemove(req.params.projectId); 
 
       return res.send({ project });
     } catch (err) {
         return res.status(400).send({ error: 'Error loading project'});
     }
});


module.exports = app => app.use('/project', router);