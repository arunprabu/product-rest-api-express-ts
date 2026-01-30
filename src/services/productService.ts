import { Req, Res } from "@src/routes/common/express-types";

export function getProducts(_req: Req, res: Res) {
  res.json('will get products from db -- from Separate service');
}

export function addProduct(_req: Req, res: Res) {
  res.json('will implement adding service -- from Separate service');
}

export function getProductById(_req: Req, res: Res) {
  res.json('will get product by id');
}

export function updateProductById(_req: Req, res: Res) {
  res.json('will update product by id');
}

export function deleteProductById(_req: Req, res: Res) {
  res.json('will delete product by id');
}

