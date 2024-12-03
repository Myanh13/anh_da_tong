import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

const SuaHomestay = () => {
    const { id } = useParams(); // Lấy id của homestay từ URL
    
    const [sp, setSp] = useState({
        id_homestay: '',
        ten_homestay: '',
        gia_homestay: '',
        mota: '',
        TrangThai: '',
        id_Loai: '',
        id_hinh: '',
        url_hinh: '',
    });

    const navigate = useNavigate();

    // Lấy thông tin homestay từ API khi trang tải
    // useEffect(() => {
    //     const fetchHomestay = async () => {
    //         console.log(`Fetching data for homestay with ID: ${id}`); // Debug
    //         try {
    //             const response = await fetch(`https://anh-api-tong.onrender.com/admin/homestay/${id}`);
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 console.log('Data fetched:', data); // Debug
    //                 setSp(data); // Cập nhật thông tin vào state
    //             } else {
    //                 console.error('Không tìm thấy homestay');
    //             }
    //         } catch (error) {
    //             console.error('Có lỗi xảy ra:', error);
    //         } finally {
    //             setLoading(false); // Đặt trạng thái tải dữ liệu là false
    //         }
    //     };
    //     fetchHomestay();
    // }, [id]);
    useEffect(() => {
        const fetchHomestay = async () => {
            try {
                const response = await fetch(`https://anh-api-tong.onrender.com/admin/homestay/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log('Data fetched:', data);
    
                    // Vì data là một mảng, nên cần lấy đối tượng đầu tiên
                    if (Array.isArray(data) && data.length > 0) {
                        setSp(data[0]); // Sử dụng phần tử đầu tiên của mảng
                    } else {
                        console.error('Không có dữ liệu hợp lệ');
                    }
                } else {
                    console.error('Không tìm thấy homestay');
                }
            } catch (error) {
                console.error('Có lỗi xảy ra:', error);
            }
        };
        fetchHomestay();
    }, [id]);

    const handleChange = (e) => {
        setSp({
            ...sp,
            [e.target.name]: e.target.value
        });
    };

    const submitDuLieu = () => {
        // Kiểm tra dữ liệu trước khi gửi
        console.log('Submitting data:', sp); // Debug
        if (!sp.id_homestay ||!sp.ten_homestay || !sp.gia_homestay || !sp.mota || !sp.TrangThai|| !sp.id_Loai  || !sp.id_hinh || !sp.url_hinh) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }

        const url = `https://anh-api-tong.onrender.com/admin/homestay/${id}`;
        const opt = {
            method: 'PUT',
            body: JSON.stringify(sp),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        fetch(url, opt)
            .then(res => res.json())
            .then(data => {
                console.log('Update response:', data); // Debug
                alert('Cập nhật homestay thành công!');
                navigate('/admin_homestay'); // Điều hướng về trang danh sách
            })
            .catch(error => console.error('Có lỗi xảy ra:', error));
    };


    return (
<div className="container_admin_pra _add_form_pra">
    <h2>Cập nhật Homestay</h2>
    <form>
        <div className="form-group_admin_pra">
            <label htmlFor="tenHomestay">Tên Homestay</label>
            <input 
                type="text" 
                id="tenHomestay" 
                name="ten_homestay" 
                className="form-control"
                value={sp.ten_homestay || ''} 
                onChange={handleChange} 
                required
            />
        </div>
        <div className="form-group_admin_pra">
            <label htmlFor="giaHomestay">Giá Homestay</label>
            <input 
                type="number" 
                id="giaHomestay" 
                name="gia_homestay" 
                className="form-control"
                value={sp.gia_homestay || ''} 
                onChange={handleChange} 
                required
            />
        </div>
        <div className="form-group_admin_pra">
            <label htmlFor="moTa">Mô Tả</label>
            <textarea 
                type="text" 
                id="moTa" 
                name="mota" 
                className="form-control"
                value={sp.mota || ''} 
                onChange={handleChange} 
                required
            />
        </div>
        <div className="form-group_admin_pra">
            <label htmlFor="trangThai">Trạng Thái</label>
            <input 
                type="text" 
                id="trangThai" 
                name="TrangThai" 
                className="form-control"
                value={sp.TrangThai || ''} 
                onChange={handleChange} 
                required
            />
        </div>
        <div className="form-group_admin_pra">
            <label htmlFor="urlHinh">URL Hình</label>
            <input 
                type="text" 
                id="urlHinh" 
                name="url_hinh" 
                className="form-control"
                value={sp.url_hinh || ''} 
                onChange={handleChange} 
                required
            />
        </div>
        <div className="form-group_admin_pra">
            <button 
                className="btn btn-warning" 
                type="button" 
                onClick={submitDuLieu}
            >
                Cập nhật
            </button>
            &nbsp;
            <button className="btn btn-warning" type="button" ><a href="/admin_danhsach" className="btn btn-info">Danh sách</a></button> 
        </div>
    </form>
</div>

    );
};

export default SuaHomestay;
