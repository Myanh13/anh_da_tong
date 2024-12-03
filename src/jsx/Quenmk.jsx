import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';


const ResetPasswordForm = () => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState({ text: "", type: "" });
    const navigate = useNavigate(); // Sử dụng useNavigate để chuyển hướng
    const [showPassword, setShowPassword] = useState(false); // State để kiểm soát hiển thị mật khẩu

     //măt ẩn hiện password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

    const handleResetPassword = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://anh-api-tong.onrender.com/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email_user: email,
                    phone_number: phone,
                    new_password: newPassword
                })
            });

            const data = await response.json();

            if (!response.ok) {
                // Nếu có lỗi, hiển thị thông báo lỗi màu đỏ
                setMessage({ text: data.message || 'Đặt lại mật khẩu không thành công', type: 'error' });
            } else {
                // Nếu thành công, hiển thị thông báo thành công màu xanh lá
                setMessage({ text: data.message || 'Đặt lại mật khẩu thành công', type: 'success' });
                
                // Reset form
                setEmail("");
                setPhone("");
                setNewPassword("");

                // Chuyển đến trang đăng nhập sau một khoảng thời gian ngắn để người dùng thấy thông báo thành công
                setTimeout(() => {
                    navigate('/dk_dn');
                }, 2000); // 2 giây
            }
        } catch (error) {
            setMessage({ text: "Có lỗi xảy ra khi kết nối đến server", type: 'error' });
        }
    };
    return (
        <div className="main">
            <div className="danh">123</div>
            <div className="form_page_qmk">
                <form className="Auth-form_page_qmk" onSubmit={handleResetPassword}>
                    <h3 className="h3_white">Đặt lại mật khẩu</h3>
                    <div className="input-group_page_qmk">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} placeholder="Nhập email..."
                            required
                        />
                    </div>
                    <div className="input-group_page_qmk">
                        <label>Số điện thoại:</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)} placeholder="Số điện thoại..."
                            required
                        />
                    </div>
                    <div className="input-group_page_qmk">
                        <label>Mật khẩu mới:</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Nhập mật khẩu mới..."
                            required
                        />
                         <span className="toggle-password2" onClick={togglePasswordVisibility}>
                            {showPassword ? '👁️' : '👁️‍🗨️'}
                        </span>
                    </div>
                    <button type="submit" className="submit-button_page_qmk">Đặt lại mật khẩu</button>
                    {message && (
                    <div className={`message_page_qmk ${message.type}`}>
                        {message.text}
                    </div>
                        )}
                    <Link to="/dk_dn" className="forgot-password">trở về đăng nhập</Link>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
