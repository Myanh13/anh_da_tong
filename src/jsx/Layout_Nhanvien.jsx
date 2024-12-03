// Layout.js
import React from 'react';
import Slide_nhanvien from "../nhanvien/Slide_nhanvien"; // Đảm bảo đường dẫn đúng
import Nav_nhanvien from "../nhanvien/Nav_nhanvien";




const Layout_Nhanvien = ({ children }) => {
  return (
    <div className="admin_wap">
    <header className="head_admin">
      <Nav_nhanvien />
      <div className="admin_main">{children}</div>
      <Slide_nhanvien />
    </header>
  </div>
  );
};

export default Layout_Nhanvien;
