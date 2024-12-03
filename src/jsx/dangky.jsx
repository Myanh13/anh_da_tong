import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './Form.css';


function Registration() {
    const [email_user, setEmail] = useState('');
    const [pass_user, setPassword] = useState('');
    const [sdt_user, setDienThoai] = useState('');
    const [ten_user, setName] = useState('');
    const navigate = useNavigate();

    const handleRegistration = () => {
        if (email_user === '' || pass_user === '' || sdt_user === '' || ten_user === '') {
            alert('Vui lòng nhập đủ thông tin đăng ký');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email_user)) {
            alert('Vui lòng nhập đúng định dạng email');
            return;
        }

        let url = 'https://anh-api-tong.onrender.com/Register';
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email_user, pass_user,sdt_user , ten_user }),
        };

        fetch(url, options)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    alert('Lỗi đăng ký: ' + data.error);
                } else {
                    alert('Đăng ký thành công');
                    navigate('/login');
                }
            })
    };

    return (
        <div className="main_form">
            <div className="danh">231</div>
            <div className="wap_form_dk_dn">
              <div className="form_dangnhap">
              <div className="registration-form_dangnhap">
                <form onSubmit={handleRegistration}>
                  <h1 className="Auth-form-title_dangnhap">Đăng ký</h1>
                  <div className="form-group_dangnhap">
                    <label htmlFor="username" className="label_dangnhap">Họ và Tên</label>
                    <input
                      type="text"
                      className="form-control_dangnhap"
                      placeholder="Nhập Họ và Tên"
                      value={ten_user}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group_dangnhap">
                    <label htmlFor="email" className="label_dangnhap">Email</label>
                    <input
                      type="email"
                      className="form-control_dangnhap"
                      placeholder="Nhập Email"
                      value={email_user}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group_dangnhap">
                    <label htmlFor="password" className="label_dangnhap">Mật Khẩu</label>
                    <input
                      type="password"
                      className="form-control_dangnhap"
                      placeholder="Nhập Mật Khẩu"
                      value={pass_user}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group_dangnhap">
                    <label htmlFor="phone" className="label_dangnhap">Số Điện Thoại</label>
                    <input
                      type="text"
                      className="form-control_dangnhap"
                      placeholder="Số điện thoại"
                      value={sdt_user}
                      onChange={(e) => setDienThoai(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn_dangnhap">
                    Đăng ký
                  </button>
                  <div className="text-center_dangnhap login-link_dangnhap">
                    <p>Bạn đã có tài khoản? <a href="/login" className="register-link_dangnhap">Đăng Nhập</a></p>
                  </div>
                </form>
              </div>
              </div>
            </div>
        </div>

    );
}

export default Registration;