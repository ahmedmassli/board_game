const fetchCategories = require("./models");

function getCategories(request, response) {
  fetchCategories().then((catogData) => {
    const obj = { catogData: catogData };
    response.send(obj);
  });
}

module.exports = getCategories;
