import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Slide_admin() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Quản lý trạng thái mở/đóng từng menu con
  const [openMenu, setOpenMenu] = useState({
    homestay: false,
    category: false,
    user: false,
    orders: false,
  });

  // Hàm để toggle từng menu con
  const toggleMenu = (menu) => {
    setOpenMenu((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  // Logout handler
  const handleLogout = () => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn đăng xuất không?");
    if (isConfirmed) {
      localStorage.removeItem("auth");
      setUser(null); // Đặt lại state user về null
      navigate("/dk_dn"); // Điều hướng về trang đăng nhập
      window.location.reload(); // Tải lại trang
    }
  };

  return (
    <div>
      {/* Sidebar */}
      <div className="sidebar_admin_para">
        <div className="logo_admin_para">
          <Link to="/admin">
            <h2>
              <em>Paradiso</em>
            </h2>
          </Link>
        </div>
        <li className="Navigation">Navigation</li>
        <div className="navigation_admin_para">
          <ul>
               {/* Dashboard */}
               <li>
              <div
                className="menu-toggle_admin_para"
                onClick={() => toggleMenu("dashboard")}
              >
               <i className="icon-tachometer-alt"></i> <Link to={'/admin'}>Dashboard</Link>
              </div>
            </li>
            {/* Quản lý Homestay */}
            <li>
              <div
                className="menu-toggle_admin_para"
                onClick={() => toggleMenu("homestay")}
              >
                <i className="icon-home"></i> Quản lý Homestay
                <span className="badge_admin_para">3</span>
              </div>
              <ul
                className={`sub-menu_admin_para ${
                  openMenu.homestay ? "open" : "closed"
                }`}
              >
                <li>
                  <Link to="/admin_danhsach">Danh sách Homestay</Link>
                </li>
                <li>
                  <Link to="/admin_add_homestay">Thêm Homestay</Link>
                </li>
              </ul>
            </li>

            {/* Quản lý Loại */}
            <li>
              <div
                className="menu-toggle_admin_para"
                onClick={() => toggleMenu("category")}
              >
                <i className="icon-list"></i> Quản lý Loại
                <span className="badge_admin_para">5</span>
              </div>
              <ul
                className={`sub-menu_admin_para ${
                  openMenu.category ? "open" : "closed"
                }`}
              >
                <li>
                  <Link to="/admin_loaihomestay">Danh sách loại Homestay</Link>
                </li>
                <li>
                  <Link to="/admin_add_loai">Thêm loại Homestay</Link>
                </li>
              </ul>
            </li>

            {/* Quản lý User */}
            <li>
              <div
                className="menu-toggle_admin_para"
                onClick={() => toggleMenu("user")}
              >
                <i className="icon-user"></i> Quản lý Nhân viên
                <span className="badge_admin_para">8</span>
              </div>
              <ul
                className={`sub-menu_admin_para ${
                  openMenu.user ? "open" : "closed"
                }`}
              >
                <li>
                  <Link to="/admin_ds_nv">Danh sách nhân viên</Link>
                </li>
              </ul>
            </li>

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
                  <Link to="/admin_donhang">Danh sách đơn hàng</Link>
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

export default Slide_admin;
