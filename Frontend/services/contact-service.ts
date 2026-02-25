// contact-service.ts
import { axiosApi, toApiError } from "@/lib/axios";
import config from "@/lib/config";
import Contact from "@/models/contact-model";


export const contactService = {
  /**
   * POST /contact
   * Backend returns 201 with no JSON body.
   */
  async send(payload: Contact): Promise<void> {
    try {
      await axiosApi.post(`${config.contactEndpoint}`, payload);
    } catch (err) {
      throw toApiError(err);
    }
  },
};
