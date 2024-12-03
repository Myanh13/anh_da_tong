import React, {useEffect, useState, useRef} from "react";

import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa'; // Import biểu tượng lịch từ react-icons
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'; // Nếu bạn sử dụng axios
import { Link } from "react-router-dom";


const Phong = () => {
  const [homestays, setHomestays] = useState([]);
  const [danhSachPhong, setDanhSachPhong] = useState([]);
  const [checkInDate, setCheckInDate] = useState(new Date()); // Mặc định là ngày hôm nay
  const [checkOutDate, setCheckOutDate] = useState(new Date()); // Ngày trả phòng
  const [isCheckInOpen, setIsCheckInOpen] = useState(false); // Trạng thái mở cho ngày nhận phòng
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false); // Trạng thái mở cho ngày trả phòng
  const [roomsAvailable, setRoomsAvailable] = useState([]); // State để lưu danh sách phòng trống
  const [showRooms, setShowRooms] = useState(false); // Trạng thái hiển thị danh sách phòng
  const listRef = useRef(null); // Tạo ref cho danh sách phòng
  const [homestay, setHomestay] = useState([]);  // Danh sách homestay từ API
  const [currentPage, setCurrentPage] = useState(1);  // Trang hiện tại
  const homestaysPerPage = 6; // Số lượng homestay mỗi trang
  const [danhSachLoaiPhong, setDanhSachLoaiPhong] = useState([]); // Lưu danh sách loại phòng
  const [loaiPhongHienThi, setLoaiPhongHienThi] = useState('');
  const [selectedLoaiId, setSelectedLoaiId] = useState(null); // Mặc định là null hoặc id loại đã chọn
  const [images, setImages] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);


  const fetchHomestayImages = async () => {
  try {
    const response = await fetch('https://datn-7xip.onrender.com/dshinhanh');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setImages(data); // Đặt dữ liệu vào state
  } catch (error) {
  }
};
  useEffect(() => {
    fetchHomestayImages();
  }, []);

  const fetchAvailableRooms = async () => {
    try {
        const response = await fetch('https://datn-7xip.onrender.com/ngaydat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                checkIn: checkInDate.toISOString().split('T')[0],
                checkOut: checkOutDate.toISOString().split('T')[0],
            }),
        });
        const data = await response.json();
        setAvailableRooms(data); // Lưu danh sách phòng trống vào state
    } catch (error) {
    }
};
useEffect(() => {
  if (checkInDate && checkOutDate) {
      fetchAvailableRooms();
  }
}, [checkInDate, checkOutDate]);


// Gọi API để lấy danh sách phòng
useEffect(() => {
  fetch('https://datn-7xip.onrender.com/homestay') // Thay thế URL này bằng API thực tế của bạn
    .then(response => response.json())
    .then(data => setDanhSachPhong(data))
}, []);

// Gọi API để lấy danh sách loại phòng
useEffect(() => {
  fetch('https://datn-7xip.onrender.com/loaihomestay') // URL API để lấy danh sách loại homestay
    .then(response => response.json())
    .then(data => setDanhSachLoaiPhong(data))
}, []);

      // Hàm thay đổi loại phòng khi người dùng chọn từ dropdown
    const handleChangeLoaiPhong = (event) => {
    const value = event.target.value;
    setSelectedLoaiId(value === 'all' ? null : value); // Nếu chọn 'all', gán selectedLoaiId là null
    setLoaiPhongHienThi(value); // Cập nhật loại phòng hiện thi
  };

  useEffect(() => {
    // Fetch dữ liệu sản phẩm từ API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://datn-7xip.onrender.com/homestay');  // Thay URL với API của bạn
        setHomestay(response.data);  // Lưu sản phẩm vào state
      } catch (error) {
      }
    };

    fetchProducts();
  }, []);

      // Tổng số homestay và dữ liệu cần phân trang
    const totalHomestays = homestay.length;

      // Tính toán chỉ số của sản phẩm bắt đầu và kết thúc trên trang hiện tại
    const indexOfLastHomestay = currentPage * homestaysPerPage;
    const indexOfFirstHomestay = indexOfLastHomestay - homestaysPerPage;
    const currentHomestays = homestays.slice(indexOfFirstHomestay, indexOfLastHomestay); 

      // Chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    const handleCheckAvailableRooms = async () => {
      // Cuộn tới thẻ có id "rooms-section"
    const target = document.getElementById('rooms-section');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
    try {
      // Gửi yêu cầu để lấy danh sách phòng
    const response = await axios.get('https://datn-7xip.onrender.com/dshinhanh');
      
      // Lọc các phòng còn trống và phù hợp với `selectedLoaiId`
    const availableRooms = response.data.filter((room) => {
    const isAvailable = room.TrangThai === 'Còn phòng';
    const isMatchingLoai = selectedLoaiId ? room.id_Loai === Number(selectedLoaiId) : true;
        return isAvailable && isMatchingLoai;
      });
  
      // Sử dụng Set để lọc các id_homestay không trùng lặp
      const displayedIds = new Set();
      const uniqueAvailableRooms = availableRooms.filter((room) => {
        if (!displayedIds.has(room.id_homestay)) {
          displayedIds.add(room.id_homestay);
          return true;
        }
        return false;
      });
  
  
      // Cập nhật danh sách phòng còn trống vào state
      setRoomsAvailable(uniqueAvailableRooms);
      setShowRooms(true); // Kích hoạt hiển thị phòng
  
    } catch (error) {
    }
  };
  

      // Hàm để ẩn danh sách phòng khi click ra ngoài
    const handleClickOutside = (event) => {
    if (listRef.current && !listRef.current.contains(event.target)) {
      setShowRooms(false); // Ẩn danh sách phòng
    }
  };

  useEffect(() => {
    // Lắng nghe sự kiện click trên toàn bộ tài liệu
    document.addEventListener('mousedown', handleClickOutside);
  
    // Cleanup để gỡ bỏ sự kiện khi component bị unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); 

  // Dùng useEffect để gọi API khi component được render
  useEffect(() => {
    fetch('https://datn-7xip.onrender.com/homestay')  // Gọi API từ backend
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => setHomestays(data))  // Lưu dữ liệu vào state
}, []);

  const dateIn = new Date(checkInDate)
  const dateOut = new Date(checkOutDate)

  const isRoomAvailable = (currentHomestays) => {
    if (!checkInDate || !checkOutDate) return true; // Show all rooms if no date is selected
    if (!currentHomestays.ngay_dat || !currentHomestays.ngay_tra) return true; // Room is available if no booking exists
    const date_ngay_dat = new Date(currentHomestays.ngay_dat);
    const date_ngay_tra = new Date(currentHomestays.ngay_tra);
    
    return (
      dateOut < date_ngay_dat || dateIn > date_ngay_tra
    );
  };

  // Filter rooms based on availability
  const availableRoomsByDate = currentHomestays.filter(isRoomAvailable);

  console.log(availableRoomsByDate)

  return (
    <main className="wrapperMain_content">
      <section className="layout-collections-all">
        <div className="wrapper-mainCollection">
          <div className="banner">
            <div className="wap_name_dt_rr">
              <div className="min_warp2">
                <div className="name_menu_date_restaurant" data-aos="fade-up"  data-aos-duration="3000">
                  <p className="name_menu">Khám phá dịch vụ & tiện nghi </p>
                  <h1 className="restaurant">Homestay</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="section-search">
            <div className="form-search">
              <div className="form_booking">
                        <div className="checkin_homstay t-datepicker">
                            <div className="search-datepicker t-datepicker ">
                                <div className="search-item search-when">
                                    <FaCalendarAlt className="calendar-icon" onClick={() => setIsCheckInOpen(!isCheckInOpen)}/>
                                    <div className="search-form">
                                        <label>Ngày nhận phòng</label>
                                        <div className="t-dates t-date-check-in">
                                        <span className="t-day-check-in">
                                            {checkInDate.getDate().toString().padStart(2, '0')}/
                                        </span>
                                        <span className="t-month-check-in">
                                            {(checkInDate.getMonth() + 1).toString().padStart(2, '0')}/
                                        </span>
                                        <span className="t-year-check-in">{checkInDate.getFullYear()}</span>
                                        </div>
                                        {/* Sử dụng DatePicker để chọn ngày */}
                                        {isCheckInOpen && (
                                        <div className="date-picker-container_1">
                                        <DatePicker
                                        selected={checkInDate} // Ngày hiện tại
                                        onChange={(date) => {
                                            setCheckInDate(date);
                                            setIsCheckInOpen(false);
                                        }}
                                        dateFormat="dd/MM/yyyy"
                                        className="t-input-check-in"
                                        todayButton="Hôm nay"
                                        onClickOutside={() => setIsCheckInOpen(false)} // Đóng khi click ra ngoài
                                        inline // Hiển thị lịch luôn
                                        minDate={new Date()} // Vô hiệu hóa các ngày đã qua
                                        />
                                        </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="search-datepicker t-datepicker">
                                <div className="search-item search-when">
                                    <FaCalendarAlt className="calendar-icon" onClick={() => setIsCheckOutOpen(!isCheckOutOpen)} />
                                    <div className="search-form">
                                        <label>Ngày trả phòng</label>
                                        <div className="t-dates t-date-check-out">
                                            <span className="t-day-check-out">
                                            {checkOutDate.getDate().toString().padStart(2, '0')}/
                                            </span>
                                            <span className="t-month-check-out">
                                            {(checkOutDate.getMonth() + 1).toString().padStart(2, '0')}/
                                            </span>
                                            <span className="t-year-check-out">{checkOutDate.getFullYear()}</span>
                                        </div>
                                        {/* DatePicker cho ngày trả phòng */}
                                        {isCheckOutOpen && (
                                        <div className="date-picker-container_2">
                                            <DatePicker
                                                selected={checkOutDate}
                                                onChange={(date) => {
                                                setCheckOutDate(date);
                                                setIsCheckOutOpen(false);
                                                }}
                                                dateFormat="dd/MM/yyyy"
                                                className="t-input-check-out"
                                                todayButton="Hôm nay"
                                                onClickOutside={() => setIsCheckOutOpen(false)}
                                                inline
                                                minDate={checkInDate} // Vô hiệu hóa các ngày trước ngày nhận phòng
                                            />
                                        </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="number_people search_item">
                            <div className="seach_icons">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M288 350.1l0 1.9-32 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L447.3 128.1c-12.3-1-25 3-34.8 11.7c-35.4 31.6-65.6 67.7-87.3 102.8C304.3 276.5 288 314.9 288 350.1zM480 512c-88.4 0-160-71.6-160-160c0-76.7 62.5-144.7 107.2-179.4c5-3.9 10.9-5.8 16.8-5.8c7.9-.1 16 3.1 22 9.2l46 46 11.3-11.3c11.7-11.7 30.6-12.7 42.3-1C624.5 268 640 320.2 640 352c0 88.4-71.6 160-160 160zm64-111.8c0-36.5-37-73-54.8-88.4c-5.4-4.7-13.1-4.7-18.5 0C453 327.1 416 363.6 416 400.2c0 35.3 28.7 64 64 64s64-28.7 64-64z"/></svg>
                            </div>
                            <div className="search-form">
                              <div className="group-dropdown-qty">
                                <label className="homestay_type" htmlFor="homestay-type">Loại homestay</label>
                                <select value={loaiPhongHienThi} onChange={handleChangeLoaiPhong}>
                                  <option value="all">Tất cả các loại phòng</option>
                                  {danhSachLoaiPhong.map(loai => (
                                    <option key={loai.id_Loai} value={loai.id_Loai}>
                                      {loai.Ten_Loai}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                        </div>
                        <div className="">
                          <div>
                            <button hf type="button" className="ocean-button" onClick={handleCheckAvailableRooms}>
                              Đặt phòng
                            </button>
                          </div>
                      </div>
                  </div>
            </div>
          </div>
          <section className="section-collection-about-1" style={{padding: '100px 0' }}>
            <div className="container">
              <div className="heading-title text-center">
                <p className="more1">Chào mừng bạn đến với Paradiso</p>
                <h2 className="more2">
                  Tận hưởng quang cảnh biển xanh từ những ngôi nhà với thiết kế
                  hiện đại
                </h2>
                <p className="heading-desc">
                  Paradiso cung cấp nhiều lựa chọn chỗ nghỉ cho các nhóm với mọi
                  quy mô. Cho dù bạn quan tâm đến chỗ nghỉ tại khu nghỉ dưỡng
                  dành cho doanh nghiệp hay gia đình, phòng lãng mạn cho hai
                  người hay nơi nghỉ dưỡng khép kín trong cabin, chúng tôi đều
                  có chỗ nghỉ hoàn hảo dành cho bạn. Đội ngũ của chúng tôi tận
                  tâm cung cấp dịch vụ và chỗ nghỉ ngoạn mục như quang cảnh.
                </p>
                <div className="list-btn">
                  <div className="btn-little">
                    <a href="#" className="btn-ldp">
                      <span>Nhà gỗ &amp;Nhà nghỉ</span>
                    </a>
                  </div>
                  <div className="btn-little">
                    <a href="#" className="btn-ldp">
                      <span>Phòng &amp;Phòng Suite</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="rooms-section"  className="section-collection-col section-collection-col-1" style={{padding: '100px 0' }}>
            <div className="col-banner" style={{"--bg-col-all": "url(//theme.hstatic.net/200000909393/1001269498/14/collection_col_1_banner.jpg?v=2537)"}}>
              <div className="container breadcrumb-content text-center">
                <p className="breadcrumb-more1">
                  Chào mừng bạn đến với Paradiso
                </p>
                <h2>Khám phá Nhà gỗ &amp;Nhà nghỉ</h2>
                <p className="breadcrumb-more2">
                  Mang đến cho du khách bầu không khí lịch sự với những tiện
                  nghi hiện đại.
                </p>
              </div>
            </div>
            <div className="container_homelist">
            <div className="row_homelist list-pro list-pro-1">
              {(showRooms ? roomsAvailable : availableRoomsByDate).map((room, index) => (
                <div className="col-pro-style-1" key={index}>
                  <div className="product-loop product-loop-style-1">
                    <div className="product-inner">
                      <div className="proloop-image">
                        <div className="pro-price">
                          <span className="price">{room.gia_homestay}</span>
                          <span>/ Đêm</span>
                        </div>
                        <div className="owlCarousel-style owl-carousel owl-loaded owl-drag">
                          <div className="owl-stage-outer owl-height" style={{ height: "410px" }}>
                            <div className="owl-stage" style={{ transform: "translate3d(0px, 0px, 0px)", transition: "all", width: "3690px" }}>
                              <div className="owl-item active" style={{ width: "615px" }}>
                                <a href="/products/double-suite">
                                  <div className="product--image img-slide">
                                    {images && images.length > 0 ? (
                                      images.map((image, i) => (
                                        image.id_hinh === room.id_homestay && (
                                          <div key={i} className="lazy-img">
                                            <img className="img-loop" src={image.url_hinh} alt={room.ten_homestay || 'Hình ảnh homestay'} />
                                          </div>
                                        )
                                      ))
                                    ) : (
                                      <p>Không có hình để hiển thị</p>
                                    )}
                                  </div>
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="owl-nav">
                            <button type="button" className="owl-prev disabled" aria-label="prev slide">
                              {/* SVG prev */}
                            </button>
                            <button type="button" className="owl-next" aria-label="next slide">
                              {/* SVG next */}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="proloop-detail">
                        <h3><a href="/products/double-suite">{room.ten_homestay}</a></h3>
                        <div className="pro-tag">
                          <div className="tag-item tag-area">
                            <span>150</span><span className="tag-unit">m<sup>2</sup></span>
                          </div>
                          <div className="tag-item tag-guests">
                            <span>10</span><span className="tag-unit">Guests</span>
                          </div>
                          <div className="tag-item tag-bed">
                            <span>5</span><span className="tag-unit">Beds</span>
                          </div>
                          <div className="tag-item tag-bathroom">
                            <span>4</span><span className="tag-unit">Bathroom</span>
                          </div>
                        </div>
                        <div className="pro-desc">{room.mota}</div>
                        <div className="pro-desc" style={{ color: "red" }}>{room.TrangThai}</div>
                        <div className="btn-little">
                          <Link to={`/phong/${room.id_homestay}`} className="btn-a">
                            <span>Xem chi tiết</span>
                            {/* SVG icon */}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

              {/* Phân trang */}
              <Pagination 
                homestaysPerPage={homestaysPerPage} 
                totalHomestays={totalHomestays} 
                paginate={paginate} 
                currentPage={currentPage}
              />
            </div>
          </section>
          <section className="section-collection-about-2"style={{"--bg-col-all":" url(//theme.hstatic.net/200000909393/1001269498/14/collection_about_2_banner.jpg?v=2537)"}}>
            <div className="container_homelist">
              <div className="heading-title text-center">
                <p className="more1">Chào mừng bạn đến với Maple Inn</p>
                <h2 className="more2">
                  Trải nghiệm lưu trú thoải mái và tiện nghi
                </h2>
                <p className="heading-desc" style={{color: '#fff'}}>
                  Để tạo sự thoải mái cho tất cả khách, tất cả các tiện nghi và
                  chỗ ở của chúng tôi đều không khói thuốc 100% – bất kể chất
                  liệu hay thiết bị. Tất cả các phòng đều có TV cáp, tủ lạnh
                  mini, máy pha cà phê, lò vi sóng và khăn trải giường và khăn
                  tắm miễn phí.
                </p>
                <div className="about-time">
                  <div>
                    <p className="time">
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24"  >
                        <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z"></path>
                      </svg>
                      <span>Thời gian nhận phòng: 12:00 PM</span>
                    </p>
                  </div>
                  <div>
                    <p className="time">
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" >
                        <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z"></path>
                      </svg>
                      <span>Check-out Time: 10:00 AM</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};


const Pagination = ({ homestaysPerPage, totalHomestays, paginate, currentPage }) => {
  const pageNumbers = [];
  
  // Tính tổng số trang
  for (let i = 1; i <= Math.ceil(totalHomestays / homestaysPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      paginate(currentPage + 1);
    }
  };

  return (
    <nav>
      <ul className="pagination">
        {/* Nút Trang Trước */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button onClick={handlePrevPage} className="page-link" disabled={currentPage === 1}> Trước </button>
        </li>
        
        {/* Danh sách các số trang */}
        {pageNumbers.map((number) => (
          <li key={number} className={`page-item ${currentPage === number ? "active" : ""}`}>
            <button onClick={() => paginate(number)} className="page-link" > {number} </button>
          </li>
        ))}

        {/* Nút Trang Tiếp Theo */}
        <li className={`page-item ${currentPage === pageNumbers.length ? "disabled" : ""}`}>
          <button onClick={handleNextPage} className="page-link"  disabled={currentPage === pageNumbers.length} >Sau </button>
        </li>
      </ul>
    </nav>
  );
};

export default Phong;
