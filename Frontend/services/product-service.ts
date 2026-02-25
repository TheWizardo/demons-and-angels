// products-service.ts
import { axiosApi, toApiError } from "@/lib/axios";
import config from "@/lib/config";
import { ImageMetadata, Product } from "@/models/product-model";


export const productsService = {
  // GET /products
  async getAll(): Promise<Product[]> {
    try {
      console.log("attempting to fetch products from", config.productsEndpoint);
      const res = await axiosApi.get<Product[]>(config.productsEndpoint);
      return res.data;
    } catch (err) {
      throw toApiError(err);
    }
  },

  // GET /products/:id
  async getById(id: string): Promise<Product> {
    try {
      const res = await axiosApi.get<Product>(`${config.productsEndpoint}/${encodeURIComponent(id)}`);
      return res.data;
    } catch (err) {
      throw toApiError(err);
    }
  },

  // POST /products  (admin)
  async create(product: Product): Promise<Product> {
    try {
      const res = await axiosApi.post<Product>(config.productsEndpoint, product);
      return res.data;
    } catch (err) {
      throw toApiError(err);
    }
  },

  // PUT /products/:id  (admin)
  async update(
    id: string,
    product: Product,
  ): Promise<Product> {
    try {

      const res = await axiosApi.put<Product>(`${config.productsEndpoint}/${encodeURIComponent(id)}`, product);
      return res.data;
    } catch (err) {
      throw toApiError(err);
    }
  },

  // DELETE /products/:id  (admin)
  async remove(id: string): Promise<void> {
    try {
      await axiosApi.delete(`${config.productsEndpoint}/${encodeURIComponent(id)}`);
    } catch (err) {
      throw toApiError(err);
    }
  },

  getImageUrl(img: ImageMetadata): string {
    return `${config.backendAPI}${config.imageEndpoint}/${img._id}.${img.format}`;
  },
};
