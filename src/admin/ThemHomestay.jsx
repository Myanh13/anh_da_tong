import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';



const ThemHomestay = () => {
    const navigate = useNavigate();
    const [sp, setSp] = useState({
        id_homestay: '',
        ten_homestay: '',
        gia_homestay: '',
        mota: '',
        TrangThai: '',
        id_Loai: '',
        id_hinh: '',
        url_hinh: ''
    });

    
    const submitDuLieu = () => {
        // Kiểm tra dữ liệu trước khi gửi
        if (!sp.ten_homestay || !sp.gia_homestay || !sp.url_hinh) {
            console.error('Thiếu thông tin bắt buộc');
            return;
        }

        const url = `https://anh-api-tong.onrender.com/admin/homestay/`;
        const opt = {
            method: 'post',
            body: JSON.stringify(sp),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        fetch(url, opt)
            .then(res => {
                // Kiểm tra kiểu phản hồi
                const contentType = res.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    return res.json();
                } else {
                    return res.text(); // Nếu không phải JSON, xử lý dưới dạng văn bản
                }
            })
            .then(data => {
                // Hiển thị thông báo thành công và điều hướng
                alert('Thêm homestay thành công!');
                navigate('/admin_homestay'); // Điều hướng về trang danh sách
            })
            .catch(error => console.error('Có lỗi xảy ra:', error));
    };

    

    return (
       
        <div className="container_admin_pra _add_form_pra">
        <h2>Thêm Homestay</h2>
        <form>
            <div className="form-group_admin_pra">
                <label htmlFor="productName">Tên Sản Phẩm</label>
                <input 
                    type="text" 
                    id="productName" 
                    name="productName" 
                    required 
                    onChange={e => setSp({ ...sp, ten_homestay: e.target.value })}
                />
            </div>
            <div className="form-group_admin_pra">
                <label htmlFor="productPrice">Giá</label>
                <input 
                    type="number" 
                    id="productPrice" 
                    name="productPrice" 
                    required 
                    onChange={e => setSp({ ...sp, gia_homestay: e.target.value })}
                />
            </div>
            <div className="form-group_admin_pra">
                <label htmlFor="productDescription">Mô Tả</label>
                <textarea 
                    id="productDescription" 
                    name="productDescription" 
                    rows="4" 
                    required 
                    onChange={e => setSp({ ...sp, mota: e.target.value })}
                ></textarea>
            </div>
            <div className="form-group_admin_pra">
                <label htmlFor="productCategory">Trạng thái</label>
                <input 
                    type="text" 
                    id="productCategory" 
                    name="productCategory" 
                    required 
                    onChange={e => setSp({ ...sp, TrangThai: e.target.value })}
                />
            </div>
            <div className="form-group_admin_pra">
                <label htmlFor="productCategory">Loại</label>
                <input 
                    type="text" 
                    id="productCategory" 
                    name="productCategory" 
                    required 
                    onChange={e => setSp({ ...sp, id_Loai: e.target.value })}
                />
            </div>
            <div className="form-group_admin_pra">
                <label htmlFor="productImage">Hình Ảnh</label>
                <input 
                    type="file" 
                    id="productImage" 
                    name="productImage" 
                    required 
                    onChange={e => setSp({ ...sp, image: e.target.files[0] })}
                />
            </div>
            <div className="form-group_admin_pra">
                <button className="btn btn-warning" type="button" onClick={submitDuLieu}>Thêm sản phẩm</button> &nbsp;
                <button className="btn btn-warning" type="button" ><a href="/admin_danhsach" className="btn btn-info">Danh sách</a></button> 
            </div>
        </form>
        </div>
    
    );
};

export default ThemHomestay;
