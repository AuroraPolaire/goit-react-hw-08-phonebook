import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from 'redux/auth/operations';
import Contacts from '../pages/Contacts';
import { Route, Routes } from 'react-router-dom';
import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';
import Home from 'pages/Home';
import ModalRegister from './ModalRegister/ModalRegister';
import ModalLogin from './ModalLogin/ModalLogin';
import Layout from './Layout';
import { Toaster } from 'react-hot-toast';
import { selectIsRefreshing } from 'redux/auth/selectors';

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Toaster
        containerStyle={{
          top: 10,
        }}
      />
      {isRefreshing ? null : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="/contacts"
              element={
                <PrivateRoute redirectTo="/login" component={<Contacts />} />
              }
            ></Route>
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<ModalRegister />}
                />
              }
            ></Route>
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<ModalLogin />}
                />
              }
            ></Route>
            <Route
              path="/logout"
              element={<PrivateRoute redirectTo="/" component={<Home />} />}
            ></Route>
          </Route>

          <Route path="*" element={<p>Path not resolved</p>} />
        </Routes>
      )}
    </>
  );
};
