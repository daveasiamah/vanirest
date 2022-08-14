const Product = require("../models/productModel");
const { getPostData } = require("../utils");

//@Desc Create a new Product
//@route POST /api/products
// async function createProduct(req, res) {
//   try {
//     const body = await getPostData(req);
//     const { name, description, price } = JSON.parse(body);

//     const product = {
//       name,
//       description,
//       price,
//     };

//     const newProduct = await Product.create(product);

//     res.writeHead(201, { "Content-Type": "application/json" });

//     res.end(JSON.stringify(newProduct));
//   } catch (error) {
//     console.log(error);
//   }
// }

//TODO: Save Product to S3 JSON file
module.exports.createProduct = async (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const name = requestBody.name;
  const description = requestBody.description;
  const price = requestBody.price;
  const product = { name, description, price };

  console.info(`REQUEST BODY DATA IS: ${event.body}`);

  if (
    typeof name !== "string" ||
    typeof description !== "string" ||
    typeof price !== "number"
  ) {
    console.error("Validation Failed");
    callback(
      new Error("Couldn't submit candidate because of validation errors.")
    );
    return;
  }

  // const newProduct = await Product.create(product);

  return {
    statusCode: 201,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  };
};

//@Desc Get All Products
//@route GET /api/products
module.exports.getProducts = async (event) => {
  const products = await Product.findAll();
  console.log("Event from getProducts:", event);
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(products),
  };
};

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
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log(error);
  }
}

//@Desc Update a Product
//@route PUT /api/products/:id
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

//@Desc Apply a discound to a Product
//@route PATCH /api/products/:id
async function applyDiscount(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found." }));
    } else {
      const body = await getPostData(req);
      const { price } = JSON.parse(body);

      const discount = {
        price: price || product.price,
      };
      console.log("Discount amount: " + discount.price);
      const discountedProduct = await Product.adjustPrice(id, discount);
      console.log(discountedProduct);
      res.writeHead(200, { "Content-Type": "application/json" });

      res.end(
        JSON.stringify({
          message: "Discount applied successfully.",
          data: discountedProduct,
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
}

// module.exports = {
//   createProduct,
//   getProducts,
//   getProduct,
//   getProductPrice,
//   updateProduct,
//   deleteProduct,
//   applyDiscount,
// };
