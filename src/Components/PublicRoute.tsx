import React from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { isLogin, getAccess } from "../utils";

interface IProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  restricted: boolean;
  path?: string | string[];
  exact?: boolean;
  islogin: number;
}

const PublicRoute = ({ component: Component, restricted, islogin, ...rest }: IProps) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={props => (isLogin(islogin) && restricted ? <Redirect to="/inventory" /> : <Component {...props} />)}
    />
  );
};

export default PublicRoute;
