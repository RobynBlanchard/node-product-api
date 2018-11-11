import express from 'express';
import ProductController from '../productsControllers/products'

const router = express.Router();

router.get('/api/v1/products', ProductController.getAllProducts);
router.post('/api/v1/products', ProductController.createProduct);
router.get('/api/v1/products/:id', ProductController.getProduct);
router.delete('/api/v1/products/:id', ProductController.deleteProduct);
router.put('/api/v1/products/:id', ProductController.updateProduct);


export default router;
