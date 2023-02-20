const fetchCategories = require("./models");

function getCategories(request, response) {
  fetchCategories().then((catogData) => {
    response.send(catogData);
  });
}

module.exports = getCategories;
