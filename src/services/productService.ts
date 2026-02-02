import { Req, Res } from "@src/routes/common/express-types";
import Product from "@src/models/Product";

export async function getProducts(_req: Req, res: Res) {
  try {
    const products = await Product.find(); // fetch all products from the database
    res.status(200).json(products); // send the products as JSON response
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export async function addProduct(req: Req, res: Res) {
  console.log("Inside Service");
  // let's receive the form data from rest api client / front end app
  console.log(req.body);
  // TODO:  validate the form data using jet-validators

  try {
    const product = new Product(req.body); // document draft created
    await product.save(); // saving the document to the database
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
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

export async function updateProductById(req: Req, res: Res) {
  console.log(req.params.id); // what id to be updated
  console.log(req.body); // updateable form data
  // req.params.id is typecast to objectId (_id)

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: "Sorry! some error occurred while updating the product! try again later" });
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

