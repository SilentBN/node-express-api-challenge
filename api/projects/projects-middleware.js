// add middlewares here related to projects

function validateProjectId(req, res, next) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid project ID. Must be a number." });
  } else {
    req.projectId = id; // store the parsed id for later use
    next();
  }
}

function validateProjectBody(req, res, next) {
  const { name, description } = req.body;
  if (!name || !description) {
    res
      .status(400)
      .json({
        message: "Please provide both name and description for the project",
      });
  } else {
    next();
  }
}

module.exports = {
  validateProjectId,
  validateProjectBody,
};
