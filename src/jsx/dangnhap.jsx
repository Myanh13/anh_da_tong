

// export default LoginForm;
// import './Form.css';
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom'
const LoginForm = () => {
    const [email_user, setEmail] = useState("");
    const [pass_user, setPassword] = useState("");
    const [showRegisterLink, setShowRegisterLink] = useState('');
    const [error, setError] = useState('');
    // const navigate = useNavigate(); 
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
                setShowRegisterLink('true')
                localStorage.setItem('auth' , JSON.stringify(data.user))
                setTimeout(()=>{
                    window.location.href ='http://localhost:3500';
                },3000)
            } else {
                setError(data.message || 'Đăng nhập không thành công');
                setShowRegisterLink('false')
            }
        } catch (error) {
            setError('Có lỗi xảy ra khi đăng nhập');
            setShowRegisterLink('false')
        }
    };
    return (
        <div className="main_form">
            <div className="danh">242</div>
            <div className="wap_form_dk_dn">
                <div className="form_dangnhap">
                    <form className="Auth-form_dangnhap" onSubmit={handleSubmit}>
                        <div className="Auth-form-content_dangnhap">
                        <h3 className="Auth-form-title_dangnhap">Đăng nhập</h3>
                        <div className="form-group_dangnhap mt-3">
                            <label htmlFor="email" className="label_dangnhap">Email</label>
                            <input
                            type="email"
                            className="form-control_dangnhap"
                            id="email"
                            placeholder="Enter email"
                            value={email_user}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                        </div>
                        <div className="form-group_dangnhap mt-3">
                            <label htmlFor="password" className="label_dangnhap">Password</label>
                            <input
                            type="password"
                            className="form-control_dangnhap"
                            id="password"
                            placeholder="Enter password"
                            value={pass_user}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                        </div>
                        <div className="d-grid_dangnhap gap-2_dangnhap mt-3">
                            <button type="submit" className="btn_dangnhap btn-primary_dangnhap">
                            Đăng nhập
                            </button>
                        </div>
                        {showRegisterLink === '' ? null : (
                            showRegisterLink === 'true' ? (
                            <div className="mt-3 text-center_dangnhap text-success_dangnhap">
                                Đăng nhập thành công, chuyển hướng sau 3s
                            </div>
                            ) : (
                            <div className="mt-3 text-center_dangnhap text-danger_dangnhap">
                                {error}
                                <br />
                                <Link to="/register" className="register-link_dangnhap">Đăng ký tại đây</Link>
                            </div>
                            )
                        )}
                        </div>
                    </form>
                </div>
            </div>
           
        </div>
       
    );
};

export default LoginForm;
