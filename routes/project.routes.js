const express = require("express");
const router = express.Router();

const Project = require("../models/Project.model");

/////////// GET ALL PROJECT ON INDEX //////////////

router.get("/", (req, res, next) => {
    Project.find()
    .then(allProjects => {
        res.json(allProjects)
    })
    .catch(error => console.log('error!!! YOU SUCK INDEX'));
  });

  /////////// CREATE A PROJECT ON INDEX //////////////
//
router.get("/projects", (req,res) => res.json("message"))

router.post("/projects", (req, res, next) => {
    const { title, description} = req.body;
    console.log(req.body);
    Project.create({ title, description })
        .then((response) => res.json(response))
        .catch((err) => res.json(err));
    });


module.exports = router;