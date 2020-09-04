import React, { FunctionComponent, useState, useCallback } from "react";
import styles from "./BrowserTabs.module.css";
import Tab from "./Tab";

const BrowserTabs: FunctionComponent = () => {
  const [highlightStyle, setHighlightStyle] = useState<{ left: number }>({
    left: 0,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const { layerX } = (e.nativeEvent as unknown) as { layerX: number };
      setHighlightStyle({ left: layerX - 150 });
    },
    []
  );

  return (
    <div className={styles.app}>
      <div className={styles.browser}>
        <div className={styles.tabs}>
          <Tab handleMouseMove={handleMouseMove} style={highlightStyle}>
            Home
          </Tab>
          <Tab handleMouseMove={handleMouseMove} style={highlightStyle}>
            About
          </Tab>
          <Tab handleMouseMove={handleMouseMove} style={highlightStyle}>
            Features
          </Tab>
        </div>

        <div className={styles.viewport}>Pages go here</div>
      </div>
    </div>
  );
};

export default BrowserTabs;
