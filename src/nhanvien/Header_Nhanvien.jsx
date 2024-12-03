import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Header_Nhanvien() {

    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
    const [user, setUser] = useState(null); // Thông tin người dùng
    useEffect(() => {
        // Kiểm tra trạng thái đăng nhập khi component mount
        const storedUser = JSON.parse(localStorage.getItem('auth'));
        if (storedUser) {
        setIsLoggedIn(true);
        setUser(storedUser);  // Lưu thông tin người dùng vào state
        }
    }, []);
    const handleLogout = () => {
        // Xóa thông tin người dùng khi đăng xuất
        localStorage.removeItem('auth');
        setIsLoggedIn(false);
        setUser(null);
        navigate('/');
    };
    return(
        <div className="admin_warp">
            <div className="container_admin_para">
        {/* <!-- Sidebar --> */}
                <div className="sidebar_admin_para">
                    <div className="logo_admin_para">
                        <Link to={'/admin/home'}><h2>Paradiso</h2></Link>
                    </div>
                    <div className="navigation_admin_para">
                        <ul>
                            <li>
                                <Link to={'/nhanvien_chuaxacnhan'}>Đơn Hàng chưa xác nhận</Link>
                            </li>
                            <li><Link to={'/nhanvien_daxacnhan'}>Đơn hàng chưa thanh toán</Link></li>
                            <li><Link to={'/nhanvien_dathanhtoan'}>Đơn hàng đã thanh toán</Link></li>
                            
                            
                        </ul>
                    </div>
                </div>

                {/* <!-- Main Content --> */}
                <div className="main-content_admin_para">
                    <contens>
                        <div className="header-left_admin_para">
                            <button className="menu-toggle_admin_para">☰</button>
                            <input type="text" placeholder="Search..."/>
                        </div>
                        
                        <div className="header-right_admin_para">
                            <span>English</span>
                            <div className="notifications_admin_para">
                                <span>🔔</span>
                                <span className="badge_admin_para">4</span>
                            </div>
                            <Link to="/" onClick={handleLogout}>                        
                                <span>
                                    Đăng xuất
                                </span>
                        
                            </Link>
                        </div>
                    </contens>
                    <div class="content_admin_para">
                        {/* <!-- Main content here --> */}
                        <h1>Welcome to Velonic Admin</h1>
                    </div>
                   
                </div>

            </div>
    </div>
    )
}
export default Header_Nhanvien;