/* @canonical/generator-canonical-ds 0.0.1 */
import type React from "react";

export type CodeDiffViewerAddComment = (props: {
  lineNumber: number;
  onClose: () => void;
}) => React.ReactNode;

export type CodeDiffViewerProps = {
  /** A unique identifier for the CodeDiffViewer */
  id?: string;
  /** Additional CSS classes */
  className?: string;
  /** Add comment element.
   * If provided, the add comment button will be displayed on the line number.
   */
  AddComment?: CodeDiffViewerAddComment;
  /** Inline styles */
  style?: React.CSSProperties;
};
