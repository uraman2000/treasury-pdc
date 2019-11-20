import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { RouteChildrenProps } from "react-router";
import { getAccess } from "../utils";
interface IProps {
  children?: ((props: RouteChildrenProps<any>) => React.ReactNode) | React.ReactNode;
  path?: string | string[];
}

export default function ProtectedRoute({ children, path, ...rest }: IProps) {
  return (
    <>
      <Route
        {...rest}
        render={({ location }) =>
          getAccess().access_token !== null ? (
            children
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
