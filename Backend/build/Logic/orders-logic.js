"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_models_1 = require("../Models/errors-models");
var order_model_1 = require("../Models/order-model");
var mailService_1 = __importDefault(require("../Services/mailService"));
var coupon_model_1 = require("../Models/coupon-model");
var coupon_logic_1 = __importDefault(require("./coupon-logic"));
var product_logic_1 = __importDefault(require("./product-logic"));
function getAllOrders() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order_model_1.OrderModel.find()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getOrderById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var selectedOrder;
        return __generator(this, function (_a) {
            selectedOrder = order_model_1.OrderModel.findById(id);
            if (!selectedOrder)
                throw new errors_models_1.IdNotFound(id.toString(), "orderLogic-getById");
            return [2 /*return*/, selectedOrder];
        });
    });
}
function updateOrder(id, edits) {
    return __awaiter(this, void 0, void 0, function () {
        var editedOrder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order_model_1.OrderModel.findByIdAndUpdate(id, edits)];
                case 1:
                    editedOrder = _a.sent();
                    return [2 /*return*/, editedOrder];
            }
        });
    });
}
function newOrder(order) {
    return __awaiter(this, void 0, void 0, function () {
        var createdOrder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, order_model_1.OrderModel.create(order)];
                case 1:
                    createdOrder = _a.sent();
                    mailService_1.default.sendPurchaseEmail(createdOrder);
                    return [2 /*return*/, createdOrder];
            }
        });
    });
}
function applyCoupon(order, couponCode) {
    return __awaiter(this, void 0, void 0, function () {
        var coupon, _a, itemToAdd, altered, i;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, coupon_logic_1.default.isValidCouponForOrder(couponCode, order)];
                case 1:
                    coupon = _b.sent();
                    order.coupon_code = couponCode;
                    if (!coupon)
                        return [2 /*return*/];
                    _a = coupon.couponType;
                    switch (_a) {
                        case coupon_model_1.CouponType.valueDiscount: return [3 /*break*/, 2];
                        case coupon_model_1.CouponType.percentDiscount: return [3 /*break*/, 3];
                        case coupon_model_1.CouponType.shippingAtPrice: return [3 /*break*/, 4];
                        case coupon_model_1.CouponType.additionalItem: return [3 /*break*/, 5];
                        case coupon_model_1.CouponType.alterItem: return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 8];
                case 2:
                    order.total -= (+coupon.value);
                    return [3 /*break*/, 8];
                case 3:
                    order.total *= (1 - ((+coupon.value) / 100));
                    return [3 /*break*/, 8];
                case 4:
                    order.shipping_cost = +coupon.value;
                    return [3 /*break*/, 8];
                case 5: return [4 /*yield*/, product_logic_1.default.getProductById(coupon.itemId)];
                case 6:
                    itemToAdd = _b.sent();
                    order.cart.push(itemToAdd);
                    return [3 /*break*/, 8];
                case 7:
                    altered = false;
                    for (i = 0; i < order.cart.length; i++) {
                        if (order.cart[i]._id === coupon.itemId) {
                            order.cart[i].discountedPrice = coupon.value;
                            altered = true;
                            break;
                        }
                    }
                    if (!altered)
                        throw new errors_models_1.BadRequestError("Cannot find itemId ".concat(coupon.itemId), "applyCoupon-orderLogic");
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/, order];
            }
        });
    });
}
function getCartCost(order) {
    var cart = __spreadArray([], order.cart, true).map(function (i) { return i.discountedPrice !== undefined ? i.discountedPrice : i.price; });
    return cart.reduce(function (a, b) { return a + b; });
}
function isShipmentRequired(order) {
    var cart = __spreadArray([], order.cart, true).map(function (i) { return i.requiresShipment; });
    return cart.some(function (v) { return v; });
}
function validateOrder(order) {
    if (order.cart.length < 1) {
        return { isValid: false, reason: "Cart cannot be empty" };
    }
    if (order.user_id === null && order.contact_info === null) {
        return { isValid: false, reason: "Must have contact info for none registered users" };
    }
    if (isShipmentRequired(order)) {
        if (order.user_id === null && order.address === null) {
            return { isValid: false, reason: "Order require shipping. Must contain an address" };
        }
        if (order.shipping_cost === 0 && order.coupon_code === undefined) {
            return { isValid: false, reason: "Invalid shipping cost" };
        }
    }
    else {
        if (order.shipping_cost > 0) {
            return { isValid: false, reason: "Cart does not require shipment" };
        }
    }
    return { isValid: true, reason: "All is good" };
}
exports.default = {
    getAllOrders: getAllOrders,
    getOrderById: getOrderById,
    updateOrder: updateOrder,
    newOrder: newOrder,
    applyCoupon: applyCoupon,
    validateOrder: validateOrder,
    getCartCost: getCartCost
};
