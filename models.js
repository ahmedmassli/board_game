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

// function fetchCommentsByReviewId(review_id) {
//   let queryString = `
//         SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.review_id
//         FROM comments
//         `;
//   const queryParams = [];

//   if (review_id !== undefined) {
//     queryString += "WHERE review_id=$1 ORDER BY comments.created_at DESC;";
//     queryParams.push(review_id);
//   }
//   return db.query(queryString, queryParams).then((result) => {
//     const revs = result.rows;
//     return revs;
//   });
// }

function fetchCommentsByReviewId(review_id) {
  const queryParams = [];
  queryParams.push(review_id);

  return db
    .query(
      `
        SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.review_id
        FROM comments
        WHERE review_id=$1 ORDER BY comments.created_at DESC;
        `,
      queryParams
    )
    .then((result) => {
      return result.rows;
    });
}

function addCommentsByUsername(review_id, author, body) {
  const queryParams = [];
  queryParams.push(review_id, author, body);

  return db
    .query(
      `
        INSERT INTO comments ( body, review_id, author)
        VALUES ($3, $1, $2)     
        RETURNING *   
        ;
        `,
      queryParams
    )
    .then((result) => {
      console.log(result.detail);

      return result.rows[0];
    });
}

module.exports = {
  fetchCategories,
  fetchReviews,
  fetchReviewId,
  fetchCommentsByReviewId,
  addCommentsByUsername,
};
