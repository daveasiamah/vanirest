const Product = require("../models/productModel");
const { getPostData } = require("../utils");

//@Desc Create a new Product
//@route POST /api/products
async function createProduct(req, res) {
  try {
    const body = await getPostData(req);
    const { name, description, price } = JSON.parse(body);

    const product = {
      name,
      description,
      price,
    };

    const newProduct = await Product.create(product);

    res.writeHead(201, { "Content-Type": "application/json" });

    res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

//@Desc Get All Products
//@route GET /api/products
async function getProducts(req, res) {
  try {
    const products = await Product.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

//@Desc Get Single Product
//@route GET /api/product/:id
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found." }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (err) {
    console.log(err);
  }
}

//@Desc Get Product name and price
//@route GET /api/product/price/:id
async function getProductPrice(req, res, id) {
  try {
    const product = await Product.fetchNameAndPrice(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found." }));
    } else {
      console.log("Product Found: " + JSON.stringify(product));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}
//@Desc Update a Product
//@route GET /api/products/:id
async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found." }));
    } else {
      const body = await getPostData(req);
      const { name, description, price } = JSON.parse(body);

      const productData = {
        name: name || product.name,
        description: description || product.description,
        price: price || product.price,
      };

      const updatedProduct = await Product.update(id, productData);
      res.writeHead(200, { "Content-Type": "application/json" });

      res.end(JSON.stringify(updatedProduct));
    }
  } catch (error) {
    console.log(error);
  }
}
//Convert to Ramda
//@Desc Delete a Product
//@route DELETE /api/products/:id
async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found." }));
    } else {
      await Product.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });

      res.end(JSON.stringify({ message: "Removed successfully." }));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  getProductPrice,
  updateProduct,
  deleteProduct,
};
