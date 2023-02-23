const express = require("express");
const app = express();
const {
  getCategories,
  getReviews,
  getReviewID,
  getReviewIDforComments,
} = require("./controllers");
const {
  handle404nonExistentPaths,
  handlePSQL400s,
  handleCustomErrors,
  handleServerErrors,
} = require("./errors/index");

app.get("/api", (request, response) => {
  response.status(200).send({ msg: "all ok here" });
});

app.get("/api/categories", getCategories);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id", getReviewID);

app.get("/api/reviews/:review_id/comments", getReviewIDforComments);

app.use(handle404nonExistentPaths);
app.use(handlePSQL400s);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
