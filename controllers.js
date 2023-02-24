const {
  fetchCategories,
  fetchReviews,
  fetchReviewId,
  fetchCommentsByReviewId,
  addCommentsByUsername,
  changeVotes,
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

function getReviewIDforComments(request, response, next) {
  const { review_id } = request.params;
  fetchCommentsByReviewId(review_id)
    .then((comments) => {
      const obj = { comments: comments };
      response.send(obj);
    })
    .catch((err) => {
      next(err);
    });
}

function getRequestInfo(request, response, next) {
  const { review_id } = request.params;
  const author = request.body.username;
  const body = request.body.body;

  addCommentsByUsername(review_id, author, body)
    .then((comment) => {
      const obj = { comment: comment };
      response.status(201).send(obj);
    })
    .catch((err) => {
      next(err);
    });
}

function updateReview(request, response, next) {
  const { review_id } = request.params;
  const inc_vot = request.body.inc_votes;

  changeVotes(review_id, inc_vot)
    .then((comment) => {
      const obj = { comment: comment };
      response.status(201).send(obj);
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  getCategories,
  getReviews,
  getReviewID,
  getReviewIDforComments,
  getRequestInfo,
  updateReview,
};
