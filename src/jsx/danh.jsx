import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const DK_DN = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [email_user, setEmail] = useState('');
  const [pass_user, setPassword] = useState('');
  const [sdt_user, setDienThoai] = useState('');
  const [ten_user, setName] = useState('');
  const [showRegisterLink, setShowRegisterLink] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State để kiểm soát hiển thị mật khẩu
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };
  //măt ẩn hiện password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  ///check emai và dang ký
  const handleRegistration = async (event) => {
    event.preventDefault();
  
    if (email_user === '' || pass_user === '' || sdt_user === '' || ten_user === '') {
      alert('Vui lòng nhập đủ thông tin đăng ký');
      return;
    }
  
    // Regex cho email (chỉ chấp nhận tên miền .com)
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    if (!emailRegex.test(email_user)) {
      setError('Vui lòng nhập đúng định dạng email (.com)');
      return;
    }
  
    // Regex cho số điện thoại Việt Nam (10 chữ số và bắt đầu bằng 0)
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(sdt_user)) {
      setError('Vui lòng nhập số điện thoại hợp lệ (10 chữ số và bắt đầu bằng 0)');
      return;
    }
  
    try {
      // Kiểm tra email đã tồn tại trong cơ sở dữ liệu
      const response = await fetch('https://anh-api-tong.onrender.com/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email_user }),
      });
  
      const data = await response.json();
      if (data.exists) {
        setError('Email đã được đăng ký. Vui lòng sử dụng email khác.');
        return;
      }
  
      // Thực hiện đăng ký nếu email chưa tồn tại
      let url = 'https://anh-api-tong.onrender.com/Register';
      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_user, pass_user, sdt_user, ten_user }),
      };
  
      fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setError('Lỗi đăng ký: ' + data.error);
          } else {
            alert('Đăng ký thành công');
            navigate('/dk_dn');
            // Reset form đăng ký
            setEmail('');
            setPassword('');
            setDienThoai('');
            setName('');
             // Làm mới lại trang để reset state và dữ liệu
             window.location.reload();
          }
        });
      } catch (error) {
        setError('Có lỗi xảy ra, vui lòng thử lại');
      }
  };
  ///dang nhap
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('https://anh-api-tong.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_user, pass_user }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Đăng nhập thành công:', data);
        setShowRegisterLink('true');
        localStorage.setItem('auth', JSON.stringify(data.user));
  
        // Điều hướng dựa trên role_id
        if (data.user.role === 2) {
          // Nếu role là 2, chuyển đến trang admin
          alert('Đăng nhập thành công với quyền ADMIN.');
          navigate('/admin');
        } else if (data.user.role === 1) {
            // Nếu role là 1, chuyển đến trang chủ và reset (reload) trang
            alert('Đăng nhập thành công! Chào mừng ' + data.user.name);
            
            // Lưu thông tin người dùng vào localStorage
              localStorage.setItem('auth', JSON.stringify(data.user));
          
            // Điều hướng đến trang chủ
            navigate('/');
          
            // Làm mới lại trang để reset state và dữ liệu
            window.location.reload(); // Đây sẽ reload lại trang và reset lại mọi trạng thái
          } else {
          // Xử lý nếu vai trò không xác định
          setError('Vai trò người dùng không xác định.');
        }
      } else {
        // Hiển thị thông báo lỗi nếu đăng nhập không thành công
        setError(data.message);
        setShowRegisterLink('false');
      }
    } catch (error) {
      setError('Có lỗi xảy ra khi đăng nhập');
      setShowRegisterLink('false');
    }
  };
  

  return (
    <div className="main">
    <div className="danh">121</div>
    <div className="wap_form_dk_dn">
        <div className={`container_dk_dn ${isRightPanelActive ? 'right-panel-active_dk_dn' : ''}`} id="container_dk_dn">
           
            {/* Form Đăng Nhập */}
            <div className="form-container_dk_dn sign-in-container_dk_dn">
                <form className="form_dk_dn" onSubmit={handleSubmit}>
                    <h1 className="Auth-form-title_dk_dn">Đăng Nhập</h1>
                    <input
                        type="email"
                        className="form-control_dk_dn"
                        placeholder="Email"
                        value={email_user}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className="password-input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control_dk_dn"
                            placeholder="Mật Khẩu"
                            value={pass_user}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className="toggle-password" onClick={togglePasswordVisibility}>
                            {showPassword ? '👁️' : '👁️‍🗨️'}
                        </span>
                    </div>
                    <button className="btn_dk_dn">Đăng nhập</button>
                    <Link to="/quen_pass" className="forgot-password">Bạn quên mật khẩu?</Link>
                    {error && <div className="error-message">{error}</div>}
                </form>
            </div>
           
            {/* Form Đăng Ký */}
            <div className="form-container_dk_dn sign-up-container_dk_dn">
                <form className="form_dk_dn" onSubmit={handleRegistration}>
                    <h1 className="Auth-form-title_dk_dn">Đăng Ký</h1>
                    <input
                        type="text"
                        className="form-control_dk_dn"
                        placeholder="Họ và Tên"
                        value={ten_user}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        className="form-control_dk_dn"
                        placeholder="Email"
                        value={email_user}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className="password-input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control_dk_dn"
                            placeholder="Mật Khẩu"
                            value={pass_user}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className="toggle-password" onClick={togglePasswordVisibility}>
                            {showPassword ? '👁️' : '👁️‍🗨️'}
                        </span>
                    </div>
                    <input
                        type="text"
                        className="form-control_dk_dn"
                        placeholder="Số Điện Thoại"
                        value={sdt_user}
                        onChange={(e) => setDienThoai(e.target.value)}
                        required
                    />
                    <button className="btn_dk_dn">Đăng ký</button>
                    {error && <div className="error-message">{error}</div>}
                </form>
            </div>

            {/* Phần Overlay */}
            <div className="overlay-container_dk_dn">
                <div className="overlay_dk_dn">
                    <div className="overlay-panel_dk_dn overlay-left_dk_dn">
                        <h1>Chào mừng trở lại!</h1>
                        <p>Để giữ kết nối với chúng tôi, vui lòng đăng nhập bằng thông tin cá nhân của bạn</p>
                        <button className="ghost_dk_dn" onClick={handleSignInClick}>Đăng Nhập tài khoản</button>
                    </div>
                    <div className="overlay-panel_dk_dn overlay-right_dk_dn">
                        <h1>Xin chào!</h1>
                        <p>Nhập thông tin cá nhân của bạn và bắt đầu hành trình với chúng tôi</p>
                        <button className="ghost_dk_dn" onClick={handleSignUpClick}>Đăng Ký tài khoản</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

  );
};

export default DK_DN;
