import React from 'react';
import styles from './Layout.module.css';
import MainNavigation from './MainNavigation';

const Layout = ({ children }) => {
  return (
    <>
      <MainNavigation />
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
