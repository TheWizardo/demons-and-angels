"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var condition_model_1 = require("../Models/condition-model");
var ConditionService = /** @class */ (function () {
    function ConditionService() {
    }
    ConditionService.prototype.evalCondition = function (order, c) {
        var actual = order[c.field];
        try {
            switch (c.condition) {
                case condition_model_1.Condition.is:
                    return { success: true, value: actual === c.value };
                case condition_model_1.Condition.greaterThan:
                    return { success: true, value: Number(actual) > Number(c.value) };
                case condition_model_1.Condition.greaterOrEqualTo:
                    return { success: true, value: Number(actual) >= Number(c.value) };
                case condition_model_1.Condition.includes:
                    if (Array.isArray(actual)) {
                        return { success: true, value: actual.includes(c.value) };
                    }
                    if (typeof actual === "string") {
                        return { success: true, value: actual.toLowerCase().includes(String(c.value).toLowerCase()) };
                    }
                    return {
                        success: false,
                        error: "Field \"".concat(c.field, "\" is not array/string for includes check"),
                    };
                default:
                    return { success: false, error: "Unknown condition type: ".concat(c.condition) };
            }
        }
        catch (err) {
            return { success: false, error: "Condition evaluation failed: ".concat(err.message) };
        }
    };
    ConditionService.prototype.evalTree = function (order, node) {
        var _this = this;
        try {
            if (node.kind === "leaf") {
                if (!node.condition) {
                    return { success: false, error: "Leaf node missing condition" };
                }
                return this.evalCondition(order, node.condition);
            }
            if (!node.op) {
                return { success: false, error: "Op node missing 'op' definition" };
            }
            var operator = node.op.operator;
            // Evaluate conditions
            var localResults = (node.op.conditions || []).map(function (c) {
                return _this.evalCondition(order, c);
            });
            for (var _i = 0, localResults_1 = localResults; _i < localResults_1.length; _i++) {
                var r = localResults_1[_i];
                if (!r.success)
                    return r;
            }
            // Evaluate children
            var childResults = (node.children || []).map(function (ch) {
                return _this.evalTree(order, ch);
            });
            for (var _a = 0, childResults_1 = childResults; _a < childResults_1.length; _a++) {
                var r = childResults_1[_a];
                if (!r.success)
                    return r;
            }
            // Combine booleans
            var operands = __spreadArray(__spreadArray([], localResults, true), childResults, true).map(function (r) { return r.value; });
            if (operator === condition_model_1.LogicOperator.not) {
                if (operands.length !== 1) {
                    return {
                        success: false,
                        error: "NOT operator must have exactly one operand",
                    };
                }
                return { success: true, value: !operands[0] };
            }
            if (operator === condition_model_1.LogicOperator.and) {
                return { success: true, value: operands.every(Boolean) };
            }
            if (operator === condition_model_1.LogicOperator.or) {
                return { success: true, value: operands.some(Boolean) };
            }
            return { success: false, error: "Unknown operator: ".concat(operator) };
        }
        catch (err) {
            return { success: false, error: "Tree evaluation error: ".concat(err.message) };
        }
    };
    return ConditionService;
}());
var conditionService = new ConditionService();
exports.default = conditionService;
