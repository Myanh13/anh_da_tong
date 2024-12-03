import React, { useState } from 'react';

const AdminVoucherCreator = () => {
  const [voucherCode, setVoucherCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(10); // Giảm 10% mặc định
  const [voucherCreated, setVoucherCreated] = useState(false);

  // Hàm tạo voucher
  const handleCreateVoucher = () => {
    // Kiểm tra mã voucher và tỷ lệ giảm
    if (!voucherCode) {
      alert('Voucher code is required!');
      return;
    }

    // Tạo voucher mới (thực tế sẽ lưu vào cơ sở dữ liệu, ví dụ qua API)
    const newVoucher = {
      code: voucherCode,
      discount: discountPercent,
    };

    console.log('Voucher created:', newVoucher);
    // Giả sử voucher được lưu thành công vào cơ sở dữ liệu
    setVoucherCreated(true);
  };

  return (
   <div className="min_wrap2">
    <div className="row1">
    <div>
      <h2>Create a New Voucher</h2>
      <input
        type="text"
        placeholder="Enter voucher code"
        value={voucherCode}
        onChange={(e) => setVoucherCode(e.target.value)}
      />
      <select
        value={discountPercent}
        onChange={(e) => setDiscountPercent(parseInt(e.target.value))}
      >
        <option value={10}>10% Discount</option>
        <option value={20}>20% Discount</option>
      </select>
      <button onClick={handleCreateVoucher}>Create Voucher</button>
      {voucherCreated && <p>Voucher created successfully!</p>}
    </div>
    </div>
   </div>
  );
};

export default AdminVoucherCreator;
