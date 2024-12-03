import React from "react";
import { useEffect, useState } from "react";
// import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function ChuaXacNhan() {
    const [ listSP, ganListSP] = useState([])
    
    const navigate = useNavigate()
    function formatDate(dateString) {
        const [year, month, day] = dateString.split('-');
          return `${day}/${month}/${year}`;
        }

    const fetchData = () => {
        fetch('https://anh-api-tong.onrender.com/donhangchuacoc')
            .then(res => res.json())
            .then(data => 
                ganListSP(data))
            .catch(err => console.error('Lỗi khi tải dữ liệu:', err));
    };
    
    useEffect(() => {
        fetchData(); // Gọi hàm fetch data khi component được mount
    }, []);
    const xoaSP = (id) => {
        if (window.confirm('Xác nhận xóa ') === false) return;
        fetch(`https://anh-api-tong.onrender.com/donhangchuacoc/${id}`, { method: "DELETE" })
            .then(res => res.json())
            .then(data => {
                alert('Đã xóa thành công');
                fetchData(); // Tải lại dữ liệu sau khi xóa
                navigate("/admin_homestay/")
            })
            .catch(err => console.error('Lỗi khi xóa:', err));
    };
    const xacNhanDatCoc = (id) => {
        if (window.confirm('Xác nhận trạng thái thanh toán là "đã đặt cọc"?') === false) return;
    
        fetch(`https://anh-api-tong.onrender.com/booking/homestay/${id}`, { 
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message || 'Cập nhật thành công!');
            fetchData(); // Tải lại danh sách sau khi cập nhật
        })
        .catch(err => console.error('Lỗi khi cập nhật trạng thái:', err));
    };
        return(
            <div class="admin_table_pra_nhanvien_wrapper">
            <h2 class="admin_table_pra_nhanvien_title">Danh Sách Đơn Hàng Chờ Xác Nhận</h2>
            <table class="admin_table_pra_nhanvien">
                <thead>
                    <tr>
                        <th width="9%" class="admin_table_pra_nhanvien_id">Id đơn hàng</th>
                        <th class="admin_table_pra_nhanvien_name">Tên người đặt</th>
                        <th class="admin_table_pra_nhanvien_sdt">Sđt</th>
                        <th class="admin_table_pra_nhanvien_ngaydat">Tên homestay</th>
                        <th class="admin_table_pra_nhanvien_ngaydat">Ngày đặt</th>
                        <th class="admin_table_pra_nhanvien_ngaytra">Ngày trả</th>
                        <th class="admin_table_pra_nhanvien_tongtien">Tổng tiền</th>
                        <th class="admin_table_pra_nhanvien_tiencoc">Tiền cọc trước</th>
                        <th class="admin_table_pra_nhanvien_description red-text">Trạng thái thanh toán</th>
                        <th class="admin_table_pra_nhanvien_function">Chức Năng</th>
                    </tr>
                </thead>
                <tbody>
                    {listSP.map((sp, index) => (
                        <tr key={sp.id_Loai}>
                            <td class="admin_table_pra_id">{sp.id_DatHomestay}</td>
                            <td class="admin_table_pra_name">{sp.ten_user}</td>
                            <td class="admin_table_pra_description">{sp.sdt_user}</td>
                            <td class="admin_table_pra_description">{sp.ten_homestay}</td>
                            <td class="admin_table_pra_ngaydat">
                                {new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(sp.ngay_dat))}
                            </td>
                            <td class="admin_table_pra_ngaytra">
                                {new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(sp.ngay_tra))}
                            </td>
                            <td class="admin_table_pra_tongtien">{Number(sp.tong_tien_dat).toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                            </td>
                            <td className="admin_table_pra_tiencoc">
                                {Number(sp.tong_tien_dat * 0.3).toLocaleString('vi-VN', {  // Tính 30% của tổng tiền
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </td>
                            <td class="admin_table_pra_description red-text">{sp.TT_Thanhtoan}</td>
                            <td class="tooltip_table_admin">
                                <button 
                                    class="btn_table_admin btn-primary_table_admin" 
                                    onClick={() => xacNhanDatCoc(sp.id_DatHomestay)}
                                >
                                    Xác nhận
                                 
                                </button>
                                &nbsp;
                                <button
                                    class="btn_table_admin btn-danger_table_admin"
                                    onClick={() => xoaSP(sp.id_DatHomestay)}
                                >
                                    Xóa
                                  
                                </button>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        
        )

}

// function PhanTrang({ listSP, pageSize }) {
//     const [fromIndex, setfromIndex] = useState(0);
//     const toIndex = fromIndex + pageSize
//     const spTrong1Trang = listSP.slice(fromIndex, toIndex)
//     const tongSotrang = Math.ceil(listSP.length / pageSize )
//     const chuyenTrang = (event) =>{
//         const newIndex = (event.selected * pageSize) % listSP.length
//         setfromIndex(newIndex)
//     }
//     return (
//         <div>
//             <HienSPTrongMotTrang spTrongTrang = {spTrong1Trang}/>
//             <ReactPaginate nextLabel=">" previousLabel="<" pageCount={tongSotrang}
//              pageRangeDisplayed={5} onPageChange={chuyenTrang} className="thanhphantrang" 
//             />
//         </div>
//     );
// }
// function HienSPTrongMotTrang({spTrongTrang}) {
//     const [listSP, ganListSP] = useState([])
//     const navigate = useNavigate()
//     useEffect(() => {
//         fetch('https://anh-api-tong.onrender.com/admin/sp')
//        .then(res => res.json())
//        .then(data => ganListSP(data))
//     }, [])
//     const xoaSP = (id) =>{
//         if (window.confirm('Xác nhận xóa ')===false) return false;
//         fetch(`https://anh-api-tong.onrender.com/admin/sp/${id}`, {method:"delete"})
//         .then(res => res.json())
//         .then(data => navigate(0))
            
        
//     }
//     return (
//         <div id="data"> 
//             {spTrongTrang.map( (sp, index)=>{return(
//                 <div className="sp" key={index}>
//                     <h5 className="sp" key={0}>
//                     <b>Tên SP</b> <b>Ngày</b> <b>Giá</b> <b><a href="/admin/spthem">Thêm</a></b> 
//                 </h5>
//                 {listSP.map( (sp, index) =>(
//                     <div className="sp" key={sp.id_sp}>
//                         <span>{sp.ten_sp}</span> <span>{sp.ngay}</span> <span>{sp.gia}  </span>
//                         <span>
//                             <a href="#/" className="btn btn-danger" onClick={() =>xoaSP(sp.id)}>Xóa</a> &nbsp;
//                             <Link to={"/admin/spsua/"+sp.id} className="btn btn-primary"> Sửa</Link>
//                         </span>
//                     </div>
//                 ))}
                   
                
//                 </div>
//             )}) //map
//         }
//         </div>
// )}

export default ChuaXacNhan;