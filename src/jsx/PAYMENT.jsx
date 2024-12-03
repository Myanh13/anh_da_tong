import React, { useState } from "react";
import axios from "axios";

const Payment = () => {
  const [orderId, setOrderId] = useState(""); // Lưu mã giao dịch
  const [paymentStatus, setPaymentStatus] = useState(null); // Lưu trạng thái thanh toán

  // Hàm xử lý thanh toán
  const handlePayment = async () => {
    try {
      const response = await axios.post("https://anh-api-tong.onrender.com/payment");
      if (response.status === 200) {
        const { payUrl } = response.data;
        // Chuyển người dùng tới URL thanh toán của MoMo
        window.location.href = payUrl;
      } else {
        alert("Không thể thực hiện thanh toán. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
      alert("Lỗi khi kết nối đến server.");
    }
  };

  // Hàm kiểm tra trạng thái giao dịch
  const checkTransactionStatus = async () => {
    if (!orderId) {
      alert("Vui lòng nhập mã giao dịch!");
      return;
    }

    try {
      const response = await axios.post("https://anh-api-tong.onrender.com/transaction-status", {
        orderId,
      });
      if (response.status === 200) {
        setPaymentStatus(response.data);
      } else {
        alert("Không thể kiểm tra trạng thái giao dịch.");
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra trạng thái:", error);
      alert("Không thể kết nối đến server.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Thanh toán qua MoMo</h2>
      
      {/* Nút thanh toán */}
      <button onClick={handlePayment} style={{ padding: "10px", marginBottom: "20px" }}>
        Thanh toán ngay
      </button>

      <hr />

      {/* Kiểm tra trạng thái giao dịch */}
      <h3>Kiểm tra trạng thái giao dịch</h3>
      <input
        type="text"
        placeholder="Nhập mã giao dịch"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        style={{ padding: "10px", marginBottom: "10px", width: "100%" }}
      />
      <button onClick={checkTransactionStatus} style={{ padding: "10px" }}>
        Kiểm tra trạng thái
      </button>

      {/* Hiển thị trạng thái thanh toán */}
      {paymentStatus && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
          <h4>Kết quả:</h4>
          <pre>{JSON.stringify(paymentStatus, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Payment;
