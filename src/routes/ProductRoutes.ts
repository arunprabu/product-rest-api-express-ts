import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { Req, Res } from './common/express-types';

/**
 * Get all products.
 *
 * @route GET /api/v1/products
 */
async function getAll(_: Req, res: Res) {
  console.log("Listing All Products");
  res.status(HttpStatusCodes.OK).json([]);
}

/**
 * Add one product.
 *
 * @route POST /api/v1/products
 */
async function add(req: Req, res: Res) {
  res.status(HttpStatusCodes.CREATED).json({ status: "Product Added" });
}

/**
 * Get one product.
 *
 * @route GET /api/v1/products/:id
*/
async function getById(req: Req, res: Res) {
  res.status(HttpStatusCodes.OK).json({});
}

/**
 * Update one product.
 *
 * @route PUT /api/v1/products/:id
 */
async function update(req: Req, res: Res) {
  res.status(HttpStatusCodes.OK).json({ status: "Product Updated" });
}

/**
 * Delete one product.
 *
 * @route DELETE /api/v1/products/:id
 */
async function delete_(req: Req, res: Res) {
  res.status(HttpStatusCodes.OK).json({ status: "Product Deleted" });
}

export default {
  getAll,
  add,
  getById,
  update,
  delete: delete_,
} as const;
