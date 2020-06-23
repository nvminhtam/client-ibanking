import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
// import AuthContext from '../../context/auth/authContext';
import NavBar from '../layout/NavBar'
const PrivateRoute = ({ component: Component, ...rest }) => {
  // const authContext = useContext(AuthContext);
  // const { isAuthenticated, loading } = authContext;
  // console.log(authContext)

  return (
    <Route
      {...rest}
      render={props =>
        !localStorage.getItem('token') ? (
          <Redirect to='/login' />
        ) : (
            <Component {...props} />
          )
      }
    />
  );
};

export default PrivateRoute;
