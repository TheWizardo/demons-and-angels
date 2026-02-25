"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = exports.ProductSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var ImageMetadataSchema = new mongoose_1.default.Schema({
    _id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    format: {
        type: String,
        required: [true, "Image format is required"],
        minlength: [2, "Image format is too short"],
        maxlength: [10, "Image format is too long"],
        lowercase: true,
        trim: true,
    },
    width: {
        type: Number,
        required: [true, "Image width is required"],
        min: [1, "Image width must be at least 1"],
    },
    height: {
        type: Number,
        required: [true, "Image height is required"],
        min: [1, "Image height must be at least 1"],
    },
    isPrimary: {
        type: Boolean,
        required: [true, "Must specify if image is primary"],
        default: false,
    },
}, {
    _id: false, // we define _id ourselves in the schema above
    versionKey: false,
});
exports.ProductSchema = new mongoose_1.default.Schema({
    isActive: {
        type: Boolean,
        required: [true, "Must specify if product is active"],
    },
    nameEn: {
        type: String,
        minlength: [3, "Product English name needs to be at least 3 chars long"],
        maxlength: [25, "Product English name needs to be at most 25 chars long"],
        required: [true, "Product must have an English name"],
        trim: true,
    },
    nameHe: {
        type: String,
        minlength: [3, "Product Hebrew name needs to be at least 3 chars long"],
        maxlength: [25, "Product Hebrew name needs to be at most 25 chars long"],
        required: [true, "Product must have a Hebrew name"],
        trim: true,
    },
    requiresShipment: {
        type: Boolean,
        required: [true, "Product must be labeled whether shipment is required"],
    },
    price: {
        type: Number,
        min: [0, "Price cannot be negative"],
        required: [true, "Product must have a price"],
    },
    // replace imageUrl with images[]
    images: {
        type: [ImageMetadataSchema],
        default: [],
        validate: {
            validator: function (imgs) {
                if (!imgs || imgs.length === 0)
                    return true;
                var primaryCount = imgs.filter(function (i) { return i.isPrimary; }).length;
                return primaryCount <= 1;
            },
            message: "Only one image can be marked as primary",
        },
    },
    discountedPrice: {
        type: Number,
        required: false,
        validate: {
            validator: function (value) {
                if (value !== undefined) {
                    return value >= 0 && value <= this.price;
                }
                return true;
            },
            message: "Discounted price must be between 0 and the regular price",
        },
    },
}, {
    versionKey: false,
});
exports.ProductModel = mongoose_1.default.model("ProductModel", exports.ProductSchema, "Products");
