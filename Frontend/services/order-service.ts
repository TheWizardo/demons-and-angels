// order-service.ts
import { axiosApi, toApiError } from "@/lib/axios";
import config from "@/lib/config";
import type { OrderModel } from "@/models/order-model";


export const orderService = {
  /**
   * GET /orders (admin)
   */
  async getAll(): Promise<OrderModel[]> {
    try {
      const res = await axiosApi.get<OrderModel[]>(config.ordersEndpoint);
      return res.data;
    } catch (err) {
      throw toApiError(err);
    }
  },

  /**
   * GET /orders/:id
   */
  async getById(id: string): Promise<OrderModel> {
    try {
      const res = await axiosApi.get<OrderModel>(`${config.ordersEndpoint}/${encodeURIComponent(id)}`);
      return res.data;
    } catch (err) {
      throw toApiError(err);
    }
  },

  /**
   * POST /orders
   * Backend returns 201 with the created order JSON.
   */
  async create(payload: OrderModel): Promise<OrderModel> {
    try {
      const res = await axiosApi.post<OrderModel>(config.ordersEndpoint, payload);
      return res.data;
    } catch (err) {
      throw toApiError(err);
    }
  },

  /**
   * PUT /orders/:id (admin)
   */
  //   async update(
  //     id: string,
  //     order: UpdateOrderPayload,
  //   ): Promise<OrderModel> {
  //     try {

  //       const res = await axiosApi.put<OrderModel>(
  //         `${config.ordersEndpoint}/${encodeURIComponent(id)}`,
  //         order
  //       );

  //       return res.data;
  //     } catch (err) {
  //       throw toApiError(err);
  //     }
  //   },
};
