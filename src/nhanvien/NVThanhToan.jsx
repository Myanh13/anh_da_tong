import React, { useState, useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";

function ThanhToan() {
  const { id } = useParams(); // Lấy id đơn hàng từ URL
  const [voucherStatus, setVoucherStatus] = useState(""); // Trạng thái voucher
  const [voucherInput, setVoucherInput] = useState(""); // Input mã voucher
  const [voucherDiscount, setVoucherDiscount] = useState(0); // Phần trăm giảm giá từ voucher
  const [totalAmount, setTotalAmount] = useState(0); // Tổng tiền sau giảm giá
  const navigate = useNavigate()
  const [orderDetails, setOrderDetails] = useState({

    id_DatHomestay: "",
    id_homestay: "",
    ten_homestay: "",
    ten_user: "",
    sdt_user: "",
    email_user: "",
    ngay_dat: "",
    ngay_tra: "",
    tong_tien_dat: 0,
    tien_coc_truoc: 0,
    voucher: "", // Mã voucher
  });
// Hàm format ngày theo định dạng DD/MM/YY
const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return ''; // Nếu ngày không hợp lệ, trả về chuỗi trống
  
  const day = String(date.getDate()).padStart(2, '0'); // Lấy ngày và thêm 0 nếu chỉ có 1 chữ số
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Lấy tháng (tháng bắt đầu từ 0 nên cộng thêm 1)
  const year = String(date.getFullYear()).slice(0); // Lấy 2 chữ số cuối của năm

  return `${day}/${month}/${year}`;
};

  // Fetch dữ liệu đơn hàng
  useEffect(() => {
    fetch(`https://anh-api-tong.onrender.com/donhangdacoc/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Dữ liệu trả về:", data);
        setOrderDetails(data);
        setTotalAmount(data.tong_tien_dat); // Khởi tạo tổng tiền khi lấy dữ liệu
      })
      .catch((error) => console.error("Lỗi khi tải dữ liệu đơn hàng:", error));
  }, [id]);

  // Tính toán số ngày ở
  const calculateStayDuration = () => {
    if (orderDetails.ngay_dat && orderDetails.ngay_tra) {
      const ngayDat = new Date(orderDetails.ngay_dat);
      const ngayTra = new Date(orderDetails.ngay_tra);
      if (isNaN(ngayDat) || isNaN(ngayTra)) return 0;
  
      const soNgayO = Math.ceil((ngayTra - ngayDat) / (1000 * 60 * 60 * 24));
      return soNgayO > 0 ? soNgayO : 0;
    }
    return 0;
  };

  // Tính toán tiền còn lại sau tiền cọc
  const calculateAmountDue = () => {
    const tienCocTruoc = orderDetails.tien_coc_truoc || 0;
    const tongTien = orderDetails.tong_tien_dat || 0;
    return tongTien - tienCocTruoc;
  };

  // Tính toán tổng cộng (sau khi áp dụng chiết khấu từ voucher)
  const calculateTotal = () => {
    const remainingAmount = calculateAmountDue(); // Số tiền còn lại
    if (voucherDiscount > 0) {
      return remainingAmount - (remainingAmount * (voucherDiscount / 100)); // Áp dụng phần trăm giảm giá
    }
    return remainingAmount; // Nếu không có voucher, trả lại số tiền còn lại
  };
  

  // Xử lý thanh toán
  const handlePayment = () => {
    const updatedOrder = {
      TT_Thanhtoan: "Đã thanh toán",  // Trạng thái thanh toán
      tong_tien_dat: totalAmount,      // Tổng tiền
    };
  
    console.log("Dữ liệu gửi lên backend:", updatedOrder);  // In dữ liệu gửi lên
  
    fetch(`https://anh-api-tong.onrender.com/donhangdathanhtoan/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOrder),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Phản hồi từ backend:", data);  // In phản hồi từ backend
        if (data.message === "Cập nhật thành công!") {
          alert("Thanh toán thành công!");
          navigate('/nhanvien_dathanhtoan/')
        } else {
          alert(data.message || "Có lỗi xảy ra khi thanh toán.");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi thanh toán:", error);
        alert("Đã xảy ra lỗi khi thanh toán.");
      });
  };
  
  
  
  
  
  
  // Hàm kiểm tra mã voucher
 // Hàm kiểm tra mã voucher
const handleCheckVoucher = async () => {
  try {
    const voucherCode = voucherInput.trim(); // Xóa khoảng trắng thừa từ input

    // Định nghĩa danh sách mã voucher và chiết khấu tương ứng
    const voucherList = {
      PRDS20: 20, // Mã giảm giá 20%
      PRDS30: 30, // Mã giảm giá 30%
      PRDS50: 50, // Mã giảm giá 50%
    };

    // Kiểm tra xem mã voucher có tồn tại trong danh sách không
    if (voucherCode in voucherList) {
      const discount = voucherList[voucherCode];
      setVoucherDiscount(discount); // Cập nhật phần trăm giảm giá
      setVoucherStatus(`Mã hợp lệ: Giảm ${discount}%`);
    } else {
      setVoucherDiscount(0); // Đặt giảm giá về 0 nếu mã không hợp lệ
      setVoucherStatus("Mã không hợp lệ!");
    }
  } catch (error) {
    console.error("Lỗi khi kiểm tra mã voucher:", error);
    setVoucherStatus("Có lỗi xảy ra khi kiểm tra mã!");
  }
};


  // Cập nhật tổng tiền sau khi áp dụng voucher
  useEffect(() => {
  setTotalAmount(calculateTotal());
}, [voucherDiscount, orderDetails]);

  return (
    <div className="payment-container">
      <h2>Thông tin thanh toán</h2>
      <form>
        <div className="form-group nhanvien">
          <label>ID Đơn hàng:</label>
          <input type="text" value={orderDetails.id_DatHomestay} readOnly />
        </div>
        <div className="form-group nhanvien">
          <label>Tên Homestay:</label>
          <input type="text" value={orderDetails.ten_homestay} readOnly />
        </div>
        <div className="form-group nhanvien">
          <label>Tên Người Đặt:</label>
          <input type="text" value={orderDetails.ten_user} readOnly />
        </div>
        <div className="form-group nhanvien">
          <label>Số điện thoại người đặt:</label>
          <input type="text" value={orderDetails.sdt_user} readOnly />
        </div>
        <div className="form-group nhanvien">
          <label>Ngày Đặt:</label>
          <input value={formatDate(orderDetails.ngay_dat)} readOnly />
        </div>
        <div className="form-group nhanvien">
          <label>Ngày Trả:</label>
          <input value={formatDate(orderDetails.ngay_tra)} readOnly />
        </div>
        <div className="form-group-horizontal voucher-group">
  <label>Mã Voucher:</label>
  <div className="voucher-input-container">
    <input
      type="text"
      value={voucherInput}
      onChange={(e) => setVoucherInput(e.target.value)}
      placeholder="Nhập mã voucher"
    />
    <button type="button" onClick={handleCheckVoucher}>
    Áp dụng
    </button>
  </div>
</div>
<p className="voucher-status red-text">{voucherStatus}</p>
        <div className="summary-row">
            <span className="summary-label">Tổng Tiền Ban Đầu Trong {calculateStayDuration()} ngày</span>
            <span className="summary-value">
              {orderDetails.tong_tien_dat.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
        <div className="payment-summary">
        <div className="summary-row">
            <span className="summary-label">Tiền đã cọc:</span>
            <span className="summary-value">
              {Number(calculateAmountDue() - orderDetails.tong_tien_dat *0.7).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div> 
        <div className="summary-row">
            <span className="summary-label">Tiền còn lại:</span>
            <span className="summary-value">
              {Number(calculateAmountDue()-(calculateAmountDue()- orderDetails.tong_tien_dat *0.7)).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Chiết khấu (Voucher):</span>
            <span className="summary-value">
              {voucherDiscount > 0
                ? `- ${(calculateAmountDue() * (voucherDiscount / 100)).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}`
                : "0 VND"}
            </span>
          </div>
          <div className="total-amount-row">
            <span className="total-label">Tổng Tiền:</span>
            <span className="total-value">
              {Number((calculateAmountDue()-(calculateAmountDue()- orderDetails.tong_tien_dat *0.7)) - (calculateAmountDue() * (voucherDiscount / 100))).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
              
            </span>
          </div>

        </div>
        <div className="voucher-input-container">
        <button type="button" onClick={handlePayment}>
          Thanh Toán
        </button>
        </div>
      </form>
    </div>
  );
}

export default ThanhToan;
