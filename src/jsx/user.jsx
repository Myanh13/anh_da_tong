import React, { useState, useEffect } from 'react';
// import './App.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Lấy danh sách người dùng từ API
  const fetchUsers = () => {
    fetch('https://anh-api-tong.onrender.com/admin/users')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('Dữ liệu không phải là mảng:', data);
        }
      })
      .catch(error => {
        console.error('Có lỗi khi lấy dữ liệu người dùng!', error);
      });
  };

  // Chỉnh sửa người dùng
  const handleEdit = (user) => {
    setEditUser(user.id_user);
    setName(user.ten_user);
    setEmail(user.email_user);
    setRole(user.role_id); 
  };

  // Xóa người dùng
  const handleDelete = (id) => {
    fetch(`https://anh-api-tong.onrender.com/admin/users/${id}`, { method: 'DELETE' })
      .then(() => {
        fetchUsers();
      })
      .catch(error => {
        console.error('Có lỗi khi xóa người dùng!', error);
      });
  };

  // Lưu cập nhật người dùng
  const handleSave = () => {
    const updatedUser = { ten_user: name, email_user: email, role_id: role };
    fetch(`https://anh-api-tong.onrender.com/admin/users/${editUser}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then(() => {
        setEditUser(null);
        fetchUsers();
      })
      .catch(error => {
        console.error('Có lỗi khi cập nhật người dùng!', error);
      });
  };

  return (
    <div className="main">
      <div className="danh">124</div>
       <div>
      <h1>Quản lý người dùng</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id_user}>
              <td>{user.id_user}</td>
              <td>{editUser === user.id_user ? <input value={name} onChange={(e) => setName(e.target.value)} /> : user.ten_user}</td> 
              <td>{editUser === user.id_user ? <input value={email} onChange={(e) => setEmail(e.target.value)} /> : user.email_user}</td>
              <td>{editUser === user.id_user ? (
                <select value={role} onChange={(e) => setRole(parseInt(e.target.value))}>
                  <option value={0}>User</option>
                  <option value={1}>Admin</option>
                </select>
              ) : (user.role_id === 1 ? 'Admin' : 'User')}</td>
              <td>
                {editUser === user.id_user ? (
                  <button onClick={handleSave}>Lưu</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(user)}>Sửa</button>
                    <button onClick={() => handleDelete(user.id_user)}>Xóa</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       </div>
    </div>
   
  );
};

export default UserManagement;
