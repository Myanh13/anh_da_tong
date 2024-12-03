import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => { 
  return (
    <div className="not-found-container">
      <p className="not-found-text">KHÔNG ĐỦ QUYỀN TRUY CẬP</p> 
      <Link to={'/'} className="not-found-button">Go Back Home</Link>
    </div>
  );
};

export default Unauthorized; 