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

router.post("/", (req, res, next) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res
      .status(400)
      .json({ message: "Please provide name and description for the project" });
  } else {
    Projects.insert(req.body)
      .then((project) => {
        res.status(201).json(project);
      })
      .catch(next);
  }
});

router.put("/:id", (req, res, next) => {
  const { name, description, completed } = req.body;
  if (!name || !description || completed === undefined) {
    res.status(400).json({
      message:
        "Please provide name, description, and completed status for the project",
    });
  } else {
    Projects.update(req.params.id, req.body)
      .then((project) => {
        if (project) {
          res.json(project);
        } else {
          res.status(404).json({ message: "Project not found" });
        }
      })
      .catch(next);
  }
});

router.delete("/:id", (req, res, next) => {
  Projects.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Project not found" });
      }
    })
    .catch(next);
});

router.get("/:id/actions", (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => {
      res.json(actions); // This will return an empty array if no actions are found
    })
    .catch(next);
});

module.exports = router;
