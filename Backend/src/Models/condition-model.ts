import mongoose from "mongoose";
import { IOrderModel, OrderDefaultObject } from "./order-model";

export enum Condition {
    is = "is",
    greaterThan = "gt",
    greaterOrEqualTo = "gte",
    includes = "inc"
}

export enum LogicOperator {
    and = "&&",
    or = "||",
    not = "!!"
}

export interface ICouponConditions {
    field: keyof IOrderModel;
    condition: Condition;
    value: IOrderModel[keyof IOrderModel];
}

export interface ILogicOperation {
    operator: LogicOperator;
    conditions: ICouponConditions[];
}

export const CouponConditionsSchema =
  new mongoose.Schema<ICouponConditions>({
    field: {
      type: String,
      required: true,
      enum: {
        values: Object.keys(OrderDefaultObject),
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
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  });

export const LogicOperationSchema = new mongoose.Schema<ILogicOperation>({
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
        type: [CouponConditionsSchema]
    },
})

