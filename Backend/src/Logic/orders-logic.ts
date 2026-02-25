import { BadRequestError, IdNotFound } from "../Models/errors-models";
import { IOrderModel, OrderModel } from "../Models/order-model";
import mailService from "../Services/mailService";
import mongoose from "mongoose";
import { CouponType, ICouponModel } from "../Models/coupon-model";
import couponLogic from "./coupon-logic";
import productLogic from "./product-logic";

async function getAllOrders(): Promise<IOrderModel[]> {
    return await OrderModel.find();
}

async function getOrderById(id: string | mongoose.ObjectId): Promise<IOrderModel> {
    const selectedOrder = OrderModel.findById(id);
    if (!selectedOrder) throw new IdNotFound(id.toString(), "orderLogic-getById");
    return selectedOrder;
}

async function updateOrder(id: string, edits: Partial<IOrderModel>): Promise<IOrderModel> {
    const editedOrder = await OrderModel.findByIdAndUpdate(id, edits);
    return editedOrder;
}

async function newOrder(order: IOrderModel): Promise<IOrderModel> {
    const createdOrder = await OrderModel.create(order);
    mailService.sendPurchaseEmail(createdOrder);
    return createdOrder;
}

async function applyCoupon(order: IOrderModel, couponCode: string): Promise<IOrderModel> {
    const coupon = await couponLogic.isValidCouponForOrder(couponCode, order);
    order.coupon_code = couponCode;
    if (!coupon) return;
    switch (coupon.couponType) {
        case CouponType.valueDiscount:
            order.total -= (+coupon.value);
            break;
        case CouponType.percentDiscount:
            order.total *= (1 - ((+coupon.value) / 100));
            break;
        case CouponType.shippingAtPrice:
            order.shipping_cost = +coupon.value;
            break;
        case CouponType.additionalItem:
            const itemToAdd = await productLogic.getProductById(coupon.itemId);
            order.cart.push(itemToAdd);
            break;
        case CouponType.alterItem:
            let altered = false;
            for (let i = 0; i < order.cart.length; i++) {
                if (order.cart[i]._id === coupon.itemId) {
                    order.cart[i].discountedPrice = coupon.value;
                    altered = true;
                    break;
                }
            }
            if (!altered) throw new BadRequestError(`Cannot find itemId ${coupon.itemId}`, "applyCoupon-orderLogic");
            break;
    }
    return order;
}

function getCartCost(order: IOrderModel): number {
    const cart = [...order.cart].map(i => i.discountedPrice !== undefined ? i.discountedPrice : i.price);
    return cart.reduce((a, b) => a + b)
}

function isShipmentRequired(order: IOrderModel): boolean {
    const cart = [...order.cart].map(i => i.requiresShipment);
    return cart.some(v => v)
}

function validateOrder(order: IOrderModel): { isValid: boolean, reason: string } {
    if (order.cart.length < 1) {
        return { isValid: false, reason: "Cart cannot be empty" }
    }

    if (order.user_id === null && order.contact_info === null) {
        return { isValid: false, reason: "Must have contact info for none registered users" }
    }

    if (isShipmentRequired(order)) {
        if (order.user_id === null && order.address === null) {
            return { isValid: false, reason: "Order require shipping. Must contain an address" }
        }
        if (order.shipping_cost === 0 && order.coupon_code === undefined) {
            return { isValid: false, reason: "Invalid shipping cost" }
        }
    }
    else {
        if (order.shipping_cost > 0) {
            return { isValid: false, reason: "Cart does not require shipment" }
        }
    }
    
    return { isValid: true, reason: "All is good" };
}

export default {
    getAllOrders,
    getOrderById,
    updateOrder,
    newOrder,
    applyCoupon,
    validateOrder,
    getCartCost
};