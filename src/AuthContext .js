import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('user'); // Vai trò mặc định là 'user'

    // Kiểm tra localStorage và khôi phục thông tin người dùng khi ứng dụng khởi động lại
    useEffect(() => {
        const storedUser = localStorage.getItem('auth');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setRole(parsedUser.role);  // Cập nhật vai trò từ dữ liệu lưu trong localStorage
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        setRole(userData.role);
    };

    const logout = () => {
        setUser(null);
        setRole('user');
        localStorage.removeItem('auth');  // Xóa thông tin người dùng khỏi localStorage khi đăng xuất
    };

    return (
        <AuthContext.Provider value={{ user, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
