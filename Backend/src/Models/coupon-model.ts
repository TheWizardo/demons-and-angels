import mongoose from "mongoose";
import { ConditionTreeSchema, IConditionTree } from "./conditionTree-model";

export enum CouponType {
  percentDiscount = "percentDiscount",
  valueDiscount = "valueDiscount",
  additionalItem = "additionalItem",
  alterItem = "alterItem",
  shippingAtPrice = "shippingAtPrice"
}

export interface ICouponModel extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  couponType: CouponType;
  code: string;
  checksum: string;
  value: number;
  conditions: IConditionTree;
  endBy: Date;
  itemId: mongoose.Types.ObjectId | null;
}

const CouponSchema = new mongoose.Schema<ICouponModel>({
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
    type: ConditionTreeSchema, // Adjust to match your real shape
    required: true
  },
  endBy: {
    type: Date,
    required: true
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductModel",
    required: function (this: ICouponModel) {
      return this.couponType === CouponType.additionalItem || this.couponType === CouponType.alterItem;
    },
  },
}, {

});


export const CouponModel = mongoose.model<ICouponModel>("Coupon", CouponSchema, "Coupons");