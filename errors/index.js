exports.handle404nonExistentPaths = (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
};

exports.handlePSQL400s = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(404).send({ msg: "wrong path given" });
  } else if (err.code === "23502") {
    res.status(400).send({ msg: "missing input" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "invalid input" });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err === "couldnt find the snack") {
    res.status(404).send({ msg: "Not Found" });
  } else if (err === "review_id not found") {
    res.status(404).send({ msg: err });
  } else {
    next(err);
  }
};

exports.handleServerErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};
