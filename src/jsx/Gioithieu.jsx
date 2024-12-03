import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// import './Banner.css';

const Gioithieu = () => {
    const { id } = useParams();
    const [showhomestay, setHomestay] = useState(null); // Lưu thông tin homestay
    const [error, setError] = useState(null); // Lưu lỗi nếu có
    useEffect(() => {
        axios.get(`https://anh-api-tong.onrender.com/homestay`)
          .then(response => {
            setHomestay(response.data); // Lưu thông tin homestay vào state
          })
          .catch(err => {
            setError("Lỗi khi tải dữ liệu homestay");
          });
      }, [id]);
    return (
        <div>
            {/* Banner Section */}
            <div className="banner gioithieu">
                <div className="wap_name_dt_rr">
                <div className="min_warp2">
                    <div className="name_menu_date_restaurant" data-aos="fade-up"  data-aos-duration="3000">
                    <p className="name_menu">Một khách sạn mang tính biểu tượng từ năm 1998</p>
                    <h1 className="restaurant">Giới Thiệu</h1>
                    <p class="date">Thiên đường nghỉ dưỡng, yên tĩnh và phục hồi.</p>
                    </div>
                </div>
                </div>
            </div>

            {/* Content Section with Image and Text */}
            <div class="row8">
                <div class="heading_title mg9 about-content" data-aos="fade-up" data-aos-duration="1500">
                    <p class="title1">CHÀO MỪNG BẠN ĐẾN VỚI PARADISO</p>
                    <h2 class="title2">Nằm ngay trung tâm thành phố, cảnh quan tuyệt đẹp</h2>
                    <p class="heading_desc">  Nằm giữa lòng khu nghỉ dưỡng, trên rìa của một những con dốc yên tĩnh và xinh đẹp, Maple Inn là thiên đường ấm áp, tĩnh lặng và trẻ hóa. Tắm mình trong ánh nắng rực rỡ và bầu trời trong xanh, nơi đây có tầm nhìn tuyệt đẹp ra những bãi biển rợp bóng cọ và rạn san hô tuyệt đẹp.</p>
                </div>
                  {/* Image Row Section */}
                <section className="image-row-section min_warp2" data-aos="fade-up" data-aos-duration="2500">
                    <div className="image-row">
                        <div className="image-item">
                            <img 
                                src="https://theme.hstatic.net/200000909393/1001269498/14/about_us_1_banner_1.jpg?v=2537" 
                                alt="Ảnh 1"
                                className="image"
                            />
                        </div>
                        <div className="image-item">
                            <img 
                                src="https://theme.hstatic.net/200000909393/1001269498/14/about_us_1_banner_2.jpg?v=2537" 
                                alt="Ảnh 2"
                                className="image"
                            />
                        </div>
                        <div className="image-item">
                            <img 
                                src="https://theme.hstatic.net/200000909393/1001269498/14/about_us_1_banner_3.jpg?v=2537" 
                                alt="Ảnh 3"
                                className="image"
                            />
                        </div>
                    </div>
                </section>
            </div>

            {/* Banner Below Images */}
           <div className="bg_banner_bottom">
                <section className="banner-bottom" data-aos="fade-up" data-aos-duration="3000">
                    <div className="banner-text-bottom">
                        <h3>TẬN HƯỞNG KỲ NGHỈ CỦA BẠN TẠI PARADISO</h3>
                        <h2 class="title2">Hãy tận hưởng kỳ nghỉ thoải mái của bạn tại trung tâm khu rừng xinh đẹp</h2>
                    </div>
                    {/* Overlay Text */}
                    <div className="banner-overlay-text">
                      <div className="col-lg-3">
                        <div class="counter-icon">
                                <div class="counter">72</div>
                                <div class="text_couter">Phòng Premium</div>
                            </div>
                      </div>
                      <div className="col-lg-3">
                        <div class="counter-icon">
                                <div class="counter">20</div>
                                <div class="text_couter">Phòng Deluxe</div>
                            </div>
                      </div>
                      <div className="col-lg-3">
                        <div class="counter-icon">
                                <div class="counter">12</div>
                                <div class="text_couter">Nhà gỗ riêng</div>
                            </div>
                      </div>
                      <div className="col-lg-3">
                        <div class="counter-icon">
                                <div class="counter">9</div>
                                <div class="text_couter">Năm thành lập</div>
                            </div>
                      </div>
                       
                    </div>
                </section>
           </div>
           <div className="min_warp2">
              <div className="row8 row_gioithieu">
                <div class="col-lg-6 col-12 about-content">
                    <div class="heading-title">
                        <p class="title1">Trải nghiệm lưu trú tuyệt vời tại Maple Inn</p>
                        <h2 class="title2">Phòng nghỉ tự nhiên và nhà gỗ riêng</h2>
                        <p class="heading_desc">Nằm giữa lòng khu nghỉ dưỡng, trên rìa của một những con dốc yên tĩnh và xinh đẹp, Maple Inn là thiên đường ấm áp, tĩnh lặng và trẻ hóa. Tắm mình trong ánh nắng rực rỡ và bầu trời trong xanh, nơi đây có tầm nhìn tuyệt đẹp ra những bãi biển rợp bóng cọ và rạn san hô tuyệt đẹp.</p>
                    </div>              
                    <div className="btn-more text_left">
                        <button type="submit" className="ocean-button">
                        Đặt phòng ngay
                        </button>
                    </div>
                </div>
                <div className="col-lg-6">
                    <ul className="homestay_list_gioithieu homestay-section" data-aos="fade-up" data-aos-duration="2000">
                        {Array.isArray(showhomestay) && showhomestay.slice(0, 1).map((homestay) => (
                            <li key={homestay.id_homestay}>
                                <Link to={''}>
                                    <div className="img_homstay img_gioithieu">
                                        <div className="pro-price">
                                            <span className="price">{homestay.gia_homestay.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                            <span>/ Đêm</span>
                                        </div>
                                        <img src="/image/HST2.png" alt="" />
                                    </div>
                                    <div className="des_hst gioithieu">
                                        <div className="proloop-detail content_gioithieu">
                                            <h3><Link to="#">{homestay.ten_homestay}</Link></h3>
                                            <div className="pro-tag content_gioithieu">
                                                <div className="tag-item tag-area">
                                                    <span>150</span> <span className="tag-unit">m<sup>2</sup></span>
                                                </div>
                                                <div className="tag-item tag-guests">
                                                    <span>10</span> <span className="tag-unit">Guests</span>
                                                </div>
                                                <div className="tag-item tag-bed">
                                                    <span>5</span> <span className="tag-unit">Beds</span>
                                                </div>
                                                <div className="tag-item tag-bathroom">
                                                    <span>4</span> <span className="tag-unit">Bathroom</span>
                                                </div>
                                            </div>
                                            <div className="pro-desc content_gioithieu">
                                                Double Suite rộng 150m² với thiết kế trong suốt, nằm ở tầng cao nhất của khách sạn, mang đến tầm nhìn toàn cảnh tuyệt đẹp...
                                            </div>
                                            <div className="btn_ev content_gioithieu">
                                                <Link to={"/homestay/" + homestay.id_homestay}>
                                                    <span>Xem chi tiết
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
                                                    </span>
                                                </Link>
                                            </div>   
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
               </div>
              </div>
              <section className="content-boxess" data-aos="fade-up" data-aos-duration="2500">
                    <div className="image-box">
                        <img
                            src="https://theme.hstatic.net/200000909393/1001269498/14/about_us_3_banner_1.jpg?v=2537" 
                            alt="Hình ảnh nhỏ Maple Inn"
                            className="room-image-small"
                        />
                        <img
                            src="https://theme.hstatic.net/200000909393/1001269498/14/about_us_3_banner_2.jpg?v=2537" 
                            alt="Phòng nghỉ tại Maple Inn"
                            className="room-image-large"
                        />
                    </div>
                    <div className="text-box">
                    <div class="heading-title">
                        <p class="title1">Trải nghiệm lưu trú tuyệt vời tại PARADISO</p>
                        <h2 class="title2">Trải nghiệm thiên nhiên tuyệt vời nhất</h2>
                        <p class="heading_desc">Nằm giữa lòng khu nghỉ dưỡng, trên rìa của một những con dốc yên tĩnh và xinh đẹp, Maple Inn là thiên đường ấm áp, tĩnh lặng và trẻ hóa. Tắm mình trong ánh nắng rực rỡ và bầu trời trong xanh, nơi đây có tầm nhìn tuyệt đẹp ra những bãi biển rợp bóng cọ và rạn san hô tuyệt đẹp.</p>
                    </div>   
                    <div className="btn-more text_left">
                        <button type="submit" className="ocean-button">
                        Khám phá ngay
                        </button>
                    </div>  
                    </div>
              </section>     
           </div>
          
              
        
{/* <!-- service --> */}
            <div className="bg_service" >
                <div className="min_warp2">
                    <div className="row_warp">
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="service-item" data-aos="fade-zoom-in"
     data-aos-easing="ease-in-back"
     data-aos-delay="300"
     data-aos-offset="0">
                                <div className="item-icon">
                                    <img src="//theme.hstatic.net/200000909393/1001269498/14/home_service_img_1.jpg?v=2537" alt="Dịch vụ đưa đón tại sân bay"/>
                                </div>
                                <div className="item-detail">
                                    <h3 className="detail-title">Dịch vụ đưa đón tại sân bay</h3>
                                    <p className="detail-desc">Lorem ipsum proin gravida velit auctor alueut aenean sollicitu din, lorem auci elit consequat ipsutissem niuis sed odio sit amet a sit amet.</p>
                                </div>
                            </div>
                        </div>                
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="service-item" data-aos="fade-zoom-in"
     data-aos-easing="ease-in-back"
     data-aos-delay="300"
     data-aos-offset="0">
                                <div className="item-icon">
                                    <img src="//theme.hstatic.net/200000909393/1001269498/14/home_service_img_2.jpg?v=2537" alt="Dịch vụ quản gia"/>
                                </div>
                                <div className="item-detail">
                                    <h3 className="detail-title">Dịch vụ quản gia</h3>
                                    <p className="detail-desc">Lorem ipsum proin gravida velit auctor alueut aenean sollicitu din, lorem auci elit consequat ipsutissem niuis sed odio sit amet a sit amet.</p>
                                </div>
                            </div>
                        </div>      
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="service-item" data-aos="fade-zoom-in"
     data-aos-easing="ease-in-back"
     data-aos-delay="300"
     data-aos-offset="0">
                                <div className="item-icon">
                                    <img src="//theme.hstatic.net/200000909393/1001269498/14/home_service_img_3.jpg?v=2537" alt="Wifi &amp; Internet"/>
                                </div>
                                <div className="item-detail">
                                    <h3 className="detail-title">Wifi &amp; Internet</h3>
                                    <p className="detail-desc">Lorem ipsum proin gravida velit auctor alueut aenean sollicitu din, lorem auci elit consequat ipsutissem niuis sed odio sit amet a sit amet.</p>
                                </div>
                            </div>
                        </div>       
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="service-item" data-aos="fade-zoom-in"
     data-aos-easing="ease-in-back"
     data-aos-delay="300"
     data-aos-offset="0">
                                <div className="item-icon">
                                    <img src="//theme.hstatic.net/200000909393/1001269498/14/home_service_img_4.jpg?v=2537" alt="Dịch vụ giặt ủi"/>
                                </div>
                                <div className="item-detail">
                                    <h3 className="detail-title">Dịch vụ giặt ủi</h3>
                                    <p className="detail-desc">Lorem ipsum proin gravida velit auctor alueut aenean sollicitu din, lorem auci elit consequat ipsutissem niuis sed odio sit amet a sit amet.</p>
                                </div>
                            </div>
                        </div>           
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="service-item" data-aos="fade-zoom-in"
     data-aos-easing="ease-in-back"
     data-aos-delay="300"
     data-aos-offset="0">
                                <div className="item-icon">
                                    <img src="//theme.hstatic.net/200000909393/1001269498/14/home_service_img_5.jpg?v=2537" alt="Bữa sáng tại phòng"/>
                                </div>
                                <div className="item-detail">
                                    <h3 className="detail-title">Bữa sáng tại phòng</h3>
                                    <p className="detail-desc">Lorem ipsum proin gravida velit auctor alueut aenean sollicitu din, lorem auci elit consequat ipsutissem niuis sed odio sit amet a sit amet.</p>
                                </div>
                            </div>
                        </div>              
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="service-item" data-aos="fade-zoom-in"
     data-aos-easing="ease-in-back"
     data-aos-delay="300"
     data-aos-offset="0">
                                <div className="item-icon">
                                    <img src="//theme.hstatic.net/200000909393/1001269498/14/home_service_img_6.jpg?v=2537" alt="Chỗ đậu xe riêng"/>
                                </div>
                                <div className="item-detail">
                                    <h3 className="detail-title">Chỗ đậu xe riêng</h3>
                                    <p className="detail-desc">Lorem ipsum proin gravida velit auctor alueut aenean sollicitu din, lorem auci elit consequat ipsutissem niuis sed odio sit amet a sit amet.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
{/* <!-- service --> */}
{/* // <!-- form email --> */}
<div className="email_newletter" data-aos="fade-up" data-aos-duration="1000" >
                    <div className="min_warp2">
                        <div className="row_email">
                            <div className="col-lg-6 col-12">
                                <div className="newsletter_title">
                                    <div className="heading-title">
                                        <p className="title3">Hãy kết nối cùng Paradiso</p>
                                        <h3 className="title4">Đăng ký nhận bản tin của chúng tôi để nhận tin tức, ưu đãi và khuyến mãi.</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-12">
                                <form acceptCharset="UTF-8" action="#" className="contact_form" method="post">
                                    <input name="form_type" type="hidden" value="customer"/>
                                    <input name="utf8" type="hidden" value="✓"/>
                                    <div className="form-group input-group">
                                        <input type="hidden" id="new_tags" name="#" value="Đăng kí nhận tin"/>     
                                        <input required="" type="email" name="#" className="form-control newsletter-input" id="newsletter-email" pattern="^(.)+@[A-Za-z0-9]([A-Za-z0-9.\-]*[A-Za-z0-9])?\.[A-Za-z]{1,13}$" placeholder="Nhập email của bạn" aria-label="Email Address"/>
                                        <div className="input_btn">
                                            <button type="submit" className="cta-submitform newsletter-btn">Đăng ký 
                                                <span className="icon-btn"><i className="fa fa-send-o"></i></span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="check-form">
                                        <input type="checkbox" id="new_check" required=""/>
                                        <span>Đã đọc &amp; Đồng ý <a href="#"> & Chính sách bảo mật</a></span>
                                    </div>
                                    <input id="eb66e25e0d524d97a7478759b2b7d91e" name="g-recaptcha-response" type="hidden"/>
                                </form>
                            </div>
                        </div>
                    </div>
            </div>
{/* /* <!-- form email --> */}
{/* <!-- footer-intagram --> */}
<div className="footer-instagram" data-aos="fade-zoom-in" data-aos-easing="ease-in-out"data-aos-delay="400" data-aos-offset="0">
                    <div className="min_warp2">
                        <div className="row_col">
                            <>
                                <Swiper
                                    slidesPerView={4}
                                    spaceBetween={30}
                                    pagination={{
                                      clickable: true,
                                    }}
                                    autoplay={{
                                      delay: 3000, // Delay between slides in milliseconds
                                      disableOnInteraction: false, // Continue autoplay after user interaction
                                    }}
                                    breakpoints={{
                                        768: { // Trên 768px
                                          slidesPerView: 4, // Hiển thị 4 slides
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
                                    modules={[Pagination, Autoplay]}
                                    className="mySwiper"
                                >
                                <SwiperSlide>
                                    <div className="box_intagram">
                                        <img src="//theme.hstatic.net/200000909393/1001269498/14/home_instagram_img_1.jpg?v=2537" alt="Instgram 1"/>
                                    </div>   
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="box_intagram">
                                    <img src="//theme.hstatic.net/200000909393/1001269498/14/home_instagram_img_2.jpg?v=2537" alt="Instgram 2"/>
                                    </div>   
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="box_intagram">
                                    <img src="//theme.hstatic.net/200000909393/1001269498/14/home_instagram_img_3.jpg?v=2537" alt="Instgram 3"/>
                                    </div>   
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="box_intagram">
                                    <img src="//theme.hstatic.net/200000909393/1001269498/14/home_instagram_img_4.jpg?v=2537" alt="Instgram 4"/>
                                    </div>   
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="box_intagram">
                                        <img src="//theme.hstatic.net/200000909393/1001269498/14/home_instagram_img_1.jpg?v=2537" alt="Instgram 1"/>
                                    </div>   
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="box_intagram">
                                        <img src="//theme.hstatic.net/200000909393/1001269498/14/home_instagram_img_1.jpg?v=2537" alt="Instgram 1"/>
                                    </div>   
                                </SwiperSlide>
                              

                                </Swiper>
                            </>
                            {/* <div className="box_intagram">
                                <img src="//theme.hstatic.net/200000909393/1001269498/14/home_instagram_img_1.jpg?v=2537" alt="Instgram 1"/>
                            </div>   
                            <div className="box_intagram">
                                <img src="//theme.hstatic.net/200000909393/1001269498/14/home_instagram_img_2.jpg?v=2537" alt="Instgram 2"/>
                            </div>            
                            <div className="box_intagram">
                                <img src="//theme.hstatic.net/200000909393/1001269498/14/home_instagram_img_3.jpg?v=2537" alt="Instgram 3"/>
                            </div>           
                            <div className="box_intagram">
                                <img src="//theme.hstatic.net/200000909393/1001269498/14/home_instagram_img_4.jpg?v=2537" alt="Instgram 4"/>
                            </div>            */}
                        </div>
                        <div className="btn-more text-center">
                            <a href="#"><button className="ocean-button" id="oceanButton"><i className="fa-brands fa-instagram"></i> Theo dõi trên Instagram</button></a>
                        </div>
                    </div>
                </div>
{/* <!-- footer-intagram --> */}
                
        
        </div>
    );
};

export default Gioithieu;

			
