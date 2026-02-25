import { ForbiddenError, IdNotFound, UnauthorizedError, ValidationError } from "../Models/errors-models";
import { CouponModel, ICouponModel } from "../Models/coupon-model";
import encryptionService from "../Services/encryptionService";
import { IOrderModel } from "../Models/order-model";
import conditionService from "../Services/conditionService";
import mongoose from "mongoose";

async function getAllCoupons(): Promise<ICouponModel[]> {
    const coupons: ICouponModel[] = await CouponModel.find();
    return coupons;
}

async function getCouponByCode(code: string): Promise<ICouponModel> {
    const hashedCode = encryptionService.sha256(code);
    return await CouponModel.findOne({ checksum: hashedCode });
}

async function deleteCoupon(couponId: string | mongoose.Types.ObjectId): Promise<void> {
    try {
        await CouponModel.findByIdAndDelete(couponId);
    }
    catch {
        throw new IdNotFound(couponId.toString(), "CouponLogic-deleteCoupon");
    }
    return;
}

async function updateCoupon(couponId: string, couponEdits: Partial<ICouponModel>): Promise<ICouponModel> {
    const updatedCoupon = await CouponModel.findByIdAndUpdate(couponId, couponEdits);
    return updatedCoupon;
}

async function addCoupon(coupon: ICouponModel): Promise<ICouponModel> {
    coupon.checksum = encryptionService.sha256(coupon.code);
    coupon.code = encryptionService.rsaEncrypt(coupon.code);
    const addedCoupon = CouponModel.create(coupon);
    return addedCoupon;
}

async function isValidCouponForOrder(coupon_code: string, order: IOrderModel): Promise<ICouponModel | null> {
    const coupon = await getCouponByCode(coupon_code);
    const evalRes = conditionService.evalTree(order, coupon.conditions);
    if (!evalRes.success) {
        throw new UnauthorizedError("Coupon cannot be processed: " + evalRes.error, "CouponLogic-isValidCouponForOrder")
    }
    return coupon;
}


export default {
    getAllCoupons,
    getCouponByCode,
    deleteCoupon,
    updateCoupon,
    addCoupon,
    isValidCouponForOrder
};