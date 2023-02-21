const express = require("express");
const app = express();
const { getCategories, getReviews } = require("./controllers");
const { handleServerErrors } = require("./errors/index");

app.get("/api", (request, response) => {
  response.status(200).send({ msg: "all ok here" });
});

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);

app.use(handleServerErrors);

module.exports = app;
