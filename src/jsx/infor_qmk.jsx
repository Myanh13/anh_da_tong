import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Infor_User_Qmk() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('auth'));
  const [imageUrl, setImageUrl] = useState(null); // Thêm state này ở đầu file component
  const defaultAvatar = '../../image/user2.png';

  // Kiểm tra xem có dữ liệu người dùng trong localStorage hay không
  useEffect(() => {
    console.log(storedUser);
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

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [errorOldPassword, setErrorOldPassword] = useState("");
  const [errorNewPassword, setErrorNewPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [message, setMessage] = useState('');
  


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

  // Lấy id_user từ localStorage (hoặc từ state nếu có)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset lỗi
    setErrorOldPassword("");
    setErrorNewPassword("");
    setErrorConfirmPassword("");
    setMessage("");

    let hasError = false;

    // Kiểm tra dữ liệu đầu vào
    if (!oldPassword) {
      setErrorOldPassword("Vui lòng nhập mật khẩu cũ.");
      hasError = true;
    }

    if (!newPassword) {
      setErrorNewPassword("Vui lòng nhập mật khẩu mới.");
      hasError = true;
    } else if (newPassword.length < 6) {
      setErrorNewPassword("Mật khẩu mới phải có ít nhất 6 ký tự.");
      hasError = true;
    }

    if (!confirmPassword) {
      setErrorConfirmPassword("Vui lòng nhập lại mật khẩu mới.");
      hasError = true;
    } else if (newPassword !== confirmPassword) {
      setErrorConfirmPassword("Mật khẩu mới và mật khẩu nhập lại không khớp.");
      hasError = true;
    }

    if (hasError) return;

    try {
      // Gửi yêu cầu tới API
      const response = await fetch(
        `https://anh-api-tong.onrender.com/change-password/${storedUser.id_user}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword,
            confirm_password: confirmPassword,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        window.alert(data.message || "Đổi mật khẩu thành công!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const errorData = await response.json();

        // Hiển thị lỗi từ server
        if (errorData.message === "Mật khẩu cũ không chính xác.") {
          setErrorOldPassword(errorData.message);
        } else if (errorData.message === "Mật khẩu mới và mật khẩu nhập lại không khớp.") {
          setErrorConfirmPassword(errorData.message);
        } else {
          setMessage("");
        }
      }
    } catch (err) {
      setMessage("Không thể kết nối tới server.");
    }
  };
  // Hàm xử lý gửi form để thay đổi mật khẩu
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   // Kiểm tra dữ liệu đầu vào
  //   if (!oldPassword || !newPassword || !confirmPassword) {
  //     setError('Vui lòng cung cấp đầy đủ thông tin.');
  //     return;
  //   }
  
  //   if (newPassword !== confirmPassword) {
  //     setError('Mật khẩu mới và mật khẩu nhập lại không khớp.');
  //     return;
  //   }
  
  //   try {
  //     // Gửi yêu cầu thay đổi mật khẩu đến backend sử dụng fetch
  //     const response = await fetch(`https://anh-api-tong.onrender.com/change-password/${storedUser.id_user}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         old_password: oldPassword,
  //         new_password: newPassword,
  //         confirm_password: confirmPassword,
  //       }),
  //     });
  
  //     // Kiểm tra phản hồi từ server
  //     if (response.ok) {
  //       const data = await response.json();
  //       setMessage(data.message || 'Đổi mật khẩu thành công!');
  //       setError(''); // Xóa lỗi cũ nếu có
  //     } else {
  //       const errorData = await response.json();
  //       setError(errorData.message || 'Có lỗi xảy ra khi thay đổi mật khẩu.');
  //       setMessage(''); // Xóa thông báo thành công nếu có
  //     }
  //   } catch (err) {
  //     // Xử lý lỗi kết nối
  //     setError('Không thể kết nối tới server.');
  //     setMessage(''); // Xóa thông báo thành công nếu có
  //   }
  // };

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
            <div className="box_tieude">
              <h1>Đổi mật khẩu</h1>
            </div>
            <form method="post" className="form_repass" onSubmit={handleSubmit}>
              <label htmlFor="old_pass">Mật khẩu cũ <span className="require">*</span></label>
              <input type="password" id="old_pass" name="old_pass" 
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}/>
                 <p className="error_field_text">{errorOldPassword}</p>

              <label htmlFor="new_pass">Mật khẩu mới <span className="require">*</span></label>
              <input type="password" id="new_pass" name="new_pass"  value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}/>
             <p className="error_field_text">{errorNewPassword}</p>

              <label htmlFor="new_pass_again">Nhập lại mật khẩu mới <span className="require">*</span></label>
              <input type="password" id="new_pass_again" name="new_pass_again"  value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}/>
             <p className="error_field_text">{errorConfirmPassword}</p>

              <button type="submit" name="doimatkhau" value="Đặt lại mật khẩu" className="btn btn-primary btn-style btn-login">Đặt lại mật khẩu mới</button>
            </form>
            <br />
          </div>
          <div className="tab">
            <h1 className="tab_title">Tài khoản</h1>
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

export default Infor_User_Qmk;
