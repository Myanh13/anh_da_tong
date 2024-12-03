import React from "react";
import { useEffect, useState } from "react";
// import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

function Home_admin() {
    const [ listSP, ganListSP] = useState([])
    const navigate = useNavigate()
    const fetchData = () => {
        fetch('https://anh-api-tong.onrender.com/admin/homestay/')
            .then(res => res.json())
            .then(data => ganListSP(data))
            .catch(err => console.error('Lỗi khi tải dữ liệu:', err));
    };
    
    useEffect(() => {
        fetchData(); // Gọi hàm fetch data khi component được mount
    }, []);
    const xoaSP = (id) => {
        if (window.confirm('Xác nhận xóa ') === false) return;
        fetch(`https://anh-api-tong.onrender.com/admin/homestay/${id}`, { method: "DELETE" })
            .then(res => res.json())
            .then(data => {
                alert('Đã xóa thành công');
                fetchData(); // Tải lại dữ liệu sau khi xóa
                navigate("/admin_homestay/")
            })
            .catch(err => console.error('Lỗi khi xóa:', err));
    };
    return(
        <div class="admin_table_pra_wrapper">
        <h2 class="admin_table_pra_title">Danh Sách Homestay</h2>
        <table class="admin_table_pra">
            <thead>
                <tr>
                    <th class="admin_table_pra_id">ID</th>
                    <th class="admin_table_pra_name">Tên Homestay</th>
                    <th class="admin_table_pra_image">Hình</th>
                    <th class="admin_table_pra_price">Giá Homestay</th>
                    <th class="admin_table_pra_status">Trạng Thái</th>
                    <th class="admin_table_pra_description">Mô Tả</th>
                    <th class="admin_table_pra_function">Chức Năng</th>
                </tr>
            </thead>
            <tbody>
           
            
                {listSP.map((sp, index) => (
                    <tr key={sp.id_homestay}>
                        <td class="admin_table_pra_id">{sp.id_homestay}</td>
                        <td class="admin_table_pra_name">{sp.ten_homestay}</td>
                        <td class="admin_table_pra_image"><img src={sp.url_hinh} alt="Homestay Image" class="admin_table_pra_img" /></td>
                        <td class="admin_table_pra_price">{sp.gia_homestay} <span>VND</span></td>
                        <td class="admin_table_pra_status">{sp.TrangThai}</td>
                        <td class="admin_table_pra_description">{sp.mota}</td>
                        <td class="tooltip_table_admin">
                            <div className="bisai">
                                <button
                                    class="btn_table_admin btn-primary_table_admin">
                                <Link to={`/admin_update_homestay/${sp.id_homestay}`}>
                                    Sửa
                                </Link>
                                </button>
                                &nbsp;
                                
                                <button class="btn_table_admin btn-danger_table_admin" onClick={() => xoaSP(sp.id_homestay)}>
                                    Xóa
                                </button>
                            </div>
                         
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>


    )
    
}
export default Home_admin;