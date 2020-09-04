import React, { FunctionComponent } from "react";
import styles from "./BrowserTabs.module.css";

interface TabProps {
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  style?: React.CSSProperties;
}

const Tab: FunctionComponent<React.HTMLProps<HTMLDivElement> & TabProps> = ({
  handleMouseMove,
  style,
  children,
  className,
  ...rest
}) => {
  console.log(`${styles.tab} ${className}`);
  return (
    <div
      {...rest}
      className={`${className} ${styles.tab}`}
      onMouseMove={handleMouseMove}
    >
      <div className={styles.highlight} style={style} />
      {children}
    </div>
  );
};

export default Tab;
