const db = require("./db/connection");

function fetchCategories() {
  return db
    .query(
      `
        SELECT * FROM categories
        `
    )
    .then((fetchCategories) => {
      return fetchCategories.rows;
    });
}

function fetchReviews() {
  return db
    .query(
      `
        SELECT reviews.owner, reviews.title, reviews.review_id, reviews.review_img_url, reviews.category, reviews.created_at,reviews.votes,reviews.designer,CAST(COUNT(comments.review_id) AS int) AS comment_count
        FROM reviews
        LEFT JOIN comments ON comments.review_id = reviews.review_id
        GROUP BY reviews.review_id
        ORDER BY reviews.created_at DESC        ;
        `
    )
    .then((fetchCategories) => {
      return fetchCategories.rows;
    });
}

function fetchReviewId(review_id) {
  let queryString = `
        SELECT reviews.owner, reviews.title, reviews.review_id, reviews.review_img_url, reviews.category, reviews.created_at,reviews.votes,reviews.designer,reviews.review_body
        FROM reviews
        `;
  const queryParams = [];

  if (review_id !== undefined) {
    queryString += "WHERE review_id=$1;";
    queryParams.push(review_id);
  }
  return db.query(queryString, queryParams).then((result) => {
    const revs = result.rows;
    if (result.rowCount === 0) {
      return Promise.reject("review_id not found");
    }
    return revs;
  });
}

function fetchCommentsByReviewId(review_id) {
  let queryString = `
        SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.review_id
        FROM comments
        `;
  const queryParams = [];

  if (review_id !== undefined) {
    queryString += "WHERE review_id=$1 ORDER BY comments.created_at DESC;";
    queryParams.push(review_id);
  }
  return db.query(queryString, queryParams).then((result) => {
    const revs = result.rows;
    console.log(result.rowCount);
    // if (result.rowCount === 0) {
    //   return Promise.reject("review_id not found");
    // }
    return revs;
  });
}

module.exports = {
  fetchCategories,
  fetchReviews,
  fetchReviewId,
  fetchCommentsByReviewId,
};
