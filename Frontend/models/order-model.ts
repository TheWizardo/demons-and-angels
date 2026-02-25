import { Product } from "./product-model";
import { Customer } from "./customer-model";
import { Address } from "./address-model";

export interface OrderModel {
    _id: string;
    createdAt: Date;

    user_id: string | null;
    contact_info: Customer | null;
    address: Address | null;

    cart: Product[];
    shipping_cost: number;
    total: number;

    comments?: string;

    dedication_name?: string;

    tracking_number?: string;

    coupon_code?: string;
}