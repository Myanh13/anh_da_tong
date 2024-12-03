import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRole }) => {
    const location = useLocation(); // Lấy đường dẫn hiện tại
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
    const storedUser = JSON.parse(localStorage.getItem('auth')); // Lấy thông tin từ localStorage

    useEffect(() => {
        // Kiểm tra trạng thái đăng nhập khi component mount
        if (!storedUser) {
            setIsLoggedIn(false);
        }
    }, [storedUser]);

    console.log(storedUser);

    // Điều hướng theo vai trò
    if (!storedUser) {
        return <Navigate to="/dk_dn" replace />; // Chưa đăng nhập
    }

    const { role } = storedUser;

    // Kiểm tra quyền truy cập
    if (role === 0) {
        // Admin: Cho phép vào các trang con của /admin
        if (!location.pathname.startsWith("/admin")) {
            return <Navigate to="/admin" replace />; // Chuyển hướng nếu không phải trang admin
        }
        
    } else if (role === 1) {
        // Nhân viên: Luôn vào "/nhanvien"
        if (!location.pathname.startsWith("/nhanvien")) {
            return <Navigate to="/nhanvien" replace />; // Chuyển hướng nếu không phải trang nhân viên
        }
    } else if (role === 2) {
        // Người dùng: Không được vào các trang admin
        if (location.pathname.startsWith("/admin")) {
            return <Navigate to="/unauthorized" replace />; // Chuyển hướng đến trang không đủ quyền
        }
        if (location.pathname.startsWith("/nhanvien")) {
            return <Navigate to="/unauthorized" replace />; // Chuyển hướng đến trang không đủ quyền
        }
        // Người dùng: Luôn vào "/"
        if (location.pathname !== "/") {
            return <Navigate to="/" replace />; // Chuyển hướng nếu không phải trang người dùng
        }
    } else {
        // Người dùng không hợp lệ: Luôn vào "/notfound"
        if (location.pathname !== "/notfound") {
            return <Navigate to="/notfound" replace />; // Chuyển hướng đến trang không tìm thấy
        }
    }

    return children; // Trả về nội dung nếu tất cả điều kiện đều hợp lệ
};

export default PrivateRoute;
