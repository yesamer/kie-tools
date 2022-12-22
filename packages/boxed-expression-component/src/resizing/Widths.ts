import { ExpressionDefinitionLogicType } from "../api";
import { ExpressionDefinition, FunctionExpressionDefinitionKind } from "../api/ExpressionDefinition";
import { ResizingWidth } from "../resizing/ResizingWidthsContext";
import {
  CONTEXT_ENTRY_EXTRA_WIDTH,
  BEE_TABLE_ROW_INDEX_COLUMN_WIDTH,
  NESTED_EXPRESSION_CLEAR_MARGIN,
  CONTEXT_ENTRY_EXPRESSION_MIN_WIDTH,
  CONTEXT_ENTRY_INFO_MIN_WIDTH,
} from "../expressions/ContextExpression";
import { LITERAL_EXPRESSION_MIN_WIDTH, LITERAL_EXPRESSION_EXTRA_WIDTH } from "../expressions/LiteralExpression";
import { RELATION_EXPRESSION_COLUMN_MIN_WIDTH } from "../expressions/RelationExpression";
import { DEFAULT_MIN_WIDTH } from "./Resizer";
import {
  DECISION_TABLE_ANNOTATION_MIN_WIDTH,
  DECISION_TABLE_INPUT_MIN_WIDTH,
  DECISION_TABLE_OUTPUT_MIN_WIDTH,
} from "../expressions/DecisionTableExpression";

export function getExpressionMinWidth(expression?: ExpressionDefinition): number {
  if (!expression) {
    return DEFAULT_MIN_WIDTH;
  } else if (expression.logicType === ExpressionDefinitionLogicType.Context) {
    return (
      Math.max(
        CONTEXT_ENTRY_EXPRESSION_MIN_WIDTH,
        ...expression.contextEntries.map(({ entryExpression }) => getExpressionMinWidth(entryExpression)),
        getExpressionMinWidth(expression.result)
      ) +
      CONTEXT_ENTRY_INFO_MIN_WIDTH +
      CONTEXT_ENTRY_EXTRA_WIDTH
    );
  } else if (expression.logicType === ExpressionDefinitionLogicType.LiteralExpression) {
    return LITERAL_EXPRESSION_MIN_WIDTH;
  } else if (expression.logicType === ExpressionDefinitionLogicType.Function) {
    if (expression.functionKind === FunctionExpressionDefinitionKind.Feel) {
      return CONTEXT_ENTRY_EXPRESSION_MIN_WIDTH + CONTEXT_ENTRY_EXTRA_WIDTH - 2; // 2px for the missing entry info border
    } else if (expression.functionKind === FunctionExpressionDefinitionKind.Java) {
      return CONTEXT_ENTRY_EXPRESSION_MIN_WIDTH + CONTEXT_ENTRY_INFO_MIN_WIDTH + CONTEXT_ENTRY_EXTRA_WIDTH * 2 - 2;
    } else if (expression.functionKind === FunctionExpressionDefinitionKind.Pmml) {
      return CONTEXT_ENTRY_EXPRESSION_MIN_WIDTH + CONTEXT_ENTRY_INFO_MIN_WIDTH + CONTEXT_ENTRY_EXTRA_WIDTH * 2 - 2;
    } else {
      throw new Error("Should never get here");
    }
  } else if (expression.logicType === ExpressionDefinitionLogicType.Relation) {
    return (
      (expression.columns?.length ?? 0) * (RELATION_EXPRESSION_COLUMN_MIN_WIDTH + 2) +
      BEE_TABLE_ROW_INDEX_COLUMN_WIDTH +
      NESTED_EXPRESSION_CLEAR_MARGIN
    );
  } else if (expression.logicType === ExpressionDefinitionLogicType.List) {
    return (
      Math.max(
        CONTEXT_ENTRY_EXPRESSION_MIN_WIDTH,
        ...(expression.items ?? []).map((expression) => getExpressionMinWidth(expression))
      ) +
      BEE_TABLE_ROW_INDEX_COLUMN_WIDTH +
      NESTED_EXPRESSION_CLEAR_MARGIN
    );
  } else if (expression.logicType === ExpressionDefinitionLogicType.Invocation) {
    return (
      CONTEXT_ENTRY_INFO_MIN_WIDTH +
      Math.max(
        CONTEXT_ENTRY_EXPRESSION_MIN_WIDTH,
        ...(expression.bindingEntries ?? []).map(({ entryExpression }) => getExpressionMinWidth(entryExpression))
      ) +
      BEE_TABLE_ROW_INDEX_COLUMN_WIDTH +
      NESTED_EXPRESSION_CLEAR_MARGIN
    );
  } else if (expression.logicType === ExpressionDefinitionLogicType.DecisionTable) {
    return (
      (expression.input?.length ?? 0) * (DECISION_TABLE_INPUT_MIN_WIDTH + 2) +
      (expression.output?.length ?? 0) * (DECISION_TABLE_OUTPUT_MIN_WIDTH + 2) +
      (expression.annotations?.length ?? 0) * (DECISION_TABLE_ANNOTATION_MIN_WIDTH + 2) +
      BEE_TABLE_ROW_INDEX_COLUMN_WIDTH +
      NESTED_EXPRESSION_CLEAR_MARGIN
    );
  } else if (expression.logicType === ExpressionDefinitionLogicType.PmmlLiteralExpression) {
    return CONTEXT_ENTRY_EXPRESSION_MIN_WIDTH;
  } else if (expression.logicType === ExpressionDefinitionLogicType.Undefined) {
    return DEFAULT_MIN_WIDTH;
  } else {
    throw new Error("Shouldn't ever reach this point");
  }
}

export function getExpressionResizingWidth(
  expression: ExpressionDefinition | undefined,
  resizingWidths: Map<string, ResizingWidth>
): number {
  if (!expression) {
    return getExpressionMinWidth(expression);
  }

  const resizingWidth = resizingWidths.get(expression.id!)?.value;

  if (expression.logicType === ExpressionDefinitionLogicType.Context) {
    return (
      resizingWidth ??
      (expression.entryInfoWidth ?? CONTEXT_ENTRY_INFO_MIN_WIDTH) +
        Math.max(
          CONTEXT_ENTRY_EXPRESSION_MIN_WIDTH,
          ...[...expression.contextEntries.map((e) => e.entryExpression), expression.result].map((e) =>
            getExpressionResizingWidth(e, resizingWidths)
          )
        ) +
        CONTEXT_ENTRY_EXTRA_WIDTH
    );
  } else if (expression.logicType === ExpressionDefinitionLogicType.LiteralExpression) {
    return (resizingWidth ?? expression.width ?? LITERAL_EXPRESSION_MIN_WIDTH) + LITERAL_EXPRESSION_EXTRA_WIDTH;
  } else if (expression.logicType === ExpressionDefinitionLogicType.Function) {
    if (expression.functionKind === FunctionExpressionDefinitionKind.Feel) {
      return getExpressionResizingWidth(expression.expression, resizingWidths) + CONTEXT_ENTRY_EXTRA_WIDTH - 2; // 2px for the missing entry info border
    } else if (expression.functionKind === FunctionExpressionDefinitionKind.Java) {
      return CONTEXT_ENTRY_EXPRESSION_MIN_WIDTH + CONTEXT_ENTRY_INFO_MIN_WIDTH + CONTEXT_ENTRY_EXTRA_WIDTH * 2 - 2;
    } else if (expression.functionKind === FunctionExpressionDefinitionKind.Pmml) {
      return CONTEXT_ENTRY_EXPRESSION_MIN_WIDTH + CONTEXT_ENTRY_INFO_MIN_WIDTH + CONTEXT_ENTRY_EXTRA_WIDTH * 2 - 2;
    } else {
      throw new Error("Should never get here");
    }
  } else if (expression.logicType === ExpressionDefinitionLogicType.Relation) {
    return (
      resizingWidth ??
      (expression.columns ?? []).reduce(
        (acc, { width }) => acc + (width ?? RELATION_EXPRESSION_COLUMN_MIN_WIDTH),
        BEE_TABLE_ROW_INDEX_COLUMN_WIDTH + NESTED_EXPRESSION_CLEAR_MARGIN + (expression.columns?.length ?? 0) * 2
      )
    );
  } else if (expression.logicType === ExpressionDefinitionLogicType.DecisionTable) {
    const columns = [...(expression.input ?? []), ...(expression.output ?? []), ...(expression.annotations ?? [])];
    return (
      resizingWidth ??
      columns.reduce(
        (acc, c) => acc + (c.width ?? RELATION_EXPRESSION_COLUMN_MIN_WIDTH),
        BEE_TABLE_ROW_INDEX_COLUMN_WIDTH + NESTED_EXPRESSION_CLEAR_MARGIN + columns.length * 2
      )
    );
  } else if (expression.logicType === ExpressionDefinitionLogicType.List) {
    return (
      resizingWidth ??
      Math.max(
        CONTEXT_ENTRY_EXPRESSION_MIN_WIDTH,
        ...(expression.items ?? []).map((expression) => getExpressionResizingWidth(expression, resizingWidths))
      ) +
        BEE_TABLE_ROW_INDEX_COLUMN_WIDTH +
        NESTED_EXPRESSION_CLEAR_MARGIN
    );
  } else if (expression.logicType === ExpressionDefinitionLogicType.Invocation) {
    return (
      resizingWidth ??
      Math.max(
        CONTEXT_ENTRY_EXPRESSION_MIN_WIDTH,
        ...(expression.bindingEntries ?? []).map((e) => getExpressionResizingWidth(e.entryExpression, resizingWidths))
      ) +
        BEE_TABLE_ROW_INDEX_COLUMN_WIDTH +
        NESTED_EXPRESSION_CLEAR_MARGIN
    );
  } else if (expression.logicType === ExpressionDefinitionLogicType.PmmlLiteralExpression) {
    return resizingWidth ?? CONTEXT_ENTRY_EXPRESSION_MIN_WIDTH;
  } else if (expression.logicType === ExpressionDefinitionLogicType.Undefined) {
    return resizingWidth ?? DEFAULT_MIN_WIDTH;
  } else {
    throw new Error("Shouldn't ever reach this point");
  }
}