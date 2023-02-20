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

module.exports = fetchCategories;
