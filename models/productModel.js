const R = require("ramda");
const { writeDataToFile } = require("../utils");
const uuid = require("uuid");
let products = require("../data/products");

function create(product) {
  return new Promise((resolve, reject) => {
    const newProduct = { id: uuid.v4(), ...product };
    products.push(newProduct);

    writeDataToFile("./data/products.json", products);
    resolve({ message: "Created Successfully.", newProduct });
  });
}

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const productById = R.find(R.propEq("id", id))(products);
    resolve(productById);
  });
}

function fetchNameAndPrice(id) {
  return new Promise((resolve, reject) => {
    const filteredProduct = R.filter((item) => item.id == id, products);
    const getNameAndPrice = R.project(["name", "price"]);
    const result = getNameAndPrice(filteredProduct);

    resolve({ result });
  });
}

function update(id, product) {
  return new Promise((resolve, reject) => {
    const index = R.find(R.propEq("id", id))(products);
    products[index] = { id, ...product };

    writeDataToFile("./data/products.json", products);
    resolve({ message: "Updated Successfully.", data: products[index] });
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    products = R.filter((item) => item.id === id, products);

    writeDataToFile("./data/products.json", products);
    resolve();
  });
}

//TODO: Adjust price
function adjustPrice(id) {
  return new Promise((resolve, reject) => {
    resolve("adjustPrice");
  });
}

module.exports = {
  create,
  findAll,
  findById,
  update,
  fetchNameAndPrice,
  adjustPrice,
  remove,
};
