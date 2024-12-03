import React from "react";
import { useEffect, useState } from "react";
// import ReactPaginate from "react-paginate";


function DonHang() {
    const [ listSP, ganListSP] = useState([])
    const fetchData = () => {
        fetch('https://anh-api-tong.onrender.comdonhangdathanhtoan')
            .then(res => res.json())
            .then(data => 
                ganListSP(data))
            .catch(err => console.error('Lỗi khi tải dữ liệu:', err));
    };
    
    useEffect(() => {
        fetchData(); // Gọi hàm fetch data khi component được mount
    }, []);
    
    useEffect(() => {
        fetchData(); // Gọi hàm fetch data khi component được mount
    }, []);
    
        return(
            <div class="admin_table_pra_wrapper">
            <h2 class="admin_table_pra_title">Danh Sách Đã Thanh Toán</h2>
            <table class="admin_table_pra">
                <thead>
                    <tr>
                        <th width="9%" class="admin_table_pra_id">Id đơn hàng</th>
                        <th class="admin_table_pra_name">Tên người đặt</th>
                        <th class="admin_table_pra_sdt">Sđt</th>
                        <th class="admin_table_pra_sdt">Tên phòng đã đặt</th>
                     
                        <th class="admin_table_pra_tongtien">Tổng tiền</th>
                        <th class="admin_table_pra_tongtien">Ngày lập đơn</th>
                        <th class="admin_table_pra_tongtien">Nhân viên xác nhận</th>
                        <th class="admin_table_pra_function">Trạng thái thanh toán</th>
                    </tr>
                </thead>
                <tbody>
                    {listSP.map((sp, index) => (
                        <tr key={sp.id_DatHomestay}>
                            <td class="admin_table_pra_id">{sp.id_DatHomestay}</td>
                            <td class="admin_table_pra_name">{sp.ten_user}</td>
                            <td class="admin_table_pra_description">{sp.sdt_user}</td>
                            <td class="admin_table_pra_description">{sp.ten_homestay}</td>

                            <td class="admin_table_pra_tongtien">{Number(sp.tong_tien_dat).toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                            </td>
                            <td class="admin_table_pra_tongtien">22/10/2024</td>
                            <td class="admin_table_pra_tongtien">Nhân viên 1</td>
                            <td class="admin_table_pra_description green-text">{sp.TT_Thanhtoan}</td>
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
//         fetch('https://anh-api-tong.onrender.comadmin/sp')
//        .then(res => res.json())
//        .then(data => ganListSP(data))
//     }, [])
//     const xoaSP = (id) =>{
//         if (window.confirm('Xác nhận xóa ')===false) return false;
//         fetch(`https://anh-api-tong.onrender.comadmin/sp/${id}`, {method:"delete"})
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

export default DonHang;