// Layout.js
import React from 'react';
import Header from './Header.jsx'
import Footer from './Footer.jsx'



const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children} {/* Các trang hợp lệ sẽ được render tại đây */}
      <Footer />
    </div>
  );
};

export default Layout;
