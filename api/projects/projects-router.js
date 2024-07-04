// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model.js");
const router = express.Router();

router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      res.json(projects);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  Projects.get(req.params.id)
    .then((project) => {
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    })
    .catch(next);
});

// Add POST, PUT, and DELETE endpoints here

module.exports = router;
