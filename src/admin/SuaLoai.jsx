import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';

const SuaLoai = () => {
    const { id } = useParams(); // Lấy id của loại homestay từ URL
    const [loading, setLoading] = useState(true);
    const [sp, setSp] = useState({
        id_Loai:'',
        Ten_Loai:'',
        Mo_ta : '',
    });

    const navigate = useNavigate();

    // Lấy thông tin homestay từ API khi trang tải
    useEffect(() => {
        const fetchHomestay = async () => {
            console.log(`Fetching data for homestay with ID: ${id}`); // Debug
            try {
                const response = await fetch(`https://anh-api-tong.onrender.com/admin/loai/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log('Data fetched:', data); // Debug
                    setSp(data); // Cập nhật thông tin vào state
                } else {
                    console.error('Không tìm thấy homestay');
                }
            } catch (error) {
                console.error('Có lỗi xảy ra:', error);
            } finally {
                setLoading(false); // Đặt trạng thái tải dữ liệu là false
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
        if ( !sp.id_Loai || !sp.Ten_Loai || !sp.Mo_ta ) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }

        const url = `https://anh-api-tong.onrender.com/admin/loai/${id}`;
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
                navigate('/admin_loaihomestay'); // Điều hướng về trang danh sách
            })
            .catch(error => console.error('Có lỗi xảy ra:', error));
    };

    if (loading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    return (
        <div className="container_admin_pra _add_form_pra">
        <h2>Cập nhật loại Homestay</h2>
        <form>
            <div className="form-group_admin_pra">
                <label htmlFor="idLoai">Id Loại Homestay</label>
                <input 
                    type="number" 
                    id="idLoai" 
                    name="id_Loai" 
                    className="form-control"
                    value={sp.id_Loai || ''} 
                    onChange={handleChange} 
                    required
                />
            </div>
            <div className="form-group_admin_pra">
                <label htmlFor="tenLoai">Tên Loại Homestay</label>
                <input 
                    type="text" 
                    id="tenLoai" 
                    name="Ten_Loai" 
                    className="form-control"
                    value={sp.Ten_Loai || ''} 
                    onChange={handleChange} 
                    required
                />
            </div>
            <div className="form-group_admin_pra">
                <label htmlFor="moTaLoai">Mô Tả Loại Homestay</label>
                <textarea 
                    type="text" 
                    id="moTaLoai" 
                    name="Mo_ta" 
                    className="form-control"
                    value={sp.Mo_ta || ''} 
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
                <button className="btn btn-warning" type="button" ><Link to="/admin_loaihomestay" className="btn btn-info">
                    Danh sách loại
                </Link>
                </button>
            </div>
        </form>
    </div>
    
    );
};

export default SuaLoai;
