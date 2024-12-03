import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Infor_User() {
  const [user, setUser] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem('auth'));
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState(null); // Thêm state này ở đầu file component
  const defaultAvatar = '../../image/user2.png';
  const navigate = useNavigate();

  

 // Kiểm tra xem có dữ liệu người dùng trong localStorage hay không
//   useEffect(() => {
//   console.log(storedUser);
//   if (storedUser) {
//     // Nếu có thông tin người dùng trong localStorage, set state user
//     setUser(storedUser);

//     // Gửi yêu cầu tới server để lấy thêm dữ liệu người dùng nếu cần
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(`https://anh-api-tong.onrender.com/user/${storedUser.id_user}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setUser(data.user); // Cập nhật thông tin người dùng từ server
//         } else {
//           console.error('Lỗi khi lấy thông tin người dùng từ server');
//         }
//       } catch (error) {
//         console.error('Có lỗi xảy ra khi kết nối tới server:', error);
//       }
//     };
//     fetchUserData(); // Gọi hàm lấy dữ liệu người dùng từ server
//   }
// }, []);

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

// const handleFileChange = async (event) => {
//   const file = event.target.files[0];
//   if (file) {
//     const formData = new FormData();
//     formData.append('avatar', file);
//     formData.append('id_user', storedUser.id_user);

//     try {
//       const response = await fetch(`https://anh-api-tong.onrender.com/user/${storedUser.id_user}/avatar`, {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setMessage('Avatar updated successfully!');

//         // Cập nhật URL hình ảnh sau khi upload
//         setImageUrl(`https://anh-api-tong.onrender.com${data.avatarPath}`);
//       } else {
//         setMessage('Failed to update avatar');
//       }
//     } catch (error) {
//       console.error('Error when connecting to the server:', error);
//     }
//   }
// };



  // Hàm đăng xuất
  
    // Hàm xử lý thay đổi file (tải lên ảnh đại diện)
  
  
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
  
    // Ảnh đại diện mặc định nếu người dùng không có ảnh

  
  
  
  
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

{/* <div className="profile-container_infor_nguoidung">
  <div className="profile-avatar_infor_nguoidung">
  <img 
        src={imageUrl || defaultAvatar} 
        alt="Avatar" 
        width="100" 
        height="100"
      />

    <div
      className="change-avatar-icon"
      onClick={() => document.getElementById('avatarInput').click()}
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
    <p>{message}</p>
  </div>
  <div className="profile-info_infor_nguoidung">
    <h2>{user?.id_user}. {user?.ten_user}</h2>
    <p><span className="icon_infor_nguoidung"><i className="fa-solid fa-phone"></i></span> {user?.sdt_user}</p>
    <p><span className="icon_infor_nguoidung"><i className="fa-solid fa-envelope"></i></span> {user?.email_user}</p>
  </div>
</div> */}
    
               

                {/* <div className="main_title">Xin Chào <span className="primary">{user.ten_user}</span></div> */}
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
            <div className="box_content">
              <div className="box_tieude">
                <h1>Thông Tin Tài Khoản</h1>
                {/* <a className="to_capnhat" href="thong-tin-tai-khoan.htm">Cập Nhật Thông Tin</a> */}
              </div>
              <div className="content_tt">
                <div className="left">
                  <p>Họ và Tên</p>
                  <p>Điện Thoại</p>
                  <p>Email</p>
                  <p>Địa Chỉ</p>
                  <p>Ngày Sinh</p>
                  <p>Giới Tính</p>
                </div>
                <div className="right">
                <p>{user.ten_user}</p>
                <p> {user.sdt_user}</p>
                <p>{user.email_user}</p>
                <p>{user.address}</p>
                <p>{new Date(user.dob).toLocaleDateString('vi-VN') }</p>
                <p>{user.gender === '1' ? 'Nam' : user.gender === '2' ? 'Nữ' : 'chưa cập nhật'}</p>
                </div>
              </div>
            </div>

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
              <div onClick={handleLogout}  className="tab_item logout_user">
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

export default Infor_User;
