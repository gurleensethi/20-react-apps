import React, { FunctionComponent } from "react";
import { Link, RouteComponentProps, useRouteMatch } from "react-router-dom";
import path from "path";

const apps: {
  name: string;
  path: string;
}[] = [
  { name: "Pomodoro", path: "pomodoro" },
  { name: "Markdown Editor", path: "markdown-editor" },
];

const Home: FunctionComponent<RouteComponentProps> = (props) => {
  const match = useRouteMatch();

  return (
    <div className="container p-5">
      <div className="list-group">
        {apps.map((app) => {
          return (
            <Link
              className="list-group-item list-group-item-action"
              to={path.join(match.path, app.path)}
            >
              {app.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
