import { Condition, ICouponConditions, LogicOperator } from "../Models/condition-model";
import { IConditionTree } from "../Models/conditionTree-model";
import { ICouponModel } from "../Models/coupon-model";
import { IOrderModel } from "../Models/order-model";

interface EvalResult {
  success: boolean;
  value?: boolean;   // present only if success === true
  error?: string;  // present only if success === false
}

class ConditionService {
  private evalCondition(order: IOrderModel, c: ICouponConditions): EvalResult {
    const actual = (order as any)[c.field];

    try {
      switch (c.condition) {
        case Condition.is:
          return { success: true, value: actual === c.value };

        case Condition.greaterThan:
          return { success: true, value: Number(actual) > Number(c.value) };

        case Condition.greaterOrEqualTo:
          return { success: true, value: Number(actual) >= Number(c.value) };

        case Condition.includes:
          if (Array.isArray(actual)) {
            return { success: true, value: actual.includes(c.value as any) };
          }
          if (typeof actual === "string") {
            return { success: true, value: actual.toLowerCase().includes(String(c.value).toLowerCase()) };
          }
          return {
            success: false,
            error: `Field "${c.field}" is not array/string for includes check`,
          };

        default:
          return { success: false, error: `Unknown condition type: ${c.condition}` };
      }
    } catch (err: any) {
      return { success: false, error: `Condition evaluation failed: ${err.message}` };
    }
  }

  public evalTree(order: IOrderModel, node: IConditionTree): EvalResult {
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

      const operator: LogicOperator = node.op.operator;

      // Evaluate conditions
      const localResults: EvalResult[] = (node.op.conditions || []).map((c) =>
        this.evalCondition(order, c)
      );
      for (const r of localResults) if (!r.success) return r;

      // Evaluate children
      const childResults: EvalResult[] = (node.children || []).map((ch) =>
        this.evalTree(order, ch)
      );
      for (const r of childResults) if (!r.success) return r;

      // Combine booleans
      const operands = [...localResults, ...childResults].map((r) => r.value!);

      if (operator === LogicOperator.not) {
        if (operands.length !== 1) {
          return {
            success: false,
            error: "NOT operator must have exactly one operand",
          };
        }
        return { success: true, value: !operands[0] };
      }

      if (operator === LogicOperator.and) {
        return { success: true, value: operands.every(Boolean) };
      }

      if (operator === LogicOperator.or) {
        return { success: true, value: operands.some(Boolean) };
      }

      return { success: false, error: `Unknown operator: ${operator}` };
    } catch (err: any) {
      return { success: false, error: `Tree evaluation error: ${err.message}` };
    }
  }
}


const conditionService = new ConditionService();
export default conditionService;