var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "eu-west-2",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing products into DynamoDB. Please wait.");

var allProducts = JSON.parse(fs.readFileSync('productdata.json', 'utf8'));
allProducts.forEach(function(product) {
    var params = {
        TableName: "Products",
        Item: {
            "description":  product.description,
            "title": product.title,
            "info":  product.info
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add product", product.title, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", product.title);
       }
    });
});