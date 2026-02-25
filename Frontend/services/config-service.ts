// contact-service.ts
import { axiosApi, toApiError } from "@/lib/axios";
import config, { Config } from "@/lib/config";


export const configService = {
  /**
   * POST /config
   * Backend returns 201 with no JSON body.
   */
  async postConfig(payload: Partial<Config>): Promise<void> {
    try {
      const identifiedPayload = { ...config, ...payload, _id: config.getId() }
      await axiosApi.put(`${config.configEndpoint}`, identifiedPayload);
    } catch (err) {
      throw toApiError(err);
    }
  },
  async fetchConfig(): Promise<Config> {
    try {
      const res = await axiosApi.get(`${config.configEndpoint}`);
      if (res.status === 200 && res.data) {
        config.updateConfig(res.data);
        return res.data;
      }
      throw new Error("Failed to fetch config");
    } catch (err) {
      throw toApiError(err);
    }
  },
};
