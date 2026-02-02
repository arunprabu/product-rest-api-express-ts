import { Router } from 'express';
import { getProducts, addProduct, getProductById, updateProductById, deleteProductById } from '@src/services/productService';
import { validateProductCreation, validateProductUpdate } from '@src/routes/common/productValidation';

const apiRouter = Router();
// api/v1
apiRouter.get('/', (_req, res) => {
  res.json('Welcome to API Router');
});

// api/v1/products - GET
apiRouter.get('/products', getProducts);

// api/v1/products - POST
apiRouter.post('/products', validateProductCreation(), addProduct);

// api/v1/products/:id - GET.  (id is the url parameter)
apiRouter.get('/products/:id', getProductById);

// api/v1/products/:id - PUT  (id is the url parameter)
apiRouter.put('/products/:id', validateProductUpdate(), updateProductById);

// api/v1/products/:id - DELETE  (id is the url parameter)
apiRouter.delete('/products/:id', deleteProductById);

export default apiRouter;
