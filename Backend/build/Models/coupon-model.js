"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponModel = exports.CouponType = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var conditionTree_model_1 = require("./conditionTree-model");
var CouponType;
(function (CouponType) {
    CouponType["percentDiscount"] = "percentDiscount";
    CouponType["valueDiscount"] = "valueDiscount";
    CouponType["additionalItem"] = "additionalItem";
    CouponType["alterItem"] = "alterItem";
    CouponType["shippingAtPrice"] = "shippingAtPrice";
})(CouponType || (exports.CouponType = CouponType = {}));
var CouponSchema = new mongoose_1.default.Schema({
    couponType: {
        type: String,
        enum: Object.values(CouponType),
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    checksum: {
        type: String,
        required: true,
        unique: true,
        omit: true
    },
    value: {
        type: Number,
        required: true,
    },
    conditions: {
        type: conditionTree_model_1.ConditionTreeSchema, // Adjust to match your real shape
        required: true
    },
    endBy: {
        type: Date,
        required: true
    },
    itemId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "ProductModel",
        required: function () {
            return this.couponType === CouponType.additionalItem || this.couponType === CouponType.alterItem;
        },
    },
}, {});
exports.CouponModel = mongoose_1.default.model("Coupon", CouponSchema, "Coupons");
