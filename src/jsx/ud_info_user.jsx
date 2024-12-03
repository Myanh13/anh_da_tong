import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Ud_Infor_User() {

  const [user, setUser] = useState(null);
  const [message] = useState("");
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('auth'));
  const [imageUrl, setImageUrl] = useState(null);
  const defaultAvatar = '../../image/user2.png';
  

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
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('id_user', storedUser.id_user);

      try {
        const response = await fetch(`https://anh-api-tong.onrender.com/user/${storedUser.id_user}/avatar`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          alert('Cập nhật ảnh đại diện thành công!');

          // Cập nhật URL ảnh đại diện mới
          setImageUrl(`https://anh-api-tong.onrender.com${data.avatarPath}`);
        } else {
          alert('Cập nhật ảnh đại diện thất bại');
        }
      } catch (error) {
        console.error('Lỗi khi kết nối với server:', error);
      }
    }
  };





  // Hàm đăng xuất
  const handleLogout = () => {
    // Hiển thị thông báo xác nhận
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn đăng xuất không?');
    
    if (isConfirmed) {
      // Xóa thông tin người dùng khi đăng xuất
      localStorage.removeItem('auth');
      setUser(null); // Đặt lại state user về null
  
      // Điều hướng người dùng về trang đăng nhập hoặc trang chủ
      navigate('/');
      window.location.reload(); // Tải lại trang
    }
  };

  // Kiểm tra xem có dữ liệu người dùng trong localStorage hay không
  useEffect(() => {
    if (storedUser) {
      // Nếu có thông tin người dùng trong localStorage, set state user
      setUser(storedUser);

      // Gửi yêu cầu tới server để lấy thêm dữ liệu người dùng nếu cần
      const fetchUserData = async () => {
        try {
          const response = await fetch(`https://anh-api-tong.onrender.com/user/${storedUser.id_user}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (response.ok) {
            const data = await response.json();
            setUser(data.user); // Cập nhật thông tin người dùng từ server
          } else {
            console.error('Lỗi khi lấy thông tin người dùng từ server');
          }
        } catch (error) {
          console.error('Có lỗi xảy ra khi kết nối tới server:', error);
        }
      };
      fetchUserData(); // Gọi hàm lấy dữ liệu người dùng từ server
    }
  }, []);

  //update info
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Kiểm tra thông tin người dùng trong localStorage
  
    // Nếu không có thông tin người dùng trong localStorage, dừng lại
    if (!storedUser) {
      alert("Không tìm thấy thông tin người dùng.");
      return;
    }
  
    const id_user = storedUser.id_user; // Lấy id_user từ localStorage
    // Cập nhật thông tin người dùng từ state nếu có, nếu không thì từ localStorage
    const updatedUser = {
      id_user: user?.id_user || storedUser?.id_user || '',
      ten_user: user?.ten_user || storedUser?.ten_user || '',
      sdt_user: user?.sdt_user || storedUser?.sdt_user || '',
      email_user: user?.email_user || storedUser?.email_user || '',
      address: user?.address || storedUser?.address || '',
      gender: user?.gender || storedUser?.gender || '',
      dob: user?.dob || storedUser?.dob || '',
    };
     // Kiểm tra các trường hợp hợp lệ trước khi gửi yêu cầu
  if (updatedUser.ten_user.length > 16) {
    alert('Tên không được quá 16 ký tự.');
    return;
  }

  // Kiểm tra số điện thoại
  const phoneRegex = /^0\d{9}$/; // Chỉ cho phép 10 chữ số cho số điện thoại
  if (!phoneRegex.test(updatedUser.sdt_user)) {
    alert('Số điện thoại không hợp lệ. Vui lòng nhập lại.');
    return;
  }

  // Kiểm tra email
  const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
  if (!emailRegex.test(updatedUser.email_user)) {
    alert('Email không hợp lệ. Vui lòng nhập lại.');
    return;
  }
  
    try {
      const response = await fetch(`https://anh-api-tong.onrender.com/user/${id_user}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert('Cập nhật thông tin thành công');
        // Cập nhật lại thông tin người dùng trong ứng dụng (state hoặc localStorage)
        localStorage.setItem('auth', JSON.stringify(updatedUser)); // Cập nhật lại localStorage nếu cần
        window.location.reload();
      } else {
        alert(data.thongbao || 'Có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Có lỗi xảy ra khi cập nhật:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  // Xử lý thay đổi giá trị trong các trường input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

// Chuyển đổi ngày sinh về định dạng yyyy-mm-dd
  const formatDate = (date) => {
    // Kiểm tra xem date có hợp lệ không
    if (!date) return '';
    
    const localDate = new Date(date);
    // Chuyển đổi thành định dạng yyyy-mm-dd
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');  // Thêm 1 vì tháng bắt đầu từ 0
    const day = String(localDate.getDate()).padStart(2, '0'); // Đảm bảo ngày có 2 chữ số
    
    return `${year}-${month}-${day}`;
  };


  if (!user) {
    // Nếu không có người dùng, có thể hiển thị trang đăng nhập hoặc thông báo khác
    return <div>Chưa đăng nhập. Vui lòng đăng nhập lại.</div>;
  }
  return (
    <div className="main">
      <div className="danh">123</div>
      <div className="body_profile min_warp2">
        <div className="main_tk">
          <div className="thongtin">
            <div className="box_user">
                <div className="profile-container_infor_nguoidung">
                      <div className="profile-card_infor_nguoidung">
                      <div className="profile-avatar_infor_nguoidung">
                      <img src={imageUrl || defaultAvatar} alt="Avatar" />
                        <div
                          className="change-avatar-icon"
                          onClick={() => document.getElementById("avatarInput").click()}
                        >
                          <i className="fa-regular fa-image"></i>
                          <input
                            hidden
                            id="avatarInput"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                        </div>
                    </div>
                          <div className="profile-info_infor_nguoidung">
                              <h2>{user.id_user}. {user.ten_user}</h2>
                              <p><span className="icon_infor_nguoidung"><i class="fa-solid fa-phone"></i> </span> {user.sdt_user}</p>
                              <p><span className="icon_infor_nguoidung"><i class="fa-solid fa-envelope"></i></span>  {user.email_user}</p>
                          </div>
                      </div>
                </div>
            </div>
            <div className="box_link">
              <Link to={'/infor_user'} className="tab_item active">
                <i className="fa-light fa-circle-info"></i>
                Thông Tin Tài Khoản
              </Link>
              <Link to={'/ud_infor'} className="tab_item">
                <i className="fa-light fa-user"></i>
                Chỉnh Sửa Tài Khoản
              </Link>
              <Link to={'/quen_mk'} className="tab_item">
                <i className="fa-light fa-lock"></i>
                Đổi Mật Khẩu
              </Link>
              <Link to={'/ql_dhang'} className="tab_item">
                <i className="fa-light fa-clipboard-list"></i>
                Quản Lí Đơn Hàng
              </Link>
            </div>
            <form method="post" className="edit_user" onSubmit={handleSubmit}>
              <div className="left">
                <div className="field">
                  <label htmlFor="ten">Tên</label>
                  <input
                    type="text"
                    name="ten_user"
                    id="ten"
                    placeholder="Tên"
                    value={user.ten_user || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="dt">Điện Thoại</label>
                  <input
                    type="text"
                    name="sdt_user"
                    id="dt"
                    placeholder="Điện Thoại"
                    value={user.sdt_user || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="dc">Địa Chỉ</label>
                  <input
                    type="text"
                    name="address"
                    id="dc"
                    placeholder="Địa Chỉ"
                    value={user.address || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="right">
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email_user"
                    id="email"
                    placeholder="Email"
                    value={user.email_user || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="field date_field">
                  <label htmlFor="ngaysinh">Ngày Sinh</label>
                  <input
                    type="date"
                    name="dob"
                    id="ngaysinh"
                    placeholder="Ngày Sinh"
                    value={user.dob ? formatDate(user.dob) : ''}  // Chuyển đổi ngày sinh về định dạng yyyy-mm-dd
                    onChange={handleInputChange}
                  />
                </div>
                <div className="field radio_field">
                  <p className="title_gioitinh">Giới Tính</p>
                  <div className="wrap_sex">
                    <label htmlFor="nam">Nam</label>
                    <input
                      type="radio"
                      name="gender"
                      id="nam"
                      value="1"
                      checked={user.gender === "1"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="nu">Nữ</label>
                    <input
                      type="radio"
                      name="gender"
                      id="nu"
                      value="2"
                      checked={user.gender === "2"}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <button
                    className="btn_edituser btn btn-primary btn-style btn-login"
                    type="submit"
                    name="edituser"
                    id="edituser"
                  >
                    Lưu Thông Tin
                  </button>
                </div>
              </div>
            </form>
            {message && <p>{message}</p>}
          </div>
          <div className="tab">
            <h1 className="tab_title">Tài Khoản</h1>
            <div className="tab_list">
              <Link to={'/infor_user'} className="link active">
                <i className="fa-light fa-circle-info"></i>
                Thông Tin Tài Khoản
              </Link>
              <Link to={'/ud_infor'} className="link">
                <i className="fa-light fa-user"></i>
                Chỉnh Sửa Tài Khoản
              </Link>
              <Link to={'/quen_mk'} className="link">
                <i className="fa-light fa-lock"></i>
                Đổi Mật Khẩu
              </Link>
              <Link to={'/ql_dhang'} className="link">
                <i className="fa-light fa-clipboard-list"></i>
                Quản Lí Đơn Hàng
              </Link>
              <div onClick={handleLogout} className="tab_item logout_user">
                <i className="fa-sharp fa-regular fa-period"></i>
                Đăng Xuất
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ud_Infor_User;
