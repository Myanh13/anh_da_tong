import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import '../css/font-awesome-pro/css/BinhLuan.css';

const DanhGia = ({ id_homestay }) => {
    const [danhGia, setDanhGia] = useState([]);
    const [thongBao, setThongBao] = useState('');
    const [averageScore, setAverageScore] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);

    useEffect(() => {
        axios.get(`https://anh-api-tong.onrender.com/danhgia/${id_homestay}`)
            .then(response => {
                const reviews = response.data;
                setDanhGia(reviews);
                if (reviews.length > 0) {
                    const totalScore = reviews.reduce((acc, review) => acc + review.sao, 0);
                    setAverageScore((totalScore / reviews.length).toFixed(1));
                    setTotalReviews(reviews.length);
                }
            })
            .catch(error => {
                console.error("Lỗi khi lấy đánh giá:", error);
                setThongBao("Có lỗi xảy ra khi tải đánh giá.");
            });
    }, [id_homestay]);

    return (
        <div className="danhgia-container">
            <h4 className="danhgia-header">Đánh giá cho sản phẩm</h4>
            {thongBao && <p className="thongbao">{thongBao}</p>}
            <div className="mod-rating">
                <div className="content">
                    <div className="left">
                        <div className="summary" style={{ backgroundImage: 'linear-gradient(to left, transparent 0%, white 70%), url(https://ik.imagekit.io/tvlk/image/imageResource/2024/02/27/1709006618796-0948bf193a75980973e8a1b45f676819.svg?tr=q-75)' }}>
                            <div className="score">
                                <span className="score-average" style={{ color: 'rgb(27, 160, 226)', lineHeight: '28px' }}>{averageScore}</span>
                                <span className="score-max">/10</span>
                            </div>
                            <div className="average">
                                <div className="container-star" style={{ width: '166.25px', height: '33.25px' }}>
                                    {[...Array(5)].map((_, i) => (
                                        <img
                                            key={i}
                                            className="star"
                                            src="//img.lazcdn.com/g/tps/tfs/TB19ZvEgfDH8KJjy1XcXXcpdXXa-64-64.png"
                                            alt="star"
                                            style={{ width: '33.25px', height: '33.25px' }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <br />
                            <div className="count">{totalReviews} Đánh giá</div>
                        </div>
                        {/* <div className="detail">
                            <ul>
                                {[5, 4, 3, 2, 1].map((rating, index) => {
                                    const count = danhGia.filter(dg => dg.sao === rating).length;
                                    return (
                                        <li key={index}>
                                            <div className="container-star progress-title" style={{ width: '79.8px', height: '15.96px' }}>
                                                {[...Array(rating)].map((_, i) => (
                                                    <img
                                                        key={i}
                                                        className="star"
                                                        src="//img.lazcdn.com/g/tps/tfs/TB19ZvEgfDH8KJjy1XcXXcpdXXa-64-64.png"
                                                        alt="star"
                                                        style={{ width: '15.96px', height: '15.96px' }}
                                                    />
                                                ))}
                                            </div>
                                            <span className="progress-wrap">
                                                <div className="pdp-review-progress">
                                                    <div className="bar bg"></div>
                                                    <div className="bar fg" style={{ width: `${(count / totalReviews) * 100}%` }}></div>
                                                </div>
                                            </span>
                                            <span className="percent">{count}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div> */}
                    </div>
                </div>
            </div>
            <ul className="danhgia-list">
                {danhGia.map((dg) => (
                    <li key={dg.id} className="danhgia-item">
                        <strong>{dg.ten_user}</strong> ({new Date(dg.ngay).toLocaleString()}):
                        <p>{'⭐'.repeat(dg.sao)} ({dg.sao}/5)</p>
                        <p>{dg.noi_dung}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DanhGia;
