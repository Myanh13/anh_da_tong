import React, { useState, useEffect, useRef} from 'react';
import { Link, useNavigate,useLocation  } from 'react-router-dom';
import { NavLink } from "react-router-dom";
function Header() {
    const [active, setActive] = useState(false);
    // const [active1, setActive1] = useState(false);
    // const [active2, setActive2] = useState(false);
    // const [active3, setActive3] = useState(false);
    // uuuser
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null); // Tham chiếu đến dropdown
    const [user, setUser] = useState(null); // Thông tin người dùng
    const [favorites, setFavorites] = useState([]);
    const [favoriteCount, setFavoriteCount] = useState(0);
    const storedUser = JSON.parse(localStorage.getItem('auth'));
    const [imageUrl, setImageUrl] = useState(null); // Thêm state này ở đầu file component
    const defaultAvatar = '../../image/user2.png';
    const location = useLocation(); // Lấy thông tin đường dẫn hiện tại

    
    //kiem tra nguoi dung dang nhap
    useEffect(() => {
        // Kiểm tra trạng thái đăng nhập khi component mount
        const storedUser = JSON.parse(localStorage.getItem('auth'));
        if (storedUser) {
        setIsLoggedIn(true);
        setUser(storedUser);  // Lưu thông tin người dùng vào state
        }
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(`https://anh-api-tong.onrender.com/user/${storedUser.id_user}`);
            if (response.ok) {
              const data = await response.json();
              setUser(data.user);
              
              // Kiểm tra nếu người dùng có ảnh, nếu không thì sẽ dùng ảnh mặc định
              if (data.user.avatar && data.user.avatar !== "../../image/user2.png") {
                setImageUrl(`https://anh-api-tong.onrender.com${data.user.avatar}`);  // Hiển thị ảnh từ server
              } else {
                setImageUrl("../../image/user2.png");  // Hiển thị ảnh mặc định
              }
            } else {
              console.error('Lỗi khi lấy dữ liệu người dùng');
            }
          } catch (error) {
            console.error('Lỗi kết nối với server:', error);
          }
        };
      
        if (storedUser) {
          fetchUserData();
        }
      }, []);

    //togdhown xuong
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    //dang xuat

    const handleLogout = () => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn đăng xuất không?");
        if (confirmed) {
            // Xóa thông tin người dùng khi đăng xuất
            localStorage.removeItem("auth");
            setIsLoggedIn(false);
            setUser(null);
            navigate("/");
        }
    };

    // Đóng dropdown nếu người dùng nhấp bên ngoài
    const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
    }
    };
    useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
    }, []);

    //yeuthich
    const updateFavoriteCount = () => {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavoriteCount(favorites.length);
    };
      useEffect(() => {
      // Cập nhật số lượng yêu thích khi component được render lần đầu
      updateFavoriteCount();
  
      // Lắng nghe sự kiện "storage" để cập nhật khi localStorage thay đổi từ nơi khác
      window.addEventListener('storage', updateFavoriteCount);
  
      // Xóa lắng nghe sự kiện khi component bị unmount
      return () => window.removeEventListener('storage', updateFavoriteCount);
    }, []);
    // JSON.parse(localStorage.getItem('favorites')).length
    
    const handleGoToProfile = () => {
        window.location.href = "/infor_user";
      };
     // reload trang
     const handleLogoClick = () => {
        const checkbox = document.getElementById('click_open_close');
        if (checkbox) checkbox.checked = false; // Đóng thanh sidebar
      };
    useEffect(() => {
        // Đóng sidebar mỗi khi URL thay đổi
        const checkbox = document.getElementById('click_open_close');
        if (checkbox) {
          checkbox.checked = false; // Đặt lại trạng thái checkbox
        }
      }, [location]); // Kích hoạt khi `location` thay đổi

    return(
        <header>
        <div className="bg_menu" data-aos="fade" data-aos-easing="linear" data-aos-duration="700">
            <div className="min_warp">
                <div className="wap_menu">
                    <div className="logo">
                        <Link to="/">
                            <img  onClick={handleLogoClick} src="/image/Logo.png" alt="Logo PARADICO"/>
                        </Link>
                    </div>
                    {/* <!-- logo --> */}
                  <div className="wap_menu2">
                    <div className="wap_menu3">
                    <nav className="navbar">
                        <ul className="list_menu">
                            <li>
                            <NavLink  to="/" activeClassName="active">
                                Trang chủ
                            </NavLink>
                            </li>
                            <li>
                            <NavLink   to="/phong" activeClassName="active">
                                Phòng
                            </NavLink>
                            </li>
                            <li className="has-submenu">
                            <NavLink   to="/dichvu" activeClassName="active">
                                Dịch vụ tại Paradiso
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12px" viewBox="0 0 128 128">
                                <g><path d="m64 88c-1.023 0-2.047-.391-2.828-1.172l-40-40c-1.563-1.563-1.563-4.094 0-5.656s4.094-1.563 5.656 0l37.172 37.172 37.172-37.172c1.563-1.563 4.094-1.563 5.656 0s1.563 4.094 0 5.656l-40 40c-.781.781-1.805 1.172-2.828 1.172z"></path></g>
                                </svg>
                            </NavLink>
                            <ul className="menuList-submain">
                                <li>
                                <NavLink   to="/dichvu/nhahang" activeClassName="active">
                                    Nhà hàng
                                </NavLink>
                                </li>
                                <li>
                                <NavLink   to="/dichvu/tiecsukien" activeClassName="active">
                                    Tiệc &amp; Sự kiện
                                </NavLink>
                                </li>
                                <li>
                                <NavLink   to="/dichvu/spa" activeClassName="active">
                                    Spa &amp; Massage
                                </NavLink>
                                </li>
                            </ul>
                            </li>
                            <li>
                            <NavLink   to="/cndulich" activeClassName="active">
                                Cẩm nang du lịch
                            </NavLink>
                            </li>
                            <li>
                            <NavLink   to="/gioithieu" activeClassName="active">
                                Giới thiệu
                            </NavLink>
                            </li>
                            <li>
                            <NavLink   to="/lienhe" activeClassName="active">
                                Liên hệ
                            </NavLink>
                            </li>
                        </ul>
                    </nav>
                        <div className="wap_login_contact">
                            {isLoggedIn ? (
                                <div className="user-display"  ref={dropdownRef}>
                                <Link   to={'/thich'}>
                                    <span className="num_cart" ><i height class="fa-light fa-heart"></i>
                                    <p className="num_click_c" id="card_num">{favoriteCount}</p>
                                    </span>
                                </Link>
                                    <span id="menuButton" onClick={toggleDropdown} className="user-name">{user.ten_user}</span>
                                   <img
                                        id="menuButton"
                                        onClick={toggleDropdown}
                                        src={imageUrl||defaultAvatar}
                                        alt="User"
                                        className="user-image"
                                    />
                                    {showDropdown && (
                                        <div id="dropdown" className="dropdown_user_logout" >
                                            <Link to={``} onClick={handleGoToProfile}>
                                               <div className="bg_btn_login_out">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16px" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                                                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                                                        <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"></path>
                                                    </svg>
                                                    <span>
                                                        Hồ sơ cá nhân
                                                    </span>
                                               </div>
                                            </Link>
                                            <Link to="/" onClick={handleLogout}>
                                            <div className="bg_btn_login_out">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16px" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"></path>
                                                    <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"></path>
                                                </svg>
                                                <span>
                                                    Đăng xuất
                                                </span>
                                            </div>
                                            </Link>
                                        </div>
                                )}  
                                </div>
                            ) : (
                                <>
                                    <div className="header_hotline">
                                      <Link to={'/dk_dn'}><span>Đăng Nhập</span></Link>
                                    </div>
                                    <div className="contact_menu">
                                        <a href="#">
                                            <button className="ocean-button" id="oceanButton">Liên hệ ngay</button>
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                  </div>
                    {/* <!-- nav -->
                    <!-- navmobile -->npmnpm s
                    <!-- hiển thị thanh slidebar mobile bằng input checked --> */}
                    <label  htmlFor="click_open_close" className="menu_icon" id="menu-icon"><i className="fa-light fa-bars"></i></label>
                    <input hidden type="checkbox" name="" className="nav_input" id="click_open_close"/>
                    <label  htmlFor="click_open_close" className="box_overlay"></label>
                        {/* <!-- slidebar mobile --> */}
                        <div className="sidebar_mobile">
                            <label  htmlFor="click_open_close" className="x_sdide_bar"><i className="fa-sharp fa-regular fa-x"></i></label>
                            <div className="logo_mb" onClick={handleLogoClick}>
                                <Link to="/">
                                    <img src="/image/Logo.png" alt="Logo Paradiso"/>
                                </Link>
                            </div>
                            <div className="dkdn_mb">
                            {isLoggedIn ? (
                                      <div className="user-actions">
                                      <span onClick={handleLogoClick} className="t_dkdn_mb">
                                        <Link to={'/infor_user'}>Chào {user?.ten_user}!</Link>
                                      </span>
                                      <ul className="user-menu">
                                        <li>
                                          <Link to={'/infor_user'} onClick={handleLogoClick}>
                                            Hồ sơ cá nhân
                                          </Link>
                                        </li>
                                        <li className='log_out'>
                                          <button onClick={handleLogout} className="logout-button">
                                            Đăng xuất
                                          </button>
                                        </li>
                                      </ul>
                                    </div>
                                ) : (
                                    <p className="t_dkdn_mb">Đăng nhập để hưởng những đặc quyền dành riêng cho thành viên.</p>
                                )}
                                {!isLoggedIn && <Link to={'/dk_dn'}>Đăng nhập &amp; Đăng ký</Link>}
                            </div>
                            <div className="wap_menu_mobile"> 
                                <ul className="menu_mobile">
                                    <li onClick={handleLogoClick} ><Link to={'/'} className="active" >Trang chủ</Link></li>
                                    <li className="has-submenu">
                                        <a className={"submenu-toggle" + (active ? ' active' : '')} >Về Paradico <span onClick={() => setActive(!active)}><i className="fa-light fa-chevron-down"></i></span></a>
                                        <ul className={"submenu_mobile" + (active ? ' active' : '')}>
                                            <li onClick={handleLogoClick} ><Link to={''}>lịch sử ra đời</Link></li>
                                        </ul>
                                    </li>
                                    <li ><Link to={'/phong'}>Phòng</Link></li>
                                    <li ><Link to={'/dichvu'}>Dịch vụ</Link></li>
                                    <li ><Link to={'/cndulich'}>Cẩm nang du lịch</Link></li>
                                    <li ><Link to={'/gioithieu'}>Giới thiệu</Link></li>
                                    <li ><Link to={'/lienhe'}>Liên hệ</Link></li>
                                </ul>
                                <ul className="list_social_rwd">
                                    <li>
                                        <Link to={''}>
                                            <i className="fa-brands fa-facebook-f"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={''}>
                                            <i className="fa-brands fa-x-twitter"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={''}>
                                            <i className="fa-brands fa-square-instagram"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={''}>
                                            <i className="fa-brands fa-youtube"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- slidebar mobile -->
                    <!-- navmobile --> */}
                </div>
            </div>
        </div>
       </header>
    )
}
export default Header;
