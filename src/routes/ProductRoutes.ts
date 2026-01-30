import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { IProduct } from '@src/models/Product.model';
import ProductService from '@src/services/ProductService';

import { Req, Res } from './common/express-types';

/**
 * Get all products.
 *
 * @route GET /api/v1/products
 */
async function getAll(req: Req, res: Res) {
  const { category, search, minPrice, maxPrice } = req.query;

  try {
    let products;

    if (category && typeof category === 'string') {
      products = await ProductService.getByCategory(category);
    } else if (search && typeof search === 'string') {
      products = await ProductService.searchByName(search);
    } else if (minPrice && maxPrice) {
      const min = parseFloat(minPrice as string);
      const max = parseFloat(maxPrice as string);
      products = await ProductService.getByPriceRange(min, max);
    } else {
      products = await ProductService.getAll();
    }

    res.status(HttpStatusCodes.OK).json(products);
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Failed to retrieve products',
    });
  }
}

/**
 * Add one product.
 *
 * @route POST /api/v1/products
 */
async function add(req: Req, res: Res) {
  try {
    const product = await ProductService.addOne(req.body as Omit<IProduct, 'id' | 'created'>);
    res.status(HttpStatusCodes.CREATED).json(product);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create product';
    res.status(HttpStatusCodes.BAD_REQUEST).json({ error: message });
  }
}

/**
 * Get one product.
 *
 * @route GET /api/v1/products/:id
 */
async function getById(req: Req, res: Res) {
  try {
    const product = await ProductService.getOne(req.params.id);
    res.status(HttpStatusCodes.OK).json(product);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Product not found';
    res.status(HttpStatusCodes.NOT_FOUND).json({ error: message });
  }
}

/**
 * Update one product.
 *
 * @route PUT /api/v1/products/:id
 */
async function update(req: Req, res: Res) {
  try {
    const product = { ...req.body, id: req.params.id } as IProduct;
    await ProductService.updateOne(product);
    res.status(HttpStatusCodes.OK).json({ message: 'Product updated successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update product';
    res.status(HttpStatusCodes.BAD_REQUEST).json({ error: message });
  }
}

/**
 * Delete one product.
 *
 * @route DELETE /api/v1/products/:id
 */
async function delete_(req: Req, res: Res) {
  try {
    await ProductService.deleteOne(req.params.id);
    res.status(HttpStatusCodes.OK).json({ message: 'Product deleted successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete product';
    res.status(HttpStatusCodes.NOT_FOUND).json({ error: message });
  }
}

/**
 * Get low stock products.
 *
 * @route GET /api/v1/products/stock/low
 */
async function getLowStock(req: Req, res: Res) {
  try {
    const threshold = req.query.threshold
      ? parseInt(req.query.threshold as string, 10)
      : undefined;
    const products = await ProductService.getLowStockProducts(threshold);
    res.status(HttpStatusCodes.OK).json(products);
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Failed to retrieve low stock products',
    });
  }
}

/**
 * Get product count by category.
 *
 * @route GET /api/v1/products/stats/category-count
 */
async function getCategoryCount(_: Req, res: Res) {
  try {
    const stats = await ProductService.countByCategory();
    res.status(HttpStatusCodes.OK).json(stats);
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Failed to retrieve category statistics',
    });
  }
}

export default {
  getAll,
  add,
  getById,
  update,
  delete: delete_,
  getLowStock,
  getCategoryCount,
} as const;
