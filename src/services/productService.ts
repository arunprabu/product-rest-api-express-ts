import { Req, Res } from "@src/routes/common/express-types";
import Product from "@src/models/Product";
import { validationResult } from "express-validator";

export async function getProducts(_req: Req, res: Res) {
  try {
    const products = await Product.find(); // fetch all products from the database
    res.status(200).json(products); // send the products as JSON response
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export const addProduct = async (req: Req, res: Res) => {
  // Check for validation errors from express-validator middleware
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(req.body); // form data from from postmand or front end apps

  try {
    // 2. insert product data to products collection using js
    const product = new Product(req.body); // draft product document
    await product.save();
    // 3. send back response to client
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
}

export async function getProductById(req: Req, res: Res) {
  console.log(req.params.id);

  try {
    const product = await Product.findOne({ _id: req.params.id }); // fetch product by id from the database
    res.status(200).json(product); // send the product as JSON response
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export const updateProductById = async (req: Req, res: Res) => {
  // Check for validation errors from express-validator middleware
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(req.params.id); // what product to be updated
  console.log(req.body); // updateable form data

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating products', error });
  }
}


export async function deleteProductById(req: Req, res: Res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

