import { IProduct, ProductModel } from '@src/models/Product.model';

/******************************************************************************
                                Helpers
******************************************************************************/

/**
 * Convert MongoDB document to IProduct
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toProduct(doc: any): IProduct {
  return {
    id: doc._id.toString(),
    name: doc.name,
    description: doc.description,
    price: doc.price,
    category: doc.category,
    stock: doc.stock,
    imageUrl: doc.imageUrl,
    created: doc.createdAt || doc.created,
  };
}

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Get one product by ID.
 */
async function getOne(id: string): Promise<IProduct | null> {
  const doc = await ProductModel.findById(id).lean().exec();
  return doc ? toProduct(doc) : null;
}

/**
 * See if a product with the given id exists.
 */
async function persists(id: string): Promise<boolean> {
  const count = await ProductModel.countDocuments({ _id: id }).exec();
  return count > 0;
}

/**
 * Get all products.
 */
async function getAll(): Promise<IProduct[]> {
  const docs = await ProductModel.find().lean().exec();
  return docs.map(toProduct);
}

/**
 * Get products by category.
 */
async function getByCategory(category: string): Promise<IProduct[]> {
  const docs = await ProductModel.find({ category }).lean().exec();
  return docs.map(toProduct);
}

/**
 * Search products by name (case-insensitive).
 */
async function searchByName(searchTerm: string): Promise<IProduct[]> {
  const docs = await ProductModel.find({
    name: { $regex: searchTerm, $options: 'i' },
  })
    .lean()
    .exec();
  return docs.map(toProduct);
}

/**
 * Get products within a price range.
 */
async function getByPriceRange(
  minPrice: number,
  maxPrice: number,
): Promise<IProduct[]> {
  const docs = await ProductModel.find({
    price: { $gte: minPrice, $lte: maxPrice },
  })
    .lean()
    .exec();
  return docs.map(toProduct);
}

/**
 * Add one product.
 */
async function add(product: Omit<IProduct, 'id' | 'created'>): Promise<IProduct> {
  const newProduct = new ProductModel(product);
  const savedProduct = await newProduct.save();
  return toProduct(savedProduct.toObject());
}

/**
 * Update one product.
 */
async function update(product: IProduct): Promise<void> {
  await ProductModel.findByIdAndUpdate(product.id, product, {
    new: true,
    runValidators: true,
  }).exec();
}

/**
 * Update product stock.
 */
async function updateStock(id: string, quantity: number): Promise<void> {
  await ProductModel.findByIdAndUpdate(
    id,
    { $inc: { stock: quantity } },
    { new: true, runValidators: true },
  ).exec();
}

/**
 * Delete one product.
 */
async function delete_(id: string): Promise<void> {
  await ProductModel.findByIdAndDelete(id).exec();
}

/**
 * Get products with low stock (below threshold).
 */
async function getLowStockProducts(threshold = 10): Promise<IProduct[]> {
  const docs = await ProductModel.find({ stock: { $lt: threshold } })
    .lean()
    .exec();
  return docs.map(toProduct);
}

/**
 * Count products by category.
 */
async function countByCategory(): Promise<Record<string, number>> {
  const result = await ProductModel.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
  ]);

  return result.reduce(
    (acc, item) => {
      acc[item._id] = item.count;
      return acc;
    },
    {} as Record<string, number>,
  );
}

/******************************************************************************
                            Export default
******************************************************************************/

export default {
  getOne,
  persists,
  getAll,
  getByCategory,
  searchByName,
  getByPriceRange,
  add,
  update,
  updateStock,
  delete: delete_,
  getLowStockProducts,
  countByCategory,
} as const;
