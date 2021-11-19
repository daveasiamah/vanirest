const http = require("http");
const fs = require("fs");
const {
  createProduct,
  getProducts,
  getProduct,
  getProductPrice,
  updateProduct,
  deleteProduct,
} = require("./controllers/productController");

//TODO: create a router module
const server = http.createServer((req, res) => {
  if (req.url === "/api/products/" && req.method === "GET") {
    res.writeHead(200, "Success", { "Content-Type": "text" });
    getProducts(req, res);
  } else if (
    req.url.match(
      /\/api\/products\/([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})/
    ) &&
    req.method === "GET"
  ) {
    const id = req.url.split("/")[3];
    getProduct(req, res, id);
  } else if (
    req.url.match(
      /\/api\/products\/([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})/
    ) &&
    req.method === "PUT"
  ) {
    const id = req.url.split("/")[3];
    updateProduct(req, res, id);
  } else if (
    req.url.match(
      /\/api\/products\/([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})/
    ) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    deleteProduct(req, res, id);
  } else if (
    req.url.match(
      /\/api\/product\/price\/([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})/
    ) &&
    req.method === "GET"
  ) {
    const id = req.url.split("/")[4];
    getProductPrice(req, res, id);
  } else if (req.url.match("/api/products/") && req.method === "POST") {
    createProduct(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
