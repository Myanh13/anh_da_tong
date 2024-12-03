import React from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";
// import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Footer() {
    return(
       <div>
     
        <footer>
        <div className="footer_container">
            <div className="bg_footer">
                <div className="min_warp2">
                    <div className="row" data-aos="fade-up" data-aos-duration="3000">
                        <div className="col1_ft">
                            <h2><a href="">Paradiso</a></h2>
                            <p>Được thành lập vào năm 1998, Maple Inn tọa lạc trên những ngọn đồi của Lâm Đồng, đưa bạn đắm chìm vào sự kỳ diệu của dãy núi Langbiang của Đà Lạt trên nền trời trong xanh. Chào mừng đến với Maple Inn</p>
                            <ul className="footer_icon">
                                <li className="item_ft"><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>		
                                <li className="item_ft"><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>											
                                <li className="item_ft"><a href="#"><i className="fa-brands fa-instagram"></i></a></li>											
                                <li className="item_ft"><a href="#"><i className="fa-brands fa-google-plus-g"></i></a></li>											
                                <li className="item_ft"><a href="#"><i className="fa-brands fa-youtube"></i></a></li>											
                            </ul>
                        </div>
                        <div className="col2_ft">
                            <h4 className="tittle_ft">Về Paradiso</h4>
                            <ul className="nav_link">
                                <li className="item_ft"><a className="a_nav_link" href="">Tìm kiếm</a></li>
                                <li className="item_ft"><a href="#">Giới thiệu</a></li>	
                                <li className="item_ft"><a href="#">Chính sách </a></li>	
                                <li className="item_ft"><a href="#">Điều khoản sử dụng</a></li>		
                                <li className="item_ft"><a href="#">Điều khoản dịch vụ</a></li>		
                                <li className="item_ft"><a href="#">Câu hỏi thường gặp</a></li>											
                            </ul>
                        </div>
                        <div className="col2_ft">
                            <h4 className="tittle_ft">Dịch Vụ</h4>
                            <ul className="nav_link">
                                <li className="item_ft"><a href="#">Nhà hàng</a></li>	
                                <li className="item_ft"><a href="#">Tiệc & Sự kiện</a></li>	
                                <li className="item_ft"><a href="#">Spa & Massaget</a></li>		                                							
                            </ul>
                        </div>
                        <div className="col3_ft">
                            <h4 className="tittle_ft">Liên hệ</h4>
                            <ul className="nav_link">
                                <li className="contact_ft"><i class="fa-thin fa-location-dot"></i><Link to="https://maps.app.goo.gl/84gn1sVpEfyvha5r8" target="_blank">
  Xem trên bản đồ
</Link></li>	
                                <li className="contact_ft"><i class="fa-thin fa-phone"></i><a href="">  0777092128</a></li>	
                                <li className="contact_ft"><i class="fa-thin fa-envelope"></i><a href=""> Paradiso6@gmail.com</a></li>	
                                <div className="btn_map ">
                                   <a href="#"><span>Xem đường đi</span></a>
                                </div>                             							
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
{/* <!-- end footer --> */}
        <div className="end_footer">
            <div className="footer_copyright">
                <div className="min_warp2">
                   <div className="row_ft">
                    <div className="col50">
                        <p className="p_ft" >Copyright © 2024 <a href="#"> Paradiso</a>. 
                            <a rel="nofollow noopener" target="_blank" href="">Powered by Haravan</a>
                        </p>
                    </div>
                    <div className="col50">
                        <ul className="copyright_link">
                            <li className="item">
                                <a href="#" title="Tìm kiếm">Tìm kiếm</a>
                            </li>                                
                            <li className="item">
                                <a href="#" title="Giới thiệu">Giới thiệu</a>
                            </li>                             
                            <li className="item">
                                <a href="#" title="Chính sách đổi trả">Điều khoản dịch vụ</a>
                            </li>                                
                            <li className="item">
                                <a href="#" title="Chính sách bảo mật">Câu hỏi thường gặp</a>
                            </li>                                                      
                            <li className="item">
                                <a href="#" title="Liên hệ">Liên hệ</a>
                            </li>                                    
                        </ul>
                    </div>

                   </div>
                </div>
            </div>
        </div>
{/* <!-- end footer --> */}
    </footer>
</div>
    )
    
}
export default Footer