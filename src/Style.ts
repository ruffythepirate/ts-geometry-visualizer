/**
 * Enum over different fill rules that can be applied when styling elements.
 * For reference see here: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill-rule
 */
export enum FillRule {
  nonzero,
  evenodd,
}

export interface Style {
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  fillRule?: FillRule;
}
