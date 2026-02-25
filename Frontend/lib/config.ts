import axios from "axios";

export class Config {
    public _id = "default_config_id";

    public max_physical = 5;

    public international_phone = "+972527208555";

    public addressBaseAPI = "https://data.gov.il/api/3/action/datastore_search?resource_id";
    public citiesAPI = `${this.addressBaseAPI}=d4901968-dad3-4845-a9b0-a57d027f11ab&limit=1500`;
    public streetsAPI = `${this.addressBaseAPI}=9ad3862c-8391-4b2f-84a4-2d4c68625f4b&limit=10000`;

    public backendAPI = process.env.BACKEND_API_URL || "https://api.demonsandangels.co.il/api/v2";
    public ordersEndpoint = `/orders`;
    public productsEndpoint = `/products`;
    public authEndpoint = `/auth`;
    public contactEndpoint = `/contact`;
    public couponsEndpoint = `/coupons`;
    public configEndpoint = `/config`;
    public imageEndpoint = `/images`;

    public accessToken = "token";

    public showBanner = true;
    public banner_message = "";

    public getId() {
        return this._id;
    }

    public updateConfig(c: Config) {
        if (c && !c._id) {
            console.warn("Attempted to update config with missing ID. Ignoring update.")
            return;
        }
        if (c._id !== this._id && this._id !== "default_config_id") {
            console.warn("Attempted to update config with mismatched ID. Ignoring update.")
            return;
        }
        this._id = c._id;
        this.max_physical = c.max_physical;
        this.international_phone = c.international_phone;
        this.showBanner = c.showBanner;
        this.banner_message = c.banner_message;
    }
}
const config = new Config();

export default config;
