/* @canonical/generator-canonical-ds 0.0.1 */
import type React from "react";
import { Fragment, useCallback, useEffect, useMemo, useRef } from "react";
import { useGitDiffViewer } from "../../hooks/index.js";
import { DiffLine } from "./common/index.js";
import "./styles.css";
// TODO: decide where to put this once we provide an external syntax highlighter option
import hljs from "highlight.js";
import type { CodeDiffViewerProps } from "./types.js";
import "./HighlighTheme.css";

const componentCssClassName = "ds code-diff-viewer";

const tableWidthCSSVar = "--table-width";

/**
 * Displays a diff in a table format with line numbers and syntax highlighting.
 * With option to add comments to specific lines and interactive gutter for adding comments.
 *
 * @returns {React.ReactElement} - Rendered CodeDiffViewer
 */
const CodeDiffViewer = ({
  id,
  AddComment,
  className,
  style,
}: CodeDiffViewerProps): React.ReactElement | null => {
  const {
    isCollapsed,
    diff,
    addCommentEnabled,
    setAddCommentEnabled,
    addCommentOpenLocations,
    toggleAddCommentLocation,
    lineDecorations,
  } = useGitDiffViewer();
  const tableRef = useRef<HTMLTableElement | null>(null);

  // TODO: temporary syntax highlighting
  // replace with a proper syntax highlighter
  // add support for option to have external syntax highlighter
  const diffCodeLanguage = useMemo(() => {
    const extension = diff?.newPath.split(".").pop();
    const mapping: { [key: string]: string } = {
      js: "javascript",
      jsx: "javascript",
      ts: "typescript",
      tsx: "typescript",
      css: "css",
      scss: "scss",
      html: "xml",
      py: "python",
      java: "java",
      // Add more mappings as needed
    };
    return mapping[extension || ""] || "plaintext";
  }, [diff?.newPath]);

  const highlight = useCallback(
    (code: string) => {
      if (hljs.getLanguage(diffCodeLanguage)) {
        return hljs.highlight(code, { language: diffCodeLanguage }).value;
      }
      return hljs.highlight(code, { language: "plaintext" }).value;
    },
    [diffCodeLanguage],
  );

  const highlightedLines = useMemo(() => {
    if (!diff) return [];

    return diff.hunks.map((hunk) => {
      return hunk.lines.map((line) => {
        return highlight(line.content);
      });
    });
  }, [diff, highlight]);

  /**
   * Observe the table for size changes and update the CSS variable
   */
  useEffect(() => {
    // SSR check
    if (typeof ResizeObserver === "undefined") return;
    if (!tableRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (!tableRef.current) return;
      const tableWidth = tableRef.current?.clientWidth ?? 0;
      tableRef.current.style.cssText = `${tableWidthCSSVar}: ${tableWidth}px`;
    });

    // Observe the table for size changes
    resizeObserver.observe(tableRef.current);

    // Cleanup on unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (AddComment && !addCommentEnabled) {
      setAddCommentEnabled(true);
    } else if (!AddComment && addCommentEnabled) {
      setAddCommentEnabled(false);
    }
  }, [AddComment, addCommentEnabled, setAddCommentEnabled]);

  if (isCollapsed) {
    return null;
  }

  return (
    <div
      id={id}
      style={style}
      className={[componentCssClassName, className].filter(Boolean).join(" ")}
    >
      {diff.hunks.map((hunk, hunkIndex) => {
        // We'll track the counters for old and new lines
        // as we iterate through each hunk.
        let oldLineCounter = hunk.oldStart;
        let newLineCounter = hunk.newStart;

        return (
          <div key={`${diff.oldPath}-${hunkIndex}`} className="diff-hunk">
            <table className="diff-table" ref={tableRef} tabIndex={-1}>
              <tbody>
                {/* Hunk header line */}
                <DiffLine type="hunk" hunkHeader={hunk.header} />

                {hunk.lines.map((line, lineIndex) => {
                  let lineNum1: number | null = null;
                  let lineNum2: number | null = null;

                  if (line.type === "remove") {
                    // Only the old line number advances
                    lineNum1 = oldLineCounter++;
                  } else if (line.type === "add") {
                    // Only the new line number advances
                    lineNum2 = newLineCounter++;
                  } else {
                    // context line => both lines advance
                    lineNum1 = oldLineCounter++;
                    lineNum2 = newLineCounter++;
                  }

                  const lineNumber = lineNum2 || lineNum1 || 0;

                  // For rendering, if lineNum1 or lineNum2 is null,
                  // you can display e.g. '+' or '-' or an empty cell.
                  return (
                    <Fragment key={`${diff.oldPath}-${hunkIndex}-${lineIndex}`}>
                      {/* Normal diff line */}
                      <DiffLine
                        lineNum1={lineNum1}
                        lineNum2={lineNum2}
                        content={highlightedLines[hunkIndex][lineIndex]}
                        type={line.type}
                      />

                      {lineNum2 && lineDecorations?.[lineNum2] && (
                        <tr className="line-decoration">
                          <td className="container">
                            {lineDecorations[lineNum2]}
                          </td>
                        </tr>
                      )}

                      {/* Open comment row, if any */}
                      {lineNum2 &&
                        AddComment &&
                        addCommentOpenLocations.has(lineNum2) && (
                          <tr className="line-decoration">
                            <td className="container">
                              <AddComment
                                lineNumber={lineNumber}
                                onClose={() =>
                                  toggleAddCommentLocation(lineNumber)
                                }
                              />
                            </td>
                          </tr>
                        )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

CodeDiffViewer.displayName = "GitDiffViewer.CodeDiff";

export default CodeDiffViewer;
