"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionTreeSchema = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var condition_model_1 = require("./condition-model");
;
exports.ConditionTreeSchema = new mongoose_1.default.Schema({
    kind: {
        type: String,
        enum: ["leaf", "op"],
        required: true,
    },
    // leaf-only
    condition: {
        type: condition_model_1.CouponConditionsSchema,
        required: function () {
            return this.kind === "leaf";
        },
    },
    // op-only
    op: {
        type: condition_model_1.LogicOperationSchema,
        required: function () {
            return this.kind === "op";
        },
    },
}, { _id: false });
exports.ConditionTreeSchema.add({
    children: {
        type: [exports.ConditionTreeSchema],
        default: undefined,
    },
});
exports.ConditionTreeSchema.pre("validate", function (next) {
    var _a;
    var self = this;
    if (self.kind === "leaf") {
        // leaves must have exactly a condition, no op/children
        if (!self.condition)
            return next(new Error("Leaf node must have a condition"));
        if (self.op)
            return next(new Error("Leaf node must not have an op"));
        if ((_a = self.children) === null || _a === void 0 ? void 0 : _a.length)
            return next(new Error("Leaf node must not have children"));
        return next();
    }
    if (self.kind === "op") {
        if (!self.op)
            return next(new Error("Op node must have an 'op'"));
        var operator = self.op.operator;
        var condCount = Array.isArray(self.op.conditions) ? self.op.conditions.length : 0;
        var childCount = Array.isArray(self.children) ? self.children.length : 0;
        var totalOperands = condCount + childCount;
        if (operator === condition_model_1.LogicOperator.not) {
            if (totalOperands !== 1) {
                return next(new Error("NOT must have exactly one operand (either one condition OR one child)"));
            }
        }
        else if (operator === condition_model_1.LogicOperator.and || operator === condition_model_1.LogicOperator.or) {
            if (totalOperands < 2) {
                return next(new Error("AND/OR must have at least two operands (conditions + children)"));
            }
        }
        else {
            return next(new Error("Unknown logical operator"));
        }
        return next();
    }
    next(new Error("Invalid node kind"));
});
