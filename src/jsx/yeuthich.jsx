
import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function Thich() {
    const navigate = useNavigate();
    const [images, setImages] = useState([]); // Hình ảnh homestay

    // const { id } = useParams();
    // const [showyeuthich, setHomestay] = useState(null);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     axios.get(`https://anh-api-tong.onrender.com/yeuthich`)
    //         .then(response => {
    //             setHomestay(response.data);
    //         })
    //         .catch(err => {
    //             setError("Lỗi khi tải dữ liệu homestay");
    //         });
    // }, [id]);
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        // Lấy danh sách yêu thích từ localStorage khi component được mount
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
        // console.log(storedFavorites)
        // console.log('storedFavorites')
    }, []);
    const removeFromFavorites = (id) => {
        const updatedFavorites = favorites.filter(homestay => homestay.id_homestay !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };
    // const removeAllFavorites = () => {
    //     const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa tất cả yêu thích không?");
    //     if (confirmDelete) {
    //         setFavorites([]); // Cập nhật trạng thái favorites thành mảng rỗng
    //         localStorage.removeItem('favorites'); // Xóa khỏi localStorage
    //     }
    // };

    // console.log('storedFavorites')
    // Hàm quay lại trang trước đó
  const handleGoBack = () => {
    navigate(-1); // Giá trị -1 nghĩa là quay lại trang trước
  };

  
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

    return (
<div className="danhs1">
        <section className="bread-crumb">
            <div className="min_warp2">
                <ul className="breadcrumb" >
                    <li className="breadcrumb_list">
                        <Link to={''} href="index.html">
                            Trang chủ
                        </Link>
                    </li>
                    <li className="breadcrumb_list">
                        <span className="mr_lr"><i className="fa-solid fa-chevron-right"></i></span>
                        <Link to={''} itemType="http://schema.org/Thing" itemProp="item" href="product.html">
                        Sản phẩm
                        </Link>
                    </li>
                    <li className="breadcrumb_list">
                        <span className="mr_lr"><i className="fa-solid fa-chevron-right"></i></span>
                        <Link to={''} itemType="http://schema.org/Thing" itemProp="item" href="toyen.html">
                            <span itemProp="name">Tổ yến</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
        <div className="product_main">
            <div className="min_warp2">
                <div className="product_title">
                    <h1>Danh sách yêu thích</h1>
                    <div className="title_separator">
                        <div className="separator_center"></div>
                    </div>
                </div>
                <div className="product_view">
                    <div className="product_view_content">
                        <ul className="product_cate">
                            {/* <li className="product_cate_item active-2">
                                <a href="">Mặc định</a>
                            </li>
                            <li className="product_cate_item">
                                <a href="#">Tên A-Z</a>
                            </li>
                            <li className="product_cate_item">
                                <a href="#">Tên Z-A</a>
                            </li>
                            <li className="product_cate_item">
                                <a href="#">Giá thấp đến cao</a>
                            </li>
                            <li className="product_cate_item">
                                <a href="#">Giá cao xuống thấp</a>
                            </li>
                            <li className="product_cate_item">
                                <a href="#">Khuyến mãi</a>
                            </li> */}
                            {/* <li className="product_cate_item"  onClick={removeAllFavorites}>
                                <span to="#">Xóa tất cả yêu thích</span>
                            </li> */}
                        </ul>
                    </div>
                    {favorites.length > 0 ? (
                    <ul id="content1" className=" tab_pro_list flex" >
                            {favorites.map((homestay) => (
                        <li className="tab_pro_item" key={homestay.id_homestay}>
                            {images.length > 0 ? (
                                images.map((image, index) => {
                                    if (homestay.id_homestay === image.id_hinh) {
                                        return (
                                        <Link to={''}>
                                            <figure>
                                                <img src={image.url_hinh} alt=""/>
                                                <img src={image.url_hinh} alt=""/>
                                            </figure>
                                            
                                            <div className="button_sale">
                                                <h3>{homestay.ten_homestay}</h3>
                                                <div className="sale_price">
                                                    <div className="new_price">{homestay.gia_homestay.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                                </div>
                                                <div className="product_button">
                                                    <button name="#" className="btn_sale">
                                                    <Link> <span>Đặt Homestay</span>     </Link>        
                                                    </button>
                                                    <button name="#" className="btn_sale" onClick={() => removeFromFavorites(homestay.id_homestay)}>
                                                        <span>xóa</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </Link>
                                  );
                                }
                                return null; // Đảm bảo có return nếu không thỏa mãn điều kiện
                                })
                            ) : (
                                <p>Không có hình để hiển thị</p>
                            )}
                        </li>
                      
                        
                            ))}
                    </ul>
                       ) : (
                        <div className="no_product">
                        <h4>Chưa có Homestay yêu thích nào...</h4>
                        <Link to="/phong" className="link-to-room">
                        <span>  Xem phòng ngay</span>
                        </Link>
                      </div>
                    
                    )}
                </div>
                <div className="paginate">
                    <div class="btn_ev page_yeuthich" data-aos="fade-up" data-aos-duration="1000" onClick={handleGoBack} >
                        <a href="#"><span>Trở về</span></a>
                    </div>       
                </div>
            </div>
        </div>
</div>
    );
    
}

export default Thich;