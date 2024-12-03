import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ThemLoai() {
    const navigate = useNavigate(); // Sử dụng useNavigate trong function component
    const [sp, setSp] = useState({
        id_Loai: '',
        ten_Loai: '',
        Mo_Ta: ''
    });

    const submitDuLieu = () => {
        let url = `https://anh-api-tong.onrender.com/admin/loai`
        let opt = {
            method: 'post',
            body: JSON.stringify(sp),
            headers: {
                'Content-Type': 'application/json'
            },
        }
        fetch(url, opt)
            .then(res => res.json())
            .then(data => {
                alert('Thêm loại homestay thành công!');
                navigate('/admin_loaihomestay'); // Điều hướng về trang danh sách
            })
    }

    return (
        <div className="container_admin_pra _add_form_pra">
        <h2>Thêm Loại Homestay</h2>
        <form>
            <div className="form-group_admin_pra">
                <label htmlFor="categoryId">Id Loại Homestay</label>
                <input
                    type="number"
                    id="categoryId"
                    name="categoryId"
                    required
                    onChange={e => setSp({ ...sp, id_Loai: e.target.value })}
                />
            </div>
            <div className="form-group_admin_pra">
                <label htmlFor="categoryName">Tên Loại Homestay</label>
                <input
                    type="text"
                    id="categoryName"
                    name="categoryName"
                    required
                    onChange={e => setSp({ ...sp, ten_Loai: e.target.value })}
                />
            </div>
            <div className="form-group_admin_pra">
                <label htmlFor="categoryDescription">Mô Tả Loại Homestay</label>
                <textarea
                    id="categoryDescription"
                    name="categoryDescription"
                    rows="4"
                    required
                    onChange={e => setSp({ ...sp, Mo_Ta: e.target.value })}
                ></textarea>
            </div>
            <div className="form-group_admin_pra">
                <button className="btn btn-warning" type="button" onClick={submitDuLieu}>
                    Thêm loại
                </button>
                &nbsp;
                <button className="btn btn-warning">
                <Link to="/admin_loaihomestay" className="btn btn-info">
                    Danh sách
                </Link>
                </button>
            </div>
        </form>
    </div>
    
    )
}

export default ThemLoai;
