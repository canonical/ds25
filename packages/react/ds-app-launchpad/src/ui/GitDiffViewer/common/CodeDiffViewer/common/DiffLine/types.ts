/* @canonical/generator-canonical-ds 0.0.1 */
import type React from "react";

export type DiffContentLine = {
  type: "add" | "remove" | "context";
  lineNum1: number | string | null;
  lineNum2: number | string | null;
  content: string;
};

export type DiffHunkLine = {
  type: "hunk";
  hunkHeader: string;
  hunkIndex: number;
};

type DiffLineCommonProps = {
  /** A unique identifier for the DiffLine */
  id?: string;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Callback function for when a line is clicked. */
  onLineClick?: (() => void) | undefined;
};

export type DiffContentLineProps = DiffLineCommonProps & DiffContentLine;
export type DiffHunkLineProps = DiffLineCommonProps & DiffHunkLine;
export type DiffLineProps = DiffContentLineProps | DiffHunkLineProps;
