import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { RouteChildrenProps } from "react-router";
import { getAccess } from "../utils";
interface IProps {
  component: any;
  path?: string | string[];
}

export default function ProtectedRoute({ component: Component, ...rest }: IProps) {
  return (
    <>
      <Route
        exact
        {...rest}
        render={({ location }) =>
          getAccess().access_token !== null ? (
            <Component />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    </>
  );
}
