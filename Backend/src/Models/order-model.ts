import { IProductModel, ProductSchema } from "./product-model";
import mongoose from "mongoose";
import { CustomerSchema, ICustomerModel } from "./customer-model";
import { AddressSchema, IAddressModel } from "./address-model";

export interface IOrderModel extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;

    user_id: mongoose.ObjectId | null;
    contact_info: ICustomerModel | null;
    address: IAddressModel | null;

    cart: IProductModel[];
    shipping_cost: number;
    total: number;

    comments?: string;

    dedication_name?: string;

    tracking_number?: string;

    coupon_code?: string;
}

export const OrderSchema = new mongoose.Schema<IOrderModel>({
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),  // Default to current date if not specified
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",  // Reference to the User model
        required: false,  // User is optional, null for guest orders
    },
    contact_info: {
        type: CustomerSchema,  // Embedded Customer schema
        required: function (this: IOrderModel) {
            return this.user_id !== undefined;
        },  // Optional contact information
    },
    address: {
        type: AddressSchema,  // Embedded Address schema
        required: false,
    },
    cart: [{
        type: ProductSchema,  // Embedded Product schema,
        required: true,  // Cart must contain at least one product
    }],
    total: {
        type: Number,
        required: true,
        min: [0, "Total cannot be less than 0"],  // Total must be a positive number
    },
    shipping_cost: {
        type: Number,
        required: true,
        min: [0, "Shipping cannot be less than 0"],  // Total must be a positive number
    },
    comments: {
        type: String,
        trim: true,
        required: false,  // Optional comments
    },
    dedication_name: {
        type: String,
        trim: true,
        required: false,  // Optional dedication name (e.g., gift messages)
    },
    tracking_number: {
        type: String,
        trim: true,
        required: false,  // Optional tracking number
    },
    coupon_code: {
        type: String,
        trim: true,
        required: false,  // Optional coupon code
    },
}, {
    versionKey: false,  // Disable versioning for this model
});

export const OrderModel = mongoose.model<IOrderModel>("OrderModel", OrderSchema, "Orders");


export const OrderDefaultObject = {
    _id: null,
    createdAt: null,
    user_id: null,
    contact_info: null,
    address: null,
    cart: [],
    total: null,
    comments: null,
    dedication_name: null,
    tracking_number: null,
    coupon_code: null
} as IOrderModel
