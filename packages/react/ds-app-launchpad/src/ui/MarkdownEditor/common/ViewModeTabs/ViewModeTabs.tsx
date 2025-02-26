/* @canonical/generator-ds 0.9.0-experimental.4 */
import type React from "react";
import { useId, useRef } from "react";
import { EditMode } from "../../types.js";
import "./styles.css";
import type { ViewModeTabsProps } from "./types.js";

const componentCssClassName = "ds view-mode-tabs";
const selectedTabCssClassName = "selected";
const tabs: EditMode[] = ["write", "preview"];

/**
 * A toggle interface for switching between write and preview modes.
 */
const ViewModeTabs = ({
  className,
  style,
  editMode,
  onEditModeChange,
}: ViewModeTabsProps): React.ReactElement => {
  const id = useId();
  const tabRefs = useRef<HTMLButtonElement[]>([]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      onEditModeChange(event.currentTarget.dataset.tab as EditMode);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      const currentIndex = tabs.indexOf(editMode);
      const nextIndex = currentIndex === 0 ? 1 : 0;

      onEditModeChange(tabs[nextIndex]);
      tabRefs.current[nextIndex]?.focus();
      event.preventDefault();
    }
  };

  return (
    <div
      id={id}
      style={style}
      className={[componentCssClassName, className].filter(Boolean).join(" ")}
      role="tablist"
      aria-label="View Mode Tabs"
    >
      {tabs.map((tab, index) => (
        <button
          key={`tab-${id}-${tab}`}
          role="tab"
          className={["tab", editMode === tab && selectedTabCssClassName]
            .filter(Boolean)
            .join(" ")}
          aria-selected={editMode === tab}
          onClick={() => onEditModeChange(tab)}
          onKeyDown={handleKeyDown}
          tabIndex={editMode === tab ? 0 : -1}
          data-tab={tab}
          ref={(el) => {
            if (el) {
              tabRefs.current[index] = el;
            }
          }}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default ViewModeTabs;
