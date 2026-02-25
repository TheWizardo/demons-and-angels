import mongoose from "mongoose";
import { UploadedFile } from "express-fileupload";
import { IProductModel, ProductModel } from "../Models/product-model";
import config from "../Utils/config";
import imagesLogic from "./images-logic";


async function getAllProducts(): Promise<IProductModel[]> {
  return await ProductModel.find();
}

async function getProductById(productId: string | mongoose.Types.ObjectId): Promise<IProductModel> {
  return await ProductModel.findById(productId);
}

async function getShipment(): Promise<IProductModel> {
  return await ProductModel.findOne({ nameEn: "Shipment" });
}

async function deleteProduct(productId: string | mongoose.Types.ObjectId): Promise<void> {
  const id = typeof productId === "string" ? new mongoose.Types.ObjectId(productId) : productId;

  const product = await ProductModel.findById(id);
  if (!product) return;

  for (const imgMeta of product.images) {
    await imagesLogic.safeDelete(`${config.imagesFolder}/${imagesLogic.getNameFromMeta(imgMeta)}`);
  }

  // then delete doc
  await ProductModel.findByIdAndDelete(id);
}

async function updateProduct(
  productId: string,
  productEdits: Partial<IProductModel> & { raw_images?: UploadedFile[] | UploadedFile }
): Promise<IProductModel> {
  const id = new mongoose.Types.ObjectId(productId);

  // separate out raw_images from fields we actually want in Mongo
  const { raw_images, ...mongoEdits } = productEdits as any;

  const updatedProduct = await ProductModel.findByIdAndUpdate(id, mongoEdits, { new: true });
  if (!updatedProduct) return null;

  return await ProductModel.findById(updatedProduct._id);
}

async function addProduct(
  product: Omit<IProductModel, "_id"> & { raw_images?: UploadedFile[] | UploadedFile }
): Promise<IProductModel> {
  const { raw_images, ...mongoProduct } = product as any;

  const addedProduct = await ProductModel.create(mongoProduct);

  return await ProductModel.findById(addedProduct._id);
}

async function addImage(productId: string, image: UploadedFile): Promise<void> {
  const id = new mongoose.Types.ObjectId(productId);
  await imagesLogic.addImage(image, productId);
  await ProductModel.findByIdAndUpdate(id, { $push: { images: { filename: image.name, format: image.mimetype.split("/")[1] } } });
}

export default {
  getAllProducts,
  deleteProduct,
  getProductById,
  getShipment,
  updateProduct,
  addProduct,
};
