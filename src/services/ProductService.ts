import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { RouteError } from '@src/common/utils/route-errors';
import { IProduct } from '@src/models/Product.model';
import ProductRepo from '@src/repos/ProductRepo';

/******************************************************************************
                                Constants
******************************************************************************/

const Errors = {
  PRODUCT_NOT_FOUND: 'Product not found',
  INVALID_PRODUCT_ID: 'Invalid product ID',
  INSUFFICIENT_STOCK: 'Insufficient stock',
} as const;

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Get all products.
 */
function getAll(): Promise<IProduct[]> {
  return ProductRepo.getAll();
}

/**
 * Get one product by ID.
 */
async function getOne(id: string): Promise<IProduct> {
  const product = await ProductRepo.getOne(id);
  if (!product) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      Errors.PRODUCT_NOT_FOUND,
    );
  }
  return product;
}

/**
 * Get products by category.
 */
function getByCategory(category: string): Promise<IProduct[]> {
  return ProductRepo.getByCategory(category);
}

/**
 * Search products by name.
 */
function searchByName(searchTerm: string): Promise<IProduct[]> {
  return ProductRepo.searchByName(searchTerm);
}

/**
 * Get products within a price range.
 */
function getByPriceRange(minPrice: number, maxPrice: number): Promise<IProduct[]> {
  return ProductRepo.getByPriceRange(minPrice, maxPrice);
}

/**
 * Add one product.
 */
async function addOne(product: Omit<IProduct, 'id' | 'created'>): Promise<IProduct> {
  // Validate price is positive
  if (product.price < 0) {
    throw new RouteError(
      HttpStatusCodes.BAD_REQUEST,
      'Price cannot be negative',
    );
  }

  // Validate stock is non-negative
  if (product.stock < 0) {
    throw new RouteError(
      HttpStatusCodes.BAD_REQUEST,
      'Stock cannot be negative',
    );
  }

  return ProductRepo.add(product);
}

/**
 * Update one product.
 */
async function updateOne(product: IProduct): Promise<void> {
  const persists = await ProductRepo.persists(product.id.toString());
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      Errors.PRODUCT_NOT_FOUND,
    );
  }

  // Validate price is positive
  if (product.price < 0) {
    throw new RouteError(
      HttpStatusCodes.BAD_REQUEST,
      'Price cannot be negative',
    );
  }

  // Validate stock is non-negative
  if (product.stock < 0) {
    throw new RouteError(
      HttpStatusCodes.BAD_REQUEST,
      'Stock cannot be negative',
    );
  }

  return ProductRepo.update(product);
}

/**
 * Update product stock.
 */
async function updateStock(id: string, quantity: number): Promise<void> {
  const persists = await ProductRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      Errors.PRODUCT_NOT_FOUND,
    );
  }

  // Check if stock would become negative
  const product = await ProductRepo.getOne(id);
  if (product && product.stock + quantity < 0) {
    throw new RouteError(
      HttpStatusCodes.BAD_REQUEST,
      Errors.INSUFFICIENT_STOCK,
    );
  }

  return ProductRepo.updateStock(id, quantity);
}

/**
 * Delete a product by ID.
 */
async function deleteOne(id: string): Promise<void> {
  const persists = await ProductRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      Errors.PRODUCT_NOT_FOUND,
    );
  }
  return ProductRepo.delete(id);
}

/**
 * Get products with low stock.
 */
function getLowStockProducts(threshold?: number): Promise<IProduct[]> {
  return ProductRepo.getLowStockProducts(threshold);
}

/**
 * Get product count by category.
 */
function countByCategory(): Promise<Record<string, number>> {
  return ProductRepo.countByCategory();
}

/******************************************************************************
                            Export default
******************************************************************************/

export default {
  getAll,
  getOne,
  getByCategory,
  searchByName,
  getByPriceRange,
  addOne,
  updateOne,
  updateStock,
  deleteOne,
  getLowStockProducts,
  countByCategory,
} as const;
