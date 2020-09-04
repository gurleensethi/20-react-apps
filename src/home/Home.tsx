import React, { FunctionComponent } from "react";
import { Link, RouteComponentProps, useRouteMatch } from "react-router-dom";
import path from "path";
import navigationMeta from "../common/navigation-meta";

const Home: FunctionComponent<RouteComponentProps> = (props) => {
  const match = useRouteMatch();

  return (
    <div className="container p-5">
      <div className="list-group">
        {navigationMeta.map((navigation) => {
          return (
            <Link
              key={navigation.path}
              className="list-group-item list-group-item-action"
              to={path.join(match.path, navigation.path)}
            >
              {navigation.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
