import React, { FunctionComponent, useState, useCallback } from "react";
import styles from "./BrowserTabs.module.css";
import Tab from "./Tab";
import {
  Route,
  useRouteMatch,
  useHistory,
  matchPath,
  useLocation,
} from "react-router-dom";
import path from "path";

const BrowserTabs: FunctionComponent = () => {
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

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

  const navigateTo = useCallback(
    (route: string) => {
      history.push(path.join(match.url, route));
    },
    [history, match]
  );

  const isPathMatch = useCallback(
    (route: string) => {
      return matchPath(location.pathname, {
        exact: true,
        path: path.join(match.url, route),
      });
    },
    [location, match]
  );

  return (
    <div className={styles.app}>
      <div className={styles.browser}>
        <div className={styles.tabs}>
          <Tab
            handleMouseMove={handleMouseMove}
            style={highlightStyle}
            onClick={() => navigateTo("home")}
            className={isPathMatch("home") ? styles.active : ""}
          >
            Home
          </Tab>
          <Tab
            handleMouseMove={handleMouseMove}
            style={highlightStyle}
            onClick={() => navigateTo("about")}
            className={isPathMatch("about") ? styles.active : ""}
          >
            About
          </Tab>
          <Tab
            handleMouseMove={handleMouseMove}
            style={highlightStyle}
            onClick={() => navigateTo("features")}
            className={isPathMatch("features") ? styles.active : ""}
          >
            Features
          </Tab>
        </div>
        <div className={styles.viewport}>
          <Route exact path={path.join(match.url, "home")}>
            Home
          </Route>
          <Route exact path={path.join(match.url, "about")}>
            About
          </Route>
          <Route exact path={path.join(match.url, "features")}>
            Feature
          </Route>
        </div>
      </div>
    </div>
  );
};

export default BrowserTabs;
