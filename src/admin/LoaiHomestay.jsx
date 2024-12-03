import React from "react";
import { useEffect, useState } from "react";
// import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

function LoaiHomestay() {
    const [ listSP, ganListSP] = useState([])
    const navigate = useNavigate()
    const fetchData = () => {
        fetch('https://anh-api-tong.onrender.com/admin/loai/')
            .then(res => res.json())
            .then(data => ganListSP(data))
            .catch(err => console.error('Lỗi khi tải dữ liệu:', err));
    };
    
    useEffect(() => {
        fetchData(); // Gọi hàm fetch data khi component được mount
    }, []);
    const xoaSP = (id) => {
        if (window.confirm('Xác nhận xóa ') === false) return;
        fetch(`https://anh-api-tong.onrender.com/admin/loai/${id}`, { method: "DELETE" })
            .then(res => res.json())
            .then(data => {
                alert('Đã xóa thành công');
                fetchData(); // Tải lại dữ liệu sau khi xóa
                navigate("/admin_loaihomestay/")
            })
            .catch(err => console.error('Lỗi khi xóa:', err));
    };
        return(
            <div class="admin_table_pra_wrapper">
            <h2 class="admin_table_pra_title">Danh Sách Loại Homestay</h2>
            <table class="admin_table_pra">
                <thead>
                    <tr>
                        <th class="admin_table_pra_id">ID</th>
                        <th class="admin_table_pra_name">Tên Loại</th>
                        <th class="admin_table_pra_description">Mô Tả</th>
                        <th class="admin_table_pra_function">Chức Năng</th>
                    </tr>
                </thead>
                <tbody>
                    {listSP.map((sp, index) => (
                        <tr key={sp.id_Loai}>
                            <td class="admin_table_pra_id">{sp.id_Loai}</td>
                            <td class="admin_table_pra_name">{sp.Ten_Loai}</td>
                            <td class="admin_table_pra_description">{sp.Mo_ta}</td>
                            <td class="tooltip_table_admin">
                                <button
                                    class="btn_table_admin btn-danger_table_admin"
                                    onClick={() => xoaSP(sp.id_Loai)}
                                >
                                    Xóa
                                    <span class="tooltiptext_table_admin">Xóa Loại Homestay</span>
                                </button>
                                &nbsp;
                                <Link
                                    to={`/admin_update_loai/${sp.id_Loai}`}
                                    class="btn_table_admin btn-primary_table_admin"
                                >
                                    Sửa
                                    <span class="tooltiptext_table_admin">Sửa thông tin Loại Homestay</span>
                                </Link>
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

export default LoaiHomestay;