import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <img src="../../image/404.svg" alt="Page Not Found" className="not-found-image" />
      <p className="not-found-text">Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
      <Link to={'/'} className="not-found-button">Go Back Home</Link>
    </div>
  );
};

export default NotFound;
