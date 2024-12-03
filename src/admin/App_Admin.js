import '../Admin.css';
import '../App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Aos from 'aos';
import 'aos/dist/aos.css';


// Import các trang

import Home_admin from '../admin/Home_ad.jsx';
import ScrollManager from './jsx/ScrollManager';






function App() {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <BrowserRouter basename="/">
         <ScrollManager/>
      <div className="App">
        {/* Định nghĩa Routes */}
        <Routes>
          {/* Các trang hợp lệ sẽ sử dụng Layout với Header và Footer */}
          <Route path="/admin" element={<Home_admin />} />
     






          {/* Trang NotFound không có Header và Footer */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
