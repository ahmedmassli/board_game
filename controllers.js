const {
  fetchCategories,
  fetchReviews,
  fetchReviewId,
  fetchCommentByUsername,
} = require("./models");

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

function getReviewID(request, response, next) {
  const { review_id } = request.params;
  fetchReviewId(review_id)
    .then((revData) => {
      const obj = { revData: revData };
      response.send(obj);
    })
    .catch((err) => {
      next(err);
    });
}

function getCommentUsingId(request, response, next) {
  console.log(review_id);
  const { review_id } = request.params;

  fetchReviewId(review_id)
    .then((revData) => {
      const obj = { revData: revData };
      response.send(obj);
    })
    .catch((err) => {
      next(err);
    });
}

function getCommentUsingUsername(request, response, next) {
  const { review_id } = request.params;

  fetchCommentByUsername(review_id)
    .then((revData) => {
      const obj = { revData: revData };
      response.send(obj);
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getCategories, getReviews, getReviewID, getCommentUsingId };
