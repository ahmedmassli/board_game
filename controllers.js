const { fetchCategories, fetchReviews } = require("./models");

function getCategories(request, response, next) {
  fetchCategories()
    .then((catogData) => {
      const obj = { catogData: catogData };
      response.send(obj);
    })
    .catch((err) => {
      next(err);
    });
}

function getReviews(request, response, next) {
  fetchReviews()
    .then((revData) => {
      const obj = { revData: revData };
      response.send(obj);
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getCategories, getReviews };
