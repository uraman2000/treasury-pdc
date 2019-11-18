import React, { ReactNode } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { isLogin } from "../utils";
interface IProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  path?: string | string[];
  exact?: boolean;
}
const PrivateRoute = ({ component: Component, ...rest }: IProps) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route {...rest} render={props => (isLogin() ? <Component {...props} /> : <Redirect to="/login" />)} />
  );
};

export default PrivateRoute;
