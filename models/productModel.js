const R = require("ramda");
const { writeDataToFile } = require("../utils");
const uuid = require("uuid");
const products = require("../data/products");

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
    console.log(productById);
    resolve(productById);
  });
}

function fetchNameAndPrice(id) {
  return new Promise((resolve, reject) => {
    // const result = products.filter((item) => item.id == id);

    const filteredProduct = R.filter((item) => item.id == id, products);
    const getNameAndPrice = R.project(["name", "price"]);
    const result = getNameAndPrice(filteredProduct);

    resolve({ result });
  });
}

function update(id, product) {
  return new Promise((resolve, reject) => {
    const index = products.find((p) => p.id === id);
    products[index] = { id, ...product };

    console.log("Product Index: ", index);
    writeDataToFile("./data/products.json", products);
    resolve({ message: "Updated Successfully.", data: products[index] });
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    // products = products.find((p) => p.id === parseInt(id));
    products = R.filter((p) => p.id !== id);

    console.log(products);
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
