const express = require("express");
const app = express();
const getCategories = require("./controllers");
const { handleServerErrors } = require("./errors/index");

app.use(handleServerErrors);

app.get("/api", (request, response) => {
  response.status(200).send({ msg: "all ok here" });
});

app.get("/api/categories", getCategories);
module.exports = app;
