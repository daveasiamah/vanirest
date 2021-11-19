# VaniREST
Vanilla NodeJS REST API featuring RamdaJS

# To get Started:
1. Clone the repository
2. cd into the directory vanirest
3. Run npm install
4. Start the application with either "nodemon server.js" for dev environment or 
"npm start" for production.
5. Use a REST Client such as Postman or Insomnia to perform CRUD operations as follows:
 a. To create a product, send a POST request to "http://localhost:5000/api/products/" with body as eg: 
{
 "name": "Iphone 12 Pro Max",
 "description": "512gb SSD, 6gb RAM.",
 "price": 1279.99
}

b. To get all products, send a GET request to "http://localhost:5000/api/products/"

c. To get a single product by id, send a GET request to "http://localhost:5000/api/products/:id" passing the id 

d. To update a product, send a PUT request to "http://localhost:5000/api/products/:id" with the body as eg: 
   {
 "name": "Iphone 12 Pro",
 "price": 1279.99
}

e. To delete a product, send a DELETE request to "http://localhost:5000/api/products/:id"

f. To get a product's name and price only, send a GET request to http://localhost:5000/api/product/price/:id 
("Trying out Ramda.js, R.project(["name","price"]) ")
