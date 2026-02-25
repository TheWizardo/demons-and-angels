import mongoose from "mongoose";
import { CouponConditionsSchema, ICouponConditions, ILogicOperation, LogicOperationSchema, LogicOperator } from "./condition-model";

export type ConditionTreeLeaf = {
  kind: "leaf";
  condition: ICouponConditions;
};

export type ConditionTreeOp = {
  kind: "op";
  op: ILogicOperation;          // operator + local conditions
  children?: ConditionTree[];   // nested subtrees
};

export type ConditionTree = ConditionTreeLeaf | ConditionTreeOp;

export interface IConditionTree {
  kind: "leaf" | "op";
  condition?: ICouponConditions;
  op?: ILogicOperation;
  children?: IConditionTree[];
};

export const ConditionTreeSchema = new mongoose.Schema<IConditionTree>(
  {
    kind: {
      type: String,
      enum: ["leaf", "op"],
      required: true,
    },

    // leaf-only
    condition: {
      type: CouponConditionsSchema,
      required: function (this: any) {
        return this.kind === "leaf";
      },
    },

    // op-only
    op: {
      type: LogicOperationSchema,
      required: function (this: any) {
        return this.kind === "op";
      },
    },
  },
  { _id: false }
);

ConditionTreeSchema.add({
  children: {
    type: [ConditionTreeSchema],
    default: undefined,
  },
});

ConditionTreeSchema.pre("validate", function (next) {
  const self = this as any;

  if (self.kind === "leaf") {
    // leaves must have exactly a condition, no op/children
    if (!self.condition) return next(new Error("Leaf node must have a condition"));
    if (self.op) return next(new Error("Leaf node must not have an op"));
    if (self.children?.length) return next(new Error("Leaf node must not have children"));
    return next();
  }

  if (self.kind === "op") {
    if (!self.op) return next(new Error("Op node must have an 'op'"));
    const operator: LogicOperator = self.op.operator;
    const condCount = Array.isArray(self.op.conditions) ? self.op.conditions.length : 0;
    const childCount = Array.isArray(self.children) ? self.children.length : 0;
    const totalOperands = condCount + childCount;

    if (operator === LogicOperator.not) {
      if (totalOperands !== 1) {
        return next(
          new Error("NOT must have exactly one operand (either one condition OR one child)")
        );
      }
    } else if (operator === LogicOperator.and || operator === LogicOperator.or) {
      if (totalOperands < 2) {
        return next(
          new Error("AND/OR must have at least two operands (conditions + children)")
        );
      }
    } else {
      return next(new Error("Unknown logical operator"));
    }
    return next();
  }

  next(new Error("Invalid node kind"));
});