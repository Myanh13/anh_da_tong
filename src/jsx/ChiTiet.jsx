import React, { useState,useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link,useNavigate,useParams } from 'react-router-dom';
import DanhGia from './danhgia';
const ChiTiet = () => {
    const [checkInDate, setCheckInDate] = useState(new Date()); // Ngày nhận phòng mặc định là hôm nay
    const [checkOutDate, setCheckOutDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1))); // Ngày trả phòng mặc định là ngày mai
    const [totalPrice, setTotalPrice] = useState(0);
    const { id } = useParams();
    const storedUser = JSON.parse(localStorage.getItem('auth'));
    const [homestayCT, setHomestay] = useState({});
    const [error, setError] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [images, setImages] = useState([]); // Hình ảnh homestay
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [isNotificationVisible, setNotificationVisible] = useState(false);
    const [timeLeft, setTimeLeft] = useState(5);
    const [existingFavorites, setExistingFavorites] = useState([]);
    const [dateError, setDateError] = useState("");
    const [notificationMessage, setNotificationMessage] = useState(""); // Thông báo


    

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

//lay theo id
    useEffect(() => {
        axios.get(`https://anh-api-tong.onrender.com/homestay/${id}`)
            .then(response => {
                setHomestay(response.data);
            })
            .catch(err => {
                setError("Lỗi khi tải dữ liệu homestay");
            });
    }, [id]);
    
    
    

//san pham lien quan
    useEffect(() => {
        const fetchRooms = async () => {
          try {
            const response = await fetch(`https://anh-api-tong.onrender.com/homestaylienquan/${id}`);
            const data = await response.json();
      
            // Lọc dữ liệu để loại bỏ các id_homestay trùng lặp
            const uniqueRooms = data.filter((room, index, self) => 
              index === self.findIndex((r) => r.id_homestay === room.id_homestay)
            );
      
            // Cập nhật danh sách rooms
            setRooms(uniqueRooms);
          } catch (error) {
            console.error("Error fetching rooms:", error);
          }
        };
        fetchRooms();
      }, [id]);

///kiemtra dang nhap mmoiws được yêu thích
      useEffect(() => {
        if (!storedUser) {
            console.log("Người dùng chưa đăng nhập.");
            // Nếu cần, có thể tự động điều hướng đến trang đăng nhập:
            // window.location.href = '/login';
        } else {
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
            fetchUserData();
        }
    }, []);

///them vào yeu thich dung
//     const addToFavorites = () => {
//     if (!storedUser) {
//         // Nếu chưa đăng nhập, hiển thị thông báo và điều hướng đến trang đăng nhập
//         const goToLogin = window.confirm("Bạn cần đăng nhập để thêm sản phẩm vào danh sách yêu thích. Bạn có muốn đến trang đăng nhập?");
//         if (goToLogin) {
//             window.location.href = '/dk_dn'; // Điều hướng đến trang đăng nhập
//         }
//         return;
//     }
//     if (homestayCT) { // Kiểm tra nếu dữ liệu homestay đã tải
//         try {
//             const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
            
//             // Kiểm tra xem homestay đã có trong danh sách yêu thích chưa
//             const isFavorite = existingFavorites.some(item => item.id_homestay === homestayCT.id_homestay);
            
//             if (!isFavorite) {
//                 const updatedFavorites = [...existingFavorites, homestayCT];
//                 localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                
//                 // Hiển thị thông báo với hai lựa chọn
//                 const goToFavorites = window.confirm("Đã thêm vào danh sách yêu thích. Bạn có muốn đi đến trang yêu thích?");
                
//                 if (goToFavorites) {
//                     // Điều hướng đến trang yêu thích
//                     window.location.href = '/thich'; // Đường dẫn đến trang yêu thích
//                 }
//                 // Nếu chọn Cancel thì sẽ tự động quay lại trang hiện tại (tiếp tục mua hàng)
//             } else {
//                 alert("Sản phẩm này đã có trong danh sách yêu thích");
//             }
//         } catch (error) {
//             console.error("Lỗi khi xử lý dữ liệu yêu thích:", error);
//             alert("Đã xảy ra lỗi khi thêm vào danh sách yêu thích.");
//         }
//     }
    
// };

useEffect(() => {
  let countdownInterval;

  if (isNotificationVisible) {
    // Đặt lại thời gian mỗi khi thông báo xuất hiện
    setTimeLeft(10); // Đặt lại bộ đếm về 5 giây

    countdownInterval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime === 1) {
          setNotificationVisible(false); // Ẩn thông báo khi hết thời gian
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  }

  return () => clearInterval(countdownInterval); // Dọn dẹp khi component unmount hoặc trạng thái thay đổi
}, [isNotificationVisible]);

//thích
const addToFavorites = () => {
    if (!storedUser) {
      // Nếu chưa đăng nhập, yêu cầu đăng nhập
      const goToLogin = window.confirm("Bạn cần đăng nhập để thêm sản phẩm vào danh sách yêu thích. Bạn có muốn đến trang đăng nhập?");
      if (goToLogin) {
        window.location.href = '/dk_dn'; // Điều hướng đến trang đăng nhập
      }
      return;
    }

    if (homestayCT) {
      try {
        const updatedFavorites = [...existingFavorites];
        const isFavorite = updatedFavorites.some(item => item.id_homestay === homestayCT.id_homestay);

        if (!isFavorite) {
          // Nếu sản phẩm chưa có trong danh sách yêu thích, thêm vào
          updatedFavorites.push(homestayCT);
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
          setExistingFavorites(updatedFavorites); // Cập nhật state với danh sách mới
          setNotificationMessage("Sản phẩm đã được thêm vào danh sách yêu thích!"); // Thông báo thành công
        } else {
          // Nếu sản phẩm đã có trong danh sách yêu thích, hiển thị thông báo
          setNotificationMessage("Sản phẩm này đã có trong danh sách yêu thích."); // Thông báo đã có
        }
        setNotificationVisible(true); // Hiển thị thông báo
      } catch (error) {
        console.error("Lỗi khi xử lý dữ liệu yêu thích:", error);
        setNotificationMessage("Có lỗi xảy ra khi thêm sản phẩm vào yêu thích."); // Thông báo lỗi
        setNotificationVisible(true);
      }
    }
  };

  const handleContinueShopping = () => {
    setNotificationVisible(false); // Tắt thông báo
  };

    const handleGoToCart = () => {
        window.location.href = '/thich'; // Điều hướng đến trang đăng nhập
    };






    const swiperRef = useRef(null); 
    //dat homestay
    const handleInputChange = (e) => {  
    const { name, value } = e.target;
    setUser((prevUser) => ({
        ...prevUser,
        [name]: value
    }));
    };
// Lấy thông tin người dùng khi component tải
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!user) {
//       alert('Bạn cần đăng nhập để đặt phòng!');
//       return;
//     }
  
//     if (!checkInDate || !checkOutDate) {
//       alert('Bạn cần chọn ngày nhận và ngày trả phòng.');
//       return;
//     }
  
//     const bookingData = {
//         id_homestay: homestayCT.id_homestay,
//         ngay_dat: checkInDate.toISOString().split('T')[0], // Chuyển đ��i ngày theo đ��nh dạng "yyyy-MM-dd"
//         id_user: user.id_user,
//         ngay_dat: checkInDate.toISOString().split('T')[0], // Chuyển đổi ngày theo định dạng "yyyy-MM-dd"
//         ngay_tra: checkOutDate.toISOString().split('T')[0], // Chuyển đổi ngày theo định dạng "yyyy-MM-dd"
//         tong_tien_dat: homestayCT.gia_homestay,
//       };
//     console.log(bookingData);
  
//     try {
//       const response = await fetch('https://anh-api-tong.onrender.com/BookingRoom', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(bookingData),
//       });
  
//     //   console.log(response);
      
//       if (!response.ok) {
//         const data = await response.json();
//         console.error('Error from server:', data);
//         alert(data.message || 'Có lỗi xảy ra khi đặt phòng.');
//         return;
//       }
  
//       const data = await response.json();
//       console.log(data.id_homestay);
      
//       alert('Đặt phòng thành công, mời bạn đến thanh toán');
//        // Chuyển hướng đến trang thanh toán sau khi đặt phòng thành công
//        navigate(`/thanhtoan/${homestayCT.id_homestay}`); // data.id_booking là ID đặt phòng trả về từ server
//     } catch (error) {
//       console.error('Có lỗi xảy ra khi gửi yêu cầu:', error);
//       alert('Có lỗi xảy ra, vui lòng thử lại.');
//     }
    
//   };
// Lấy thông tin người dùng khi component tải

useEffect(() => {
    if (!checkInDate || !checkOutDate || !homestayCT.gia_homestay) {
        setTotalPrice(0);
        return;
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
        setDateError("Ngày trả phòng phải lớn hơn ngày nhận phòng!");
        setTotalPrice(0);
        return;
    }

    setDateError("");

    const timeDiff = Math.abs(new Date(checkOutDate) - new Date(checkInDate));
    const daysStayed = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const total = daysStayed * homestayCT.gia_homestay;

    setTotalPrice(total);
}, [checkInDate, checkOutDate, homestayCT.gia_homestay]);

    const handleSubmit = async (e) => {
        e.preventDefault();
            if (!user) {
            alert('Bạn cần đăng nhập để đặt phòng!');
            return;
            }
        
            if (!checkInDate || !checkOutDate) {
            alert('Bạn cần chọn ngày nhận và ngày trả phòng.');
            return;
            }
            // Kiểm tra logic ngày trả phòng không hợp lệ
            if (checkInDate.getTime() >= checkOutDate.getTime()) {
                alert("Ngày trả phòng phải sau ngày nhận phòng. Vui lòng chọn lại.");
                return;
            }

            // Kiểm tra tổng tiền
            if (totalPrice <= 0) {
                alert("Tổng tiền không hợp lệ. Vui lòng kiểm tra lại ngày nhận và trả phòng.");
                return;
            }
        if (totalPrice <= 0) {
            alert("Tổng tiền không hợp lệ. Vui lòng kiểm tra lại ngày nhận và trả phòng.");
            return;
        }

        const bookingData = {
            id_homestay: homestayCT.id_homestay,
            id_user: user.id_user,
            ten_user: user.ten_user,
            sdt_user: user.sdt_user,
            email_user: user.email_user,
            ngay_dat: checkInDate
                ? checkInDate.toLocaleDateString("en-GB") // Định dạng thành DD/MM/YYYY
                : "",
            ngay_tra: checkOutDate
                ? checkOutDate.toLocaleDateString("en-GB") // Định dạng thành DD/MM/YYYY
                : "",
            gia_homestay: homestayCT.gia_homestay,
            tong_tien_dat: totalPrice,
        };

        // Kiểm tra tên
        if (bookingData.ten_user.length > 20) {
            alert("Tên không được quá 20 ký tự.");
            return;
        }

        // Kiểm tra số điện thoại
        const phoneRegex = /^0\d{9}$/; // Chỉ cho phép 10 chữ số
        if (!phoneRegex.test(bookingData.sdt_user)) {
            alert("Số điện thoại không hợp lệ. Vui lòng nhập lại.");
            return;
        }

        // Kiểm tra email
        const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
        if (!emailRegex.test(bookingData.email_user)) {
            alert("Email không hợp lệ. Vui lòng nhập lại.");
            return;
        }

        try {
            const response = await axios.post('https://anh-api-tong.onrender.com/booking/homestay', bookingData);
            console.log('Đặt phòng thành công:', response.data.message);
            alert('Đặt phòng thành công!');
            navigate('/')
            console.log('dữ liệu nhận về', bookingData)
            
        } catch (error) {
            console.error('Lỗi khi đặt phòng:', error.response?.data || error.message);
            if (error.response?.data?.error) {
                alert(error.response.data.error);
            } else {
                alert('Đã xảy ra lỗi khi đặt phòng. Vui lòng thử lại.');
            }
        }
    };   
  
  
const formatDateForInput = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

    if (error) return <p>{error}</p>;
    if (!homestayCT) return <p>Loading...</p>;
    return (
        <div className="layout-c layout-pageProduct">
             {error ? (
                <p>{error}</p>
            ) : (
                homestayCT && (
            <section className="productDetail-information">
                <div className="danh">1234</div>
                <div className="productDetail--main">
                    <div className="wap_img_chitiet">
                        {images.length > 0 ? (
                                images.map((image, index) => {
                                    if (homestayCT.id_homestay === image.id_hinh) {
                                        return (
                                            <div key={image.id_homestay || index} className="add_img">
                                                <div className="image-gallery">
                                                    <div className="main-image">
                                                        <img src={image.url_hinh || "../../image/banner.jpg"} alt={homestayCT.ten_homestay || "Main Image"} />
                                                    </div>
                                                    <div className="thumbnail-grid">
                                                        <img src={image.url_hinh || "../../image/banner.jpg"} alt="Thumbnail 1" />
                                                        <img src={image.url_hinh || "../../image/banner.jpg"} alt="Thumbnail 2" />
                                                        <img src={image.url_hinh || "../../image/banner.jpg"} alt="Thumbnail 3" />
                                                        <img src={image.url_hinh || "../../image/banner.jpg"} alt="Thumbnail 4" />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null; // Ensures a return statement if condition is not met
                                })
                            ) : (
                                <p>Không có hình để hiển thị</p>
                            )}

                    </div>
                    <div className="min_warp2">
                        <div className="productDetail--content">
                            <div className="wrapbox-inner">
                                <div className="d-flex flex-wrap">
                                    <div className="col-lg-8 col-md-12 col-12 wrapbox-left">
                                        <div class="proloop-detail chitiet">
                                            <h3><Link to="">{homestayCT.ten_homestay}</Link></h3> 
                                            <div className="gift-tag">
                                                <div className={`thongbao_tag ${homestayCT.TrangThai === 'Còn phòng' ? 'available' : 'sold-out'}`}>
                                                    {homestayCT.TrangThai}
                                                </div>
                                            </div>
                                            <div class="pro-tag">
                                                <div class="tag-item tag-area">
                                                    <span>150</span> <span class="tag-unit">m<sup>2</sup></span>
                                                </div>                                     
                                                <div class="tag-item tag-guests">
                                                    <span>10</span> <span class="tag-unit">Guests</span>
                                                </div>
                                                <div class="tag-item tag-bed">
                                                    <span>5</span> <span class="tag-unit">Beds</span>
                                                </div>
                                                <div class="tag-item tag-bathroom">
                                                    <span>4</span> <span class="tag-unit">Bathroom</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="wrapbox-detaill">
                                            <div className="content-desc">
                                                <div className="productDetail--box box -detail-description mg-top">
                                                    <div className="product-description chitiet">
                                                        <div className="description-content expandable-toggle opened">
                                                            <div className="description-productdetail">
                                                                <p>{homestayCT.mota}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" col-lg-4 col-md-12 col-12 wrapbox-right" id="form-booking-pro">
                                        <div className="wrapbox-detail">
                                            <div className="product-price" id="price-preview">
                                                <span className="pro-title">ĐẶT PHÒNG: </span>
                                                <div className="pro-price-chitiet no-sale">
                                                <div className="percent-price">
                                                        <span className="price">{homestayCT && homestayCT.gia_homestay ? 
                                                        Number(homestayCT.gia_homestay).toLocaleString('vi') : 'Chưa có giá'}<span className="person">/ Đêm</span></span>
                                                    </div>
                                                </div>
                                            </div>
                                           
                                            {/* <div className="product-variants hidden" style={{ display: 'none' }}>
                                                <form id="add-item-form" action="" method="post" className="variants clearfix">
                                                    <div className="select clearfix" style={{ display: 'none' }}>
                                                        <select id="product-select" name="id" style={{ display: 'none' }}>
                                                            <option value="1128215632">Default Title - 3,200,000₫</option>
                                                        </select>
                                                    </div>
                                                   
                                                </form>
                                            </div> */}
                                            <div className="form-booking_chitiet">
                                                <form id="formbooking" onSubmit={handleSubmit}>
                                                {!user ? (
                                                        <div>
                                                       <p style={{ fontSize: '16px', textAlign: 'center' }}>
                                                            Bạn cần <Link to="/dk_dn" style={{ textDecoration: 'underline', color: 'blue' }}>Đăng nhập</Link> để đặt Homestay.
                                                        </p>
                                                        </div>
                                                    ) : (
                                                    <div className="contact-form">
                                                        <div className="row_bth">
                                                            <div className="col-sm-12 col-xs-12">
                                                                <div className="input-group">
                                                                    <input type="text" hidden  value={homestayCT.id_homestay || ''}  />
                                                                    <input
                                                                        required
                                                                        type="text"
                                                                        name="ten_user" // Đảm bảo tên này khớp với đối tượng user
                                                                        id="full_name"
                                                                        data-valid="full_name"
                                                                        className="form-control"
                                                                        placeholder="Tên của bạn"
                                                                        value={user.ten_user || ''}
                                                                        onChange={handleInputChange}
                                                                        readOnly
                                                                        />
                                                                </div>
                                                                <p className="full_name-validation field-error"></p>
                                                            </div>
                                                            <div className="col-sm-12 col-xs-12">
                                                                <div className="input-group">
                                                                <input
                                                                    pattern="[0-9]{10,12}"
                                                                    required
                                                                    type="text"
                                                                    name="sdt_user" // Tên này cũng khớp với đối tượng user
                                                                    id="your_phone"
                                                                    data-valid="your_phone"
                                                                    className="form-control"
                                                                    placeholder="Số điện thoại"
                                                                    value={user.sdt_user || ''}
                                                                    onChange={handleInputChange}
                                                                    readOnly
                                                                    />
                                                                </div>
                                                                <p className="your_phone-validation field-error"></p>
                                                            </div>
                                                            <div className="col-sm-12 col-xs-12">
                                                                <div className="input-group">
                                                                <input
                                                                    required
                                                                    type="text"
                                                                    name="email_user" // Tên này cũng khớp với đối tượng user
                                                                    id="your_email"
                                                                    data-valid="your_email"
                                                                    className="form-control"
                                                                    placeholder="Email"
                                                                    value={user.email_user || ''}
                                                                    onChange={handleInputChange}
                                                                    readOnly
                                                                    />
                                                                </div>
                                                                <p className="your_email-validation field-error"></p>
                                                            </div>
                                                            <div className="col-sm-12 col-xs-12">
                                                                <div className="pro-datepicker t-datepicker">
                                                                    <div className="pro-item pro-when pro-checkin">
                                                                        <div className="pro-form">
                                                                            <label>Ngày nhận phòng</label>
                                                                            <div className="t-check-in">
                                                                                <DatePicker
                                                                                    selected={checkInDate}
                                                                                    onChange={(date) => setCheckInDate(date)}
                                                                                    dateFormat="dd/MM/yyyy"
                                                                                    className="t-input-check-in"
                                                                                    minDate={new Date()}  // Đảm bảo không thể chọn ngày quá khứ
                                                                                />
                                                                              
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="pro-item pro-when pro-checkout">
                                                                        <div className="pro-form">
                                                                            <label>Ngày trả phòng</label>
                                                                            <div className="t-check-out">
                                                                                <DatePicker
                                                                                    selected={checkOutDate}
                                                                                    onChange={(date) => setCheckOutDate(date)}
                                                                                    dateFormat="dd/MM/yyyy"
                                                                                    className="t-input-check-out"
                                                                                    minDate={checkInDate}  // Ngày trả phòng không thể nhỏ hơn ngày nhận phòng
                                                                                />
                                                                   
                                                                            </div>
                                                                        </div>
                                                                        {dateError && <p style={{ color: "red" }}>{dateError}</p>}
                                                                    </div>
                                                                        <input type="hidden" name="entry.1366726942" value={formatDateForInput(checkInDate)} />
                                                                        <input type="hidden" name="entry.1192184549" value={formatDateForInput(checkOutDate)} />
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-12 col-xs-12">
                                                                <input type="hidden" id="link_pro" name="entry.1473149859" value="" />
                                                                <div className="pro-total">
                                                                    <label>Tổng cộng: </label>
                                                                    <div className="pro-num-total" data-price="">
                                                                        {totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                                    </div>                                                                   
                                                                </div>      
                                                            </div>
                                                            
                                                            <div className="col-sm-12 col-xs-12 btn_like ">
                                                                <div className="btn-more text-center">
                                                                    <button type='submit' className="ocean-button btn_like_cart" id="oceanButton">Đặt phòng ngay</button>
                                                                </div>                                                                
                                                                <div className="btn-more text-center btn_ngan">
                                                                    <Link to={``}>
                                                                        <button onClick={addToFavorites} className="ocean-button btn_like_cart" id="oceanButton">Yêu thích <i class="fa-solid fa-heart"></i>
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                      )}
                                                </form> 
                                                     {/* Lớp phủ và thông báo */}
                                                  {isNotificationVisible && (
                                                        <>
                                                        <div className="overlay_thongbao_user" style={{ display: 'block' }}></div>

                                                        <div className="notification_thongbao_user" style={{ display: 'flex' }}>
                                                            <p>{notificationMessage}</p>
                                                            <span>{timeLeft}s</span>
                                                            <button onClick={handleContinueShopping}>Tiếp tục chọn</button>
                                                            <button onClick={handleGoToCart}>Xem yêu thích</button>
                                                        </div>
                                                        </>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* danhgia */}
                        <div className="container-danhgia">
                              {/* Reviews Card */}
                              <div className="card-danhgia reviews-danhgia">
                              <DanhGia id_homestay={homestayCT.id_homestay} />
                            </div>
                            <div className="wap_loca-tienich">
                                <div className="col_top_loca_tienich">
                                    {/* Location Card */}
                                    <div className="card-danhgia location-danhgia">
                                    <h3>Trong khu vực</h3>
                                        <p className='location_ic'><i class="fa-sharp fa-solid fa-location-dot"></i> 57-59 Đỗ Bí, Mỹ An, Ngũ Hành Sơn, Đà Nẵng, Việt Nam, 550000</p>
                                        <p><strong>Gần khu vui chơi giải trí</strong></p>
                                        <p><i class="fa-solid fa-location-pin"></i> Biển Mỹ Khê - 868 m</p>
                                        <p><i class="fa-solid fa-location-pin"></i> Four Points by Sheraton Danang - 2.65 km</p>
                                        <p><i class="fa-solid fa-location-pin"></i> Số 294 Trưng Nữ Vương - 2.96 km</p>
                                   
                                    </div>
                                    {/* Amenities Card */}
                                    <div className="card-danhgia amenities-danhgia">
                                    <h3>Tiện ích chính</h3>
                                        <div className="wap_tienich">
                                            <div className="tien_ich1">
                                                    <ul>
                                                        <li>Máy lạnh</li>
                                                        <li>Nhà hàng</li>
                                                        <li>Lễ tân 24h</li>
                                                        <li>Chỗ đậu xe</li>
                                                        <li>Thang máy</li>
                                                        <li>WiFi</li>
                                                    </ul>
                                                </div>
                                                <div className="tien_ich2">
                                                    <ul>
                                                        <li>Máy lạnh</li>
                                                        <li>Nhà hàng</li>
                                                        <li>Lễ tân 24h</li>
                                                        <li>Chỗ đậu xe</li>
                                                        <li>Thang máy</li>
                                                        <li>WiFi</li>
                                                    </ul>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col_bottom_loca_tienich">
                                    <div class="full-width"> Homestay có không gian thoáng đãng, gần gũi với thiên nhiên, rất thích hợp để thư giãn sau những ngày làm việc căng thẳng."
                                        "Thiết kế homestay đẹp và ấm cúng, cảm giác như đang ở nhà vậy. Mọi góc nhỏ đều được trang trí tinh tế và tỉ mỉ."
                                        "View từ homestay thật tuyệt vời, có thể ngắm nhìn toàn cảnh núi đồi và tận hưởng không khí trong lành.
                                    </div>
                                </div>
                                    
                            </div>
                        </div>
                        {/* danhgia */}
                       
                        <div className="sp_lienquan">
                            <h2 className='text_24px'>Xem thêm phòng khác</h2>
                            <ul class="homestay_list" data-aos="fade-up" data-aos-duration="2000"> </ul>
                            <div className="btn_slide">
                        <div className="owl-nav">
                            <button type="button" role="presentation" className="owl-prev" aria-label="prev slide"    onClick={() => swiperRef.current?.slidePrev()}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="512"
                                    height="512px"
                                    viewBox="0 0 512 512"
                                    className=""
                                    style={{ enableBackground: "new 0 0 512 512" }}
                                >
                                    <g transform="matrix(-1, 0, 0, -1, 512, 512)">
                                    <path d="M367.954,213.588L160.67,5.872c-7.804-7.819-20.467-7.831-28.284-0.029c-7.819,7.802-7.832,20.465-0.03,28.284l207.299,207.731c7.798,7.798,7.798,20.486-0.015,28.299L132.356,477.873c-7.802,7.819-7.789,20.482,0.03,28.284c3.903,3.896,9.016,5.843,14.127,5.843c5.125,0,10.25-1.958,14.157-5.873l207.269-207.701C391.333,275.032,391.333,236.967,367.954,213.588z" />
                                    </g>
                                </svg>
                            </button>
                            <button type="button" role="presentation" className="owl-next" aria-label="next slide" onClick={() => swiperRef.current?.slideNext()} >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="512"
                                height="512px"
                                viewBox="0 0 512 512"
                                className=""
                                style={{ enableBackground: "new 0 0 512 512" }}
                            >
                                <path d="M367.954,213.588L160.67,5.872c-7.804-7.819-20.467-7.831-28.284-0.029c-7.819,7.802-7.832,20.465-0.03,28.284l207.299,207.731c7.798,7.798,7.798,20.486-0.015,28.299L132.356,477.873c-7.802,7.819-7.789,20.482,0.03,28.284c3.903,3.896,9.016,5.843,14.127,5.843c5.125,0,10.25-1.958,14.157-5.873l207.269-207.701C391.333,275.032,391.333,236.967,367.954,213.588z" />
                            </svg>
                            </button>
                        </div>
                    </div>
                            <>
                            <Swiper
                                slidesPerView={1} // Hiển thị tối đa 3 slides
                                spaceBetween={30} // Khoảng cách giữa các slides
                                pagination={{
                                clickable: true,
                                }}
                                autoplay={{
                                  delay: 3000,
                                  disableOnInteraction: false,
                                }}
                                breakpoints={{
                                    900: { // Trên 768px
                                    slidesPerView: 4, // Hiển thị 4 slides
                                    spaceBetween: 30,
                                    },
                                    800: { // Trên 768px
                                    slidesPerView: 3, // Hiển thị 4 slides
                                    spaceBetween: 30,
                                    },
                                    767: { // Trên 768px
                                    slidesPerView: 3, // Hiển thị 4 slides
                                    spaceBetween: 30,
                                    },
                                    480: { // Từ 480px đến 767px
                                    slidesPerView: 2, // Hiển thị 2 slides
                                    spaceBetween: 20,
                                    },
                                    0: { // Dưới 480px
                                    slidesPerView: 1, // Hiển thị 1 slide
                                    spaceBetween: 10,
                                    },
                                }}
                                onSwiper={(swiper) => {
                                    swiperRef.current = swiper; // Lưu instance của Swiper
                                  }}
                                modules={[Pagination, Autoplay]}
                                className="mySwiper"
                                >
                                     {Array.isArray(rooms) && rooms.length > 0 ? ( rooms.map((room, index) => (
                                    <SwiperSlide>
                                    <li key={index}>  
                                        <Link to={"/homestay/" + room.id_homestay}>
                                            <div className="img_homstay">
                                                <div className="pro-price pri_chitiet">
                                                    <span className="price">{room.gia_homestay}₫</span>
                                                    <span>/ Đêm</span>
                                                </div>
                                                <img src={room.url_hinh} alt={room.ten_homestay} />
                                            </div>
                                            <div class="des_hst">
                                                <div class="proloop-detail">
                                                    <h3><Link to={"/homestay/" + room.id_homestay}>{room.ten_homestay} </Link></h3>
                                                    <div class="pro-tag">
                                                        <div class="tag-item tag-area">
                                                            <span>150</span> <span class="tag-unit">m<sup>2</sup></span>
                                                        </div>                                     
                                                        <div class="tag-item tag-guests">
                                                            <span>10</span> <span class="tag-unit">Guests</span>
                                                        </div>
                                                        <div class="tag-item tag-bed">
                                                            <span>5</span> <span class="tag-unit">Beds</span>
                                                        </div>
                                                        <div class="tag-item tag-bathroom">
                                                            <span>4</span> <span class="tag-unit">Bathroom</span>
                                                        </div>
                                                    </div>
                                                <div className="pro-desc">
                                                {room.mota}
                                                </div>
                                                <div className="btn_ev">
                                                <Link to={"/homestay/" + room.id_homestay}>
                                                    <span>Xem chi tiết
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                    <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
                                                    </svg>
                                                    </span>
                                                </Link>
                                                </div>
                                            </div>
                                            </div>
                                        </Link>
                                    </li>
                                    </SwiperSlide>
                                    
                                ))
                            ): (
                                <p>Chưa có phòng nào!</p>
                                
                                )}
                           
                            </Swiper>
                             </>
                                
                           
                        </div>


                    </div>
                </div>
            </section>
              )
            )}
        </div>
        
    );
};

export default ChiTiet;

