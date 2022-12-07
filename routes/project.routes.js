const express = require("express");
const router = express.Router();

const Project = require("../models/Project.model");

/////////// GET ALL PROJECT ON INDEX //////////////

router.get('/projects/', (req, res, next) => {
    Project.find()
      .populate('tasks')
      .then(allProjects => res.json(allProjects))
      .catch(err => res.json(err));


  });

  /////////// GET PROJECT CREATED BY USER //////////////

  router.get('/projects', (req, res, next) => {
  Project.findById(projectId)
    .populate('tasks')
    .then(project => res.status(200).json(project))
    .catch(error => res.json(error));
});
 

  /////////// CREATE A PROJECT ON INDEX //////////////

router.post("/projects", (req, res, next) => {
    const { title, description} = req.body;
    console.log(req.body);
    Project.create({ title, description })
        .then((response) => res.json(response))
        .catch((err) => res.json(err));
    });

   


module.exports = router;