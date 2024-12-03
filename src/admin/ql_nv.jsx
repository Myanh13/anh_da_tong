import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Ql_nv = () => {
  const { id } = useParams(); // Lấy id nếu cần
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null); // Người dùng đang được chỉnh sửa
  const [addUserState, setAddUserState] = useState({
    ten_user: '',
    email_user: '',
    sdt_user: '',
    password: '000', // Mật khẩu mặc định
    role_id: 1, // Vai trò mặc định
  });
  const [sp, setSp] = useState({
    ten_user: '',
    email_user: '',
    sdt_user: '',   // Số điện thoại
    password: '000', // Mật khẩu mặc định là 000
    role_id: 1,
  });

  // State để quản lý form Thêm người dùng
  const [isAdding, setIsAdding] = useState(false);

  // Lấy danh sách người dùng hoặc thông tin chi tiết khi trang tải
  useEffect(() => {
    if (id) {
      // Nếu có ID trong URL, lấy thông tin người dùng
      fetch(`https://anh-api-tong.onrender.com/admin/user/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setSp(data);
            setEditUser(id);
          } else {
            console.error('Không tìm thấy người dùng!');
          }
        })
        .catch((error) => console.error('Có lỗi khi lấy thông tin người dùng!', error));
    } else {
      // Nếu không có ID, lấy danh sách người dùng
      fetchUsers();
    }
  }, [id]);

  const fetchUsers = () => {
    fetch('https://anh-api-tong.onrender.com/admin/nhanvien/role')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('Dữ liệu không phải là mảng:', data);
        }
      })
      .catch((error) => {
        console.error('Có lỗi khi lấy dữ liệu người dùng!', error);
      });
  };

  // Chỉnh sửa người dùng
  const handleEdit = (user) => {
    setEditUser(user.id_user);
    setSp({
      ten_user: user.ten_user,
      email_user: user.email_user,
      sdt_user: user.sdt_user || '',
      role_id: user.role_id,
    });
  };

  // Xóa người dùng
  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa người dùng này không?')) {
      fetch(`https://anh-api-tong.onrender.com/admin/nhanvien/${id}`, { method: 'DELETE' })
        .then(() => {
          alert('Xóa người dùng thành công!');
          fetchUsers(); // Cập nhật lại danh sách
        })
        .catch((error) => {
          console.error('Có lỗi khi xóa người dùng!', error);
          alert('Không thể xóa người dùng. Vui lòng thử lại!');
        });
    }
  };

  // Lưu cập nhật người dùng
  const handleSave = () => {
    if (!sp.ten_user || !sp.email_user) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc.');
      return;
    }
   // Regex cho email (chỉ chấp nhận tên miền .com)
   const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
   if (!emailRegex.test(sp.email_user)) {
     alert('Vui lòng nhập đúng định dạng email (.com)');
     return;
   }
 
   // Regex cho số điện thoại Việt Nam (10 chữ số và bắt đầu bằng 0)
   const phoneRegex = /^0\d{9}$/;
   if (sp.sdt_user && !phoneRegex.test(sp.sdt_user)) {
     alert('Vui lòng nhập số điện thoại hợp lệ (10 chữ số và bắt đầu bằng 0)');
     return;
   }
    const url = `https://anh-api-tong.onrender.com/admin/nhanvien/${editUser || id}`;
    const opt = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sp),
    };

    fetch(url, opt)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Cập nhật thất bại');
        }
        return response.json();
      })
      .then(() => {
        alert('Cập nhật người dùng thành công!');
        setEditUser(null); // Hủy chế độ chỉnh sửa
        fetchUsers(); // Cập nhật danh sách
      })
      .catch((error) => {
        console.error('Có lỗi khi cập nhật người dùng!', error);
        alert('Không thể cập nhật người dùng. Vui lòng thử lại!');
      });
  };

  // Thêm người dùng mới
  const handleAddUser = async () => {
    // Kiểm tra thông tin bắt buộc
    if (!addUserState.ten_user || !addUserState.email_user) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc.');
      return;
    }
  
    // Regex cho email (chỉ chấp nhận tên miền .com)
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    if (!emailRegex.test(addUserState.email_user)) {
      alert('Vui lòng nhập đúng định dạng email (.com)');
      return;
    }
  
    // Regex cho số điện thoại Việt Nam (10 chữ số và bắt đầu bằng 0)
    const phoneRegex = /^0\d{9}$/;
    if (addUserState.sdt_user && !phoneRegex.test(addUserState.sdt_user)) {
      alert('Vui lòng nhập số điện thoại hợp lệ (10 chữ số và bắt đầu bằng 0)');
      return;
    }
  
    try {
      // Kiểm tra email đã tồn tại trong cơ sở dữ liệu
      const emailCheckResponse = await fetch('https://anh-api-tong.onrender.com/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: addUserState.email_user }),
      });
  
      const emailCheckData = await emailCheckResponse.json();
      if (emailCheckData.exists) {
        alert('Email đã được đăng ký. Vui lòng sử dụng email khác.');
        return;
      }
  
      // Gửi yêu cầu POST để thêm người dùng
      const response = await fetch('https://anh-api-tong.onrender.com/admin/nhanvien', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addUserState),
      });
  
      const data = await response.json();
      alert('Thêm người dùng thành công!');
      setIsAdding(false); // Đóng form sau khi thêm
      fetchUsers(); // Cập nhật lại danh sách người dùng
      setAddUserState({
        ten_user: '',
        email_user: '',
        sdt_user: '',
        password: '0000', // Reset mật khẩu về mặc định
        role_id: 1, // Reset vai trò về mặc định
      }); // Reset form
    } catch (error) {
      console.error('Có lỗi khi thêm người dùng!', error);
      alert('Không thể thêm người dùng. Vui lòng thử lại!');
    }
  };
  

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSp((prev) => ({
      ...prev,
      [name]: name === 'role_id' ? parseInt(value) : value, // Chuyển role_id thành số
    }));
  };
  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddUserState((prev) => ({
      ...prev,
      [name]: name === 'role_id' ? parseInt(value) : value,
    }));
  };
  return (
    <div className="admin_table_pra_wrapper">
         {/* Nút thêm người dùng */}
         <button className="btn_table_admin btn-add_table_admin" onClick={() => setIsAdding(true)}>
        Thêm Nhân Viên
      </button>
        <h2 className="admin_table_pra_title">Quản lý Nhân Viên</h2>

      {/* Form Thêm người dùng */}
      {isAdding && (
  <div className="add-user-form">
    <input
      type="text"
      name="ten_user"
      value={addUserState.ten_user}
      onChange={handleAddChange}
      placeholder="Tên người dùng"
    />
    <input
      type="email"
      name="email_user"
      value={addUserState.email_user}
      onChange={handleAddChange}
      placeholder="Email"
      required
    />
    <input
      type="number"
      name="sdt_user"
      value={addUserState.sdt_user}
      onChange={handleAddChange}
      placeholder="Số điện thoại"
      required
    />
    <div className="wap_btn_admin">
      <button className="btn-save_table_admin" onClick={handleAddUser}>
        Lưu
      </button>
      <button className="btn-cancel_table_admin" onClick={() => setIsAdding(false)}>
        Hủy
      </button>
    </div>
  </div>
)}
      <table className="admin_table_pra">
        <thead>
          <tr>
            <th className="admin_table_pra_id">ID</th>
            <th className="admin_table_pra_name">Tên</th>
            <th className="admin_table_pra_email">Email</th>
            <th className="admin_table_pra_role">Vai trò</th>
            <th className="admin_table_pra_function">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id_user}>
              <td className="admin_table_pra_id">{user.id_user}</td>
              <td className="admin_table_pra_name">
                {editUser === user.id_user ? (
                  <input
                    name="ten_user"
                    value={sp.ten_user}
                    onChange={handleChange}
                  />
                ) : (
                  user.ten_user
                )}
              </td>
              <td className="admin_table_pra_email">
                {editUser === user.id_user ? (
                  <input
                    name="email_user"
                    value={sp.email_user}
                    onChange={handleChange}
                  />
                ) : (
                  user.email_user
                )}
              </td>
              <td className="admin_table_pra_role">
                {editUser === user.id_user ? (
                  <select
                    name="role_id"
                    value={sp.role_id}
                    onChange={handleChange}
                  >
                    <option value={0}>Admin</option>
                    <option value={1}>Nhân viên</option>
                    <option value={2}>User</option>
                  </select>
                ) : user.role_id === 0 ? (
                  'Admin'
                ) : user.role_id === 1 ? (
                  'Nhân viên'
                ) : (
                  'User'
                )}
              </td>
              <td className="admin_table_pra_function">
                {editUser === user.id_user ? (
                  <button
                    className="btn_table_admin btn-save_table_admin"
                    onClick={handleSave}
                  >
                    Lưu
                  </button>
                ) : (
                  <>
                    <button
                      className="btn_table_admin btn-primary_table_admin"
                      onClick={() => handleEdit(user)}
                    >
                      Sửa
                    </button>
                    <button
                      className="btn_table_admin btn-danger_table_admin"
                      onClick={() => handleDelete(user.id_user)}
                    >
                      Xóa
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ql_nv;
