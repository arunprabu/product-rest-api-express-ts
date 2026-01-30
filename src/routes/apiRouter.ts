import { Router } from 'express';
import { getProducts, addProduct, getProductById, updateProductById, deleteProductById } from '@src/services/productService';

const apiRouter = Router();
// api/v1
apiRouter.get('/', (_req, res) => {
  res.json('Welcome to API Router');
});

// api/v1/products - GET
apiRouter.get('/products', getProducts);

// api/v1/products - POST
apiRouter.post('/products', addProduct);

// api/v1/products/:id
apiRouter.get('/products/:id', getProductById);

// api/v1/products/:id
apiRouter.put('/products/:id', updateProductById);

// api/v1/products/:id
apiRouter.delete('/products/:id', deleteProductById);

export default apiRouter;
