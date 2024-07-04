// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model.js");
const router = express.Router();

// GET all actions
router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.json(actions);
    })
    .catch(next);
});

// GET a specific action by id
router.get("/:id", (req, res, next) => {
  Actions.get(req.params.id)
    .then((action) => {
      if (action) {
        res.json(action);
      } else {
        res.status(404).json({ message: "Action not found" });
      }
    })
    .catch(next);
});

// POST a new action
router.post("/", (req, res, next) => {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    res.status(400).json({
      message:
        "Please provide project_id, description, and notes for the action",
    });
  } else {
    Actions.insert(req.body)
      .then((action) => {
        res.status(201).json(action);
      })
      .catch(next);
  }
});

// PUT (update) an existing action
router.put("/:id", (req, res, next) => {
  const { project_id, description, notes, completed } = req.body;
  if (!project_id || !description || !notes || completed === undefined) {
    res.status(400).json({
      message:
        "Please provide project_id, description, notes, and completed status for the action",
    });
  } else {
    Actions.update(req.params.id, req.body)
      .then((action) => {
        if (action) {
          res.json(action);
        } else {
          res.status(404).json({ message: "Action not found" });
        }
      })
      .catch(next);
  }
});

// DELETE an action
router.delete("/:id", (req, res, next) => {
  Actions.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.json({ message: "The action has been nuked" });
      } else {
        res.status(404).json({ message: "Action not found" });
      }
    })
    .catch(next);
});

module.exports = router;
