"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogicOperationSchema = exports.CouponConditionsSchema = exports.LogicOperator = exports.Condition = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var order_model_1 = require("./order-model");
var Condition;
(function (Condition) {
    Condition["is"] = "is";
    Condition["greaterThan"] = "gt";
    Condition["greaterOrEqualTo"] = "gte";
    Condition["includes"] = "inc";
})(Condition || (exports.Condition = Condition = {}));
var LogicOperator;
(function (LogicOperator) {
    LogicOperator["and"] = "&&";
    LogicOperator["or"] = "||";
    LogicOperator["not"] = "!!";
})(LogicOperator || (exports.LogicOperator = LogicOperator = {}));
exports.CouponConditionsSchema = new mongoose_1.default.Schema({
    field: {
        type: String,
        required: true,
        enum: {
            values: Object.keys(order_model_1.OrderDefaultObject),
            message: "field must be a key of IOrderModel",
        },
    },
    condition: {
        type: String,
        required: true,
        enum: {
            values: Object.values(Condition),
            message: "condition must be one of the allowed Condition values",
        },
    },
    value: {
        // Since this can vary by chosen `field`, use Mixed (or tighten if you can)
        type: mongoose_1.default.Schema.Types.Mixed,
        required: true,
    },
});
exports.LogicOperationSchema = new mongoose_1.default.Schema({
    operator: {
        type: String,
        required: true,
        enum: {
            values: Object.keys(LogicOperator),
            message: "Invalid operator",
        }
    },
    conditions: {
        required: true,
        type: [exports.CouponConditionsSchema]
    },
});
