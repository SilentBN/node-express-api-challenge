const express = require("express");
const Projects = require("./projects-model.js");
const router = express.Router();

// GET all projects
router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => {
      // Send the array of all projects (empty array if no projects exist)
      res.json(projects);
    })
    .catch(next); // Pass any errors to the error handling middleware
});

// GET a specific project by id
router.get("/:id", (req, res, next) => {
  Projects.get(req.params.id)
    .then((project) => {
      if (project) {
        res.json(project);
      } else {
        // If no project is found with the given id, send a 404 response
        res.status(404).json({ message: "Project not found" });
      }
    })
    .catch(next);
});

// POST a new project
router.post("/", (req, res, next) => {
  const { name, description } = req.body;
  // Check if required fields are provided
  if (!name || !description) {
    res
      .status(400)
      .json({ message: "Please provide name and description for the project" });
  } else {
    Projects.insert(req.body)
      .then((project) => {
        // Send the newly created project with a 201 status code
        res.status(201).json(project);
      })
      .catch(next);
  }
});

// PUT (update) an existing project
router.put("/:id", (req, res, next) => {
  const { name, description, completed } = req.body;
  // Check if all required fields are provided
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
          // If no project is found with the given id, send a 404 response
          res.status(404).json({ message: "Project not found" });
        }
      })
      .catch(next);
  }
});

// DELETE a project
router.delete("/:id", (req, res, next) => {
  Projects.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        // If a project was deleted, send a 204 (No Content) response
        res.status(204).end();
      } else {
        // If no project is found with the given id, send a 404 response
        res.status(404).json({ message: "Project not found" });
      }
    })
    .catch(next);
});

// GET all actions for a specific project
router.get("/:id/actions", (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => {
      // Always return the actions array (empty if no actions found)
      res.json(actions);
    })
    .catch(next);
});

module.exports = router;
