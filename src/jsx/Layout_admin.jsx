// Layout_admin.js
import React from "react";
import Slide_admin from "../admin/Slide_admin"; // Đảm bảo đường dẫn đúng
import Nav_admin from "../admin/nav_admin";

const Layout_admin = ({ children }) => {
  return (
    <div className="admin_wap">
      <header className="head_admin">
        <Nav_admin />
        <div className="admin_main">{children}</div>
        <Slide_admin />
      </header>
    </div>
  );
};

export default Layout_admin;
