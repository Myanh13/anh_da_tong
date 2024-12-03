import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"
import axios from 'axios';

function Thanhtoan() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [homestayCT, setHomestay] = useState(null); // Lưu thông tin homestay
  const [error, setError] = useState(null); // Lưu lỗi nếu có
  const [images, setImages] = useState([]); // Hình ảnh homestay 
  const [danhGia, setDanhGia] = useState([]);
  const [thongBao, setThongBao] = useState('');
  const [averageScore, setAverageScore] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [user, setUser] = useState(null); // Lưu thông tin người dùng
  const [bookingData, setBookingData] = useState(null);// Lưu thông tin booking
  const storedBookingData = JSON.parse(localStorage.getItem('bookingData'));
  const storedUser = JSON.parse(localStorage.getItem('auth')); // Lấy thông tin người dùng từ localStorage
  const [message, setMessage] = useState(""); // Thông báo kết quả thanh 


  

  // Kiểm tra xem có dữ liệu người dùng trong localStorage hay không
  useEffect(() => {
    if (storedUser) {
      // Nếu có thông tin người dùng trong localStorage, set state user
      setUser(storedUser);
      // Gửi yêu cầu tới server để lấy thêm dữ liệu người dùng nếu cần
      const fetchUserData = async () => {
        try {
          const response = await fetch(`https://anh-api-tong.onrender.com/user/${storedUser.id_user}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (response.ok) {
            const data = await response.json();
            setUser(data.user); // Cập nhật thông tin người dùng từ server
          } else {
            console.error('Lỗi khi lấy thông tin người dùng từ server');
          }
        } catch (error) {
          console.error('Có lỗi xảy ra khi kết nối tới server:', error);
        }
      };
      fetchUserData(); // Gọi hàm lấy dữ liệu người dùng từ server
    }
    // console.log(storedUser);
  }, []); // Chạy một lần khi component được mount

  useEffect(() => {
    if (storedBookingData) {
      // Cập nhật bookingData nếu có
      setBookingData(storedBookingData);
    } else {
      // Nếu không có dữ liệu trong localStorage, chuyển hướng về trang trước
      alert("Không tìm thấy thông tin đặt phòng!");
    }
  }, []);   
  console.log(storedBookingData);

  //voucher
  //   // Lấy voucher từ API khi component được load
  //   useEffect(() => {
  //     const fetchVouchers = async () => {
  //         try {
  //             const response = await axios.get("https://anh-api-tong.onrender.com/vouchers");
  //             setVouchers(response.data);
  //         } catch (error) {
  //             console.error("Lỗi khi lấy thông tin voucher:", error);
  //         }
  //     };
  //     fetchVouchers();
  // }, []);


  const handleCheckVoucher = async () => {
  
  };


 
// voucher

  
  ///thanh toan

  const handlePayment = async () => {
    if (!bookingData || !user) {
        alert("Dữ liệu không đầy đủ. Vui lòng thử lại!");
        return;
    }
    try {
        // Gửi yêu cầu đặt phòng
        const bookingResponse = await axios.post("https://anh-api-tong.onrender.com/BookingRoom", {
            id_user: user.id_user,
            id_homestay: bookingData.id_homestay,
            ngay_dat: bookingData.ngay_dat,
            ngay_tra: bookingData.ngay_tra,
            tong_tien_dat: bookingData.tong_tien_dat,
            trang_thai_TT: "chờ thanh toán",
            created_at: new Date().toISOString(), // Thêm thời gian tạo đơn
        });

        if (bookingResponse.status === 200) {
            // Thông báo đặt phòng thành công
            alert("Đặt phòng thành công! Đang chuyển đến trang thanh toán.");

            // Sau đó gọi API thanh toán
            const paymentResponse = await axios.post("https://anh-api-tong.onrender.com/payment", {
                bookingId: bookingResponse.data.bookingId, // API trả về bookingId
                amount: bookingData.tong_tien_dat, // Truyền số tiền đặt phòng
            });

            if (paymentResponse.status === 200) {
                const { payUrl } = paymentResponse.data;

                // Chuyển hướng người dùng tới URL thanh toán của MoMo
                window.location.href = payUrl;
            } else {
                console.error("Thanh toán thất bại:", paymentResponse.data);
                alert(`Không thể thực hiện thanh toán: ${paymentResponse.data.message || "Lỗi không xác định."}`);
            }
        } else {
            console.error("Đặt phòng thất bại:", bookingResponse.data);
            alert(`Không thể đặt phòng: ${bookingResponse.data.message || "Lỗi không xác định."}`);
        }
    } catch (error) {
        console.error("Lỗi khi thực hiện thanh toán:", error);

        // Thông báo lỗi cụ thể hơn
        const errorMessage = error.response?.data?.message || error.message || "Không thể kết nối với server.";
        alert(`Có lỗi xảy ra: ${errorMessage}`);
    }
};



  // const handlePayment = async () => {
  //   if (!bookingData || !user) {
  //     alert("Dữ liệu không đầy đủ. Vui lòng thử lại!");
  //     return;
  //   }
  
  //   try {
  //     // Gửi yêu cầu đặt phòng
  //     const bookingResponse = await axios.post("https://anh-api-tong.onrender.com/BookingRoom", {
  //       id_user: user.id_user,
  //       id_homestay: bookingData.id_homestay,
  //       ngay_dat: bookingData.ngay_dat,
  //       ngay_tra: bookingData.ngay_tra,
  //       tong_tien_dat: bookingData.tong_tien_dat,
  //       trang_thai_TT: "chờ thanh toán",
  //       created_at: new Date().toISOString(), // Thêm thời gian tạo đơn
  //     });
  
  //     if (bookingResponse.status === 200) {
  //       // Thông báo đặt phòng thành công
  //       alert("Đặt phòng thành công! Đang chuyển đến trang thanh toán.");
  
  //       // Sau đó gọi API thanh toán
  //       const paymentResponse = await axios.post("https://anh-api-tong.onrender.com/payment", {
  //         bookingId: bookingResponse.data.bookingId, // Giả sử API trả về bookingId
  //         amount: bookingData.tong_tien_dat, // Truyền số tiền đặt phòng
  //       });
  
  //       if (paymentResponse.status === 200) {
  //         const { payUrl } = paymentResponse.data;
  
  //         // Chuyển hướng người dùng tới URL thanh toán của MoMo
  //         window.location.href = payUrl;
  //       } else {
  //         alert("Không thể thực hiện thanh toán. Vui lòng thử lại.");
  //       }
  //     } else {
  //       alert("Không thể đặt phòng. Vui lòng thử lại.");
  //     }
  //   } catch (error) {
  //     console.error("Lỗi khi thực hiện thanh toán:", error);
  //     alert(`Có lỗi xảy ra: ${error.response?.data?.message || "Không thể kết nối với server."}`);
  //   }
  // };

  

 // Lấy đánh giá dựa trên id_homestay từ bookingData
 useEffect(() => {
  if (bookingData?.id_homestay) {
      const idHomestay = bookingData.id_homestay; // Lấy id_homestay từ bookingData
      axios
          .get(`https://anh-api-tong.onrender.com/danhgia/${idHomestay}`)
          .then((response) => {
              const reviews = response.data;
              setDanhGia(reviews);

              if (reviews.length > 0) {
                  const totalScore = reviews.reduce((acc, review) => acc + review.sao, 0);
                  setAverageScore((totalScore / reviews.length).toFixed(1)); // Tính điểm trung bình
                  setTotalReviews(reviews.length); // Tổng số lượt đánh giá
              }
          })
          .catch((error) => {
              console.error("Lỗi khi lấy đánh giá:", error);
              setThongBao("Có lỗi xảy ra khi tải đánh giá.");
          });
  }
}, [bookingData]);




// Hàm fetch hình ảnh homestay
  const fetchHomestayImages = async () => {
    try {
      const response = await fetch('https://anh-api-tong.onrender.com/dshinhanh');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setImages(data); // Đặt dữ liệu vào state
    } catch (error) {
      console.error('Failed to fetch images:', error);
    }
  };

// Fetch hình ảnh khi component mount
  useEffect(() => {
    fetchHomestayImages();
  }, []);

 useEffect(() => {
  // Fetch thông tin homestay theo ID
  const fetchHomestay = async () => {
    try {
      const response = await fetch(`https://anh-api-tong.onrender.com/homestay/${id}`); // API lấy thông tin homestay
      if (!response.ok) {
        throw new Error('Không thể lấy thông tin homestay');
      }
      
      const data = await response.json();
      setHomestay(data); // Lưu thông tin vào state
      // console.log(data);
      
    } catch (err) {
      console.error(err);
      setError('Có lỗi khi tải thông tin homestay.');
    }
  };
  fetchHomestay();
}, [id]);



// Hàm quay lại trang trước đó
  const handleGoBack = () => {
    navigate(-1); // Giá trị -1 nghĩa là quay lại trang trước
  };
  if (!storedBookingData) {
    return null; // Hoặc hiển thị loading nếu cần
  }
  // Lấy thông tin tổng giá và số ngày từ bookingData
  const { tong_tien_dat, ngay_dat, ngay_tra } = storedBookingData;
  const numberOfDays =
    (new Date(ngay_tra) - new Date(ngay_dat)) / (24 * 60 * 60 * 1000);
  if (error) return <p>{error}</p>; // Hiển thị lỗi nếu có
  if (!homestayCT) return <p>Đang tải...</p>; // Hiển thị trạng thái loading
  return (
    <div className="section">
      <div className="danh">123</div>
        <div className="wap_thanhtoanhome">
          <div className="min_warp2">
              <div class="container_thanhtoanhome">
                <header class="header_thanhtoanhome">
                    <div className="owl-nav owl_thanhtoan">
                        <button type="button" role="presentation" className="owl-prev" aria-label="prev slide" onClick={handleGoBack} >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="512"
                                height="512"
                                viewBox="0 0 512 512"
                                className=""
                                style={{ enableBackground: "new 0 0 512 512" }}
                            >
                                <g transform="matrix(-1, 0, 0, -1, 512, 512)">
                                <path d="M367.954,213.588L160.67,5.872c-7.804-7.819-20.467-7.831-28.284-0.029c-7.819,7.802-7.832,20.465-0.03,28.284l207.299,207.731c7.798,7.798,7.798,20.486-0.015,28.299L132.356,477.873c-7.802,7.819-7.789,20.482,0.03,28.284c3.903,3.896,9.016,5.843,14.127,5.843c5.125,0,10.25-1.958,14.157-5.873l207.269-207.701C391.333,275.032,391.333,236.967,367.954,213.588z" />
                                </g>
                            </svg>
                        </button>
                    </div>
                  <h1>Xác nhận và thanh toán</h1>
                </header> 
                <div class="main-content_thanhtoanhome">
                    {/* <!-- Bên trái --> */}
                    <div class="left-section_thanhtoanhome"> 
                        <div id="col-left contactFormWrapper">
                        {user && (
                          <form onSubmit={``} className="contact-form">
                            <div className="wap_input">
                              <div className="col-sm-12 col_thanhtoan">
                                <div className="input-group">
                                  <input
                                    required
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Tên của bạn"
                                    aria-describedby="basic-addon1"
                                    value={user.ten_user || ''}
                                  />
                                </div>
                              </div>
                              <div className="col-sm-12 col_thanhtoan">
                                <div className="input-group">
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Email của bạn"                             
                                    aria-describedby="basic-addon1"
                                    value={user.email_user || ''}
                                  />
                                </div>
                              </div>
                              <div className="col-sm-12 col_thanhtoan">
                                <div className="input-group">
                                  <input
                                    required
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    placeholder="Số điện thoại của bạn"
                                    pattern="[0-9]{10,12}"                                 
                                    aria-describedby="basic-addon1"
                                    value={user.sdt_user || ''}

                                  />
                                </div>
                              </div>
                              <p className="small_p_capcha">
                                This site is protected by reCAPTCHA and the Google 
                                <strong> Privacy Policy</strong> and <strong> Terms of Service</strong> apply.
                              </p>
                              <div className="btn-more text_left">
                              </div>
                            </div>
                          </form>
                              )}
                        </div>         
                        <div class="highlight_thanhtoanhome">
                            Rất hiếm khi còn chỗ. Homestay cho thuê của <strong>Paradiso</strong> thường kín.
                        </div>
                        <div class="section_thanhtoanhome">
                            <h2>Chuyến đi của bạn</h2>
                            <div class="trip-details_thanhtoanhome">
                              <p>
                                  Ngày:{" "}
                                  {new Date(bookingData.ngay_dat).toLocaleDateString('vi-VN', {
                                    day: '2-digit',
                                    month: '2-digit',
                                  })}{" "}
                                 <strong> Đến</strong>{" "}
                                  {new Date(bookingData.ngay_tra).toLocaleDateString('vi-VN', {
                                    day: '2-digit',
                                    month: '2-digit',
                                  })}
                              </p>
                                <p>Căn: 1 căn</p>
                                <a href="#" class="edit-link_thanhtoanhome">Chỉnh sửa</a>
                            </div>
                        </div>
                        <div class="section_thanhtoanhome">
                          <div className="wap_thanhtoan_visa">
                          <h2>Thanh toán bằng</h2>
                            <div className="img_momo_visa">
                              <img src="../../image/momo1 (1).jpg" alt="MoMo"/>
                              <img src="../../image/momo1 (2).png" alt="MoMo"/>
                              <img src="../../image/momo1 (1).png" alt="MoMo"/>
                            </div>
                          </div>
                            <div class="payment-method_thanhtoanhome">
                                <img src="../../image/momo.png" alt="MoMo"/>
                                <select>
                                    <option value="visa">thanh toán khi nhận phòng</option>
                                    <option value="visa">Visa</option>
                                    <option value="momo" selected>MoMo</option>
                                </select>
                            </div>
                        </div>
                        <div class="section_thanhtoanhome policies_thanhtoanhome">
                            <h2>Chính sách hủy</h2>
                            <p><strong>Hủy miễn phí trước 29 tháng 11.</strong> Bạn được hoàn tiền một phần nếu hủy trước khi nhận phòng vào 30 tháng 11. <a href="#">Tìm hiểu thêm</a></p>
                        </div>
                        <div class="section_thanhtoanhome">
                            <h2>Quy chuẩn chung</h2>
                            <p>Tuân thủ nội quy nhà. Giữ gìn nơi ở như thể đó là nhà bạn.</p>
                        </div>
                    </div>

                    {/* <!-- Bên phải --> */}
                    <div class="right-section_thanhtoanhome">
                      <div className="wap_price_secsion">
                          <div class="price-header_thanhtoanhome">
                        {images.length > 0 ? (
                                  images.map((image, index) => {                                  
                                      if (bookingData.id_homestay === image.id_hinh) {
                                          return (
                                          <img src={image.url_hinh || "https://via.placeholder.com/80"} alt={homestayCT.ten_homestay} />
                                          );
                                        }
                                        return null; // Ensures a return statement if condition is not met
                                    })
                                ) : (
                                    <p>Không có hình để hiển thị</p>
                                )}
                            <div class="price-header-info_thanhtoanhome">                       
                                <h3>{bookingData.ten_homestay}</h3>
                                <p>Phòng tại căn hộ cho thuê</p>
                                {danhGia.slice(0,1).map((dg) => (
                                  <p key={dg.id_homestay} >{'⭐'.repeat(dg.sao)} ({dg.sao}/5)  • <strong>{dg.ten_user}</strong> {dg.noi_dung}</p>                                                     
                                ))}                              
                            </div>                                            
                          </div>
                          <div class="section_thanhtoanhome price-details_thanhtoanhome">
                              <h2>Chi tiết giá</h2>
                              <ul>
                                  {/* <li>₫679,417 x 5 đêm <span>₫3,397,087</span></li>
                                  <li>Phí vệ sinh <span>₫267,487</span></li>
                                  <li>Phí dịch vụ Airbnb <span>₫517,320</span></li>
                                  <li>Thuế <span>₫244,589</span></li> */}
                                  <li>
                                  {bookingData && bookingData.gia_homestay && bookingData.gia_homestay.toLocaleString("vi-VN")} x {numberOfDays} đêm{" "}
                                      <span>
                                        {(
                                          bookingData.gia_homestay * numberOfDays
                                        ).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                      </span>
                                    </li>
                              </ul>
                              <div className="code_voucher">
                                  <input 
                                    type="text" 
                                    placeholder="Nhập mã voucher..." 
                                    className="voucher-input" 
                                  />
                                  <button className="apply-button">Áp dụng</button>
                                </div>         
                              <div class="total_thanhtoanhome">Tổng (VND):
                                 <span>
                                 {tong_tien_dat && tong_tien_dat.toLocaleString("vi-VN", { style: "currency", currency: "VND" })} 
                                  </span>
                              </div>
                          </div>
                      </div>
                    </div>

                </div>

                {/* <!-- Footer --> */}
                <footer className="thanhtoan">
                    <button class="confirm-button_thanhtoanhome" onClick={handlePayment}>Xác nhận và thanh toán</button>
                </footer>
              </div>
          </div>
        </div>
    
    </div>
  );
}

export default Thanhtoan;
