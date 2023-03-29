import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
// import PropTypes from 'prop-types'

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

// Layout.propTypes = {}

export default Layout;
