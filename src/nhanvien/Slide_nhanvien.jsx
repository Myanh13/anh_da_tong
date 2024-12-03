import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Slide_nhanvien() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState({
    orders: false,
    user: false,
  });

  // Hàm để toggle menu
  const toggleMenu = (menu) => {
    setOpenMenu((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  // Logout handler
  const handleLogout = () => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn đăng xuất không?");
    if (isConfirmed) {
      localStorage.removeItem("auth");
      navigate("/dk_dn"); // Điều hướng về trang đăng nhập
      window.location.reload(); // Tải lại trang
    }
  };

  return (
    <div>
      {/* Sidebar */}
      <div className="sidebar_admin_para">
        <div className="logo_admin_para">
          <Link to={'/nhanvien'}>
            <h2><em>Paradiso</em></h2>
          </Link>
        </div>
        <li className="Navigation">Navigation</li>
        <div className="navigation_admin_para">
          <ul>
            {/* Quản lý Đơn hàng */}
            <li>
              <div
                className="menu-toggle_admin_para"
                onClick={() => toggleMenu("orders")}
              >
                <i className="icon-cart"></i> Quản lý Đơn hàng
                <span className="badge_admin_para">10</span>
              </div>
              <ul
                className={`sub-menu_admin_para ${
                  openMenu.orders ? "open" : "closed"
                }`}
              >
                <li>
                  <Link to={'/nhanvien_chuaxacnhan'}>Đơn Hàng chưa xác nhận</Link>
                </li>
                <li>
                  <Link to={'/nhanvien_daxacnhan'}>Đơn hàng chưa thanh toán</Link>
                </li>
                <li>
                  <Link to={'/nhanvien_dathanhtoan'}>Đơn hàng đã thanh toán</Link>
                </li>
              </ul>
              <div
                className="menu-toggle_admin_para"
                onClick={() => toggleMenu("user")}
              >
                <i className="icon-user"></i> Quản lý User
                <span className="badge_admin_para">10</span>
              </div>
              <ul
                className={`sub-menu_admin_para ${
                  openMenu.user ? "open" : "closed"
                }`}
              >
                <li>
                  <Link to={'/nhanvien_ds_user'}>Danh sách User</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Nút Đăng xuất */}
        <div className="logout_admin_para">
          <button className="logout_button" onClick={handleLogout}>
            <i className="icon-logout"></i> Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}

export default Slide_nhanvien;
