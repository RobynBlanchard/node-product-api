import db from '../db/db';

class ProductsController {
    getAllProducts(req, res) {
        res.status(200).send({
            success: 'true',
            message: 'products retrieved successfully',
            products: db
        })
    };

    getProduct(req, res) {
        const id = parseInt(req.params.id, 10);
        db.map((product) => {
        if (product.id === id) {
            return res.status(200).send({
            success: 'true',
            message: 'product retrieved successfully',
            product,
            });
        }
        });
        return res.status(404).send({
        success: 'false',
        message: 'product does not exist',
        });
    };

    createProduct(req, res) {
        if (!req.body.title) {
            return res.status(400).send({
              success: 'false',
              message: 'title is required'
            });
        } else if(!req.body.description) {
        return res.status(400).send({
            success: 'false',
            message: 'description is required'
        });
        } else if(!req.body.price) {
        return res.status(400).send({
            success: 'false',
            message: 'price is required'
        });
        };
        const product = {
            id: db.length + 1,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        };
        db.push(product);
        return res.status(200).send({
            success: 'true',
            message: 'Product added successfully',
            product
        })
    };

    updateProduct(req, res) {
        const id = parseInt(req.params.id, 10);

        let productFound;
        let productIndex;

        db.map((product, index) => {
            if (product.id === id) {
                productFound = product;
                productIndex = index;
            }
        });

        if (!productFound) {
            return res.status(404).send({
                success: 'false',
                message: 'Product not found',
            });
        }

        const updatedProduct = {
            id: productFound.id,
            title: req.body.title || productFound.title,
            description: req.body.description || productFound.description,
            price: req.body.price || productFound.price
        };

        db.splice(productIndex, 1, updatedProduct);

        return res.status(200).send({
            success: 'true',
            message: 'Product updated successfuly',
            updatedProduct
        });
    };

    deleteProduct(req, res) {
        const id = parseInt(req.params.id, 10);

        db.map((product, index) => {
            if (product.id === id) {
                db.splice(index, 1);
                return res.status(200).send({
                    success: 'true',
                    message: 'Product deleted successfuly',
                });
            }
            return res.status(404).send({
                success: 'false',
                message: 'Product not found',
            });
        });
    };
}

const productController = new ProductsController();
export default productController;