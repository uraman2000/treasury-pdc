import React, { ReactNode } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { isLogin, getAccess } from "../utils";
interface IProps {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  path?: string | string[];
  exact?: boolean;
  islogin: number;
}
const PrivateRoute = ({ component: Component, islogin, ...rest }: IProps) => {
  return (
    <>
      <Route
        {...rest}
        render={props => (isLogin(islogin) ? <Component {...props} /> : <Redirect to="/login" />)}
      />
    </>
  );
};

export default PrivateRoute;
