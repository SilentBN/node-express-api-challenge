// api/actions/actions-middleware.js

function validateActionId(req, res, next) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid action ID. Must be a number." });
  } else {
    req.actionId = id; // store the parsed id for later use
    next();
  }
}

function validateActionBody(req, res, next) {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    res
      .status(400)
      .json({
        message:
          "Please provide project_id, description, and notes for the action",
      });
  } else {
    next();
  }
}

module.exports = {
  validateActionId,
  validateActionBody,
};
