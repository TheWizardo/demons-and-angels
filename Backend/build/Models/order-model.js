"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDefaultObject = exports.OrderModel = exports.OrderSchema = void 0;
var product_model_1 = require("./product-model");
var mongoose_1 = __importDefault(require("mongoose"));
var customer_model_1 = require("./customer-model");
var address_model_1 = require("./address-model");
exports.OrderSchema = new mongoose_1.default.Schema({
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(), // Default to current date if not specified
    },
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "UserModel", // Reference to the User model
        required: false, // User is optional, null for guest orders
    },
    contact_info: {
        type: customer_model_1.CustomerSchema, // Embedded Customer schema
        required: function () {
            return this.user_id !== undefined;
        }, // Optional contact information
    },
    address: {
        type: address_model_1.AddressSchema, // Embedded Address schema
        required: false,
    },
    cart: [{
            type: product_model_1.ProductSchema, // Embedded Product schema,
            required: true, // Cart must contain at least one product
        }],
    total: {
        type: Number,
        required: true,
        min: [0, "Total cannot be less than 0"], // Total must be a positive number
    },
    shipping_cost: {
        type: Number,
        required: true,
        min: [0, "Shipping cannot be less than 0"], // Total must be a positive number
    },
    comments: {
        type: String,
        trim: true,
        required: false, // Optional comments
    },
    dedication_name: {
        type: String,
        trim: true,
        required: false, // Optional dedication name (e.g., gift messages)
    },
    tracking_number: {
        type: String,
        trim: true,
        required: false, // Optional tracking number
    },
    coupon_code: {
        type: String,
        trim: true,
        required: false, // Optional coupon code
    },
}, {
    versionKey: false, // Disable versioning for this model
});
exports.OrderModel = mongoose_1.default.model("OrderModel", exports.OrderSchema, "Orders");
exports.OrderDefaultObject = {
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
};
