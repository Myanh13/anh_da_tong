import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Lienhe = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [thongBao, setThongBao] = useState('');
  const [user, setUser] = useState(null); // Lưu thông tin người dùng
  useEffect(() => {
    // Lấy thông tin từ localStorage
    const storedUser = JSON.parse(localStorage.getItem('auth'));

    if (storedUser) {
      // Nếu có dữ liệu người dùng, cập nhật state user
      setUser(storedUser);
      setName(storedUser.ten_user || ''); // Set giá trị mặc định nếu name không tồn tại
      setEmail(storedUser.email_user || '');
      
    }
  }, []); // Chỉ chạy một lần khi component render

  const handleSubmit = (e) => {
    e.preventDefault();

    // Sending the form data via Axios to the backend
    axios.post('https://anh-api-tong.onrender.com/contact', {  
      name,
      email,
      phone,
      message,
    })
    .then(response => {
    setThongBao(response.data.thongbao);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    
    // Hiển thị thông báo thành công
    window.alert("Cảm ơn bạn đã liên hệ, chúng tôi sẽ liên hệ lại sau!");
  })
  .catch(error => {
    console.error("Error sending message:", error);
    setThongBao("Đã xảy ra lỗi, vui lòng thử lại.");
  });
};


  return (
    <main>
      <div className="banner banner_contact"></div>
      <div className="section_menu">
        <div className="bg_contact">
          <div className="min_warp2">
            <div className="row8">
              <div className="img_form_contact" data-aos="fade-up" data-aos-duration="2000">
                <div className="col50">
                  <div className="pd_15">
                    <div className="box_img_ct" data-aos="fade-up" data-aos-duration="3000">
                      <figure>
                        <img src="/image/banner3.png" alt="icon_contact" />
                      </figure>
                    </div>
                  </div>
                </div>
                <div className="col50">
                  <div className="form_contact" data-aos="fade-up" data-aos-duration="3000">
                    <div className="box_info_contact">
                      <h2 className="tittle_contact">Thông tin liên hệ</h2>
                      <div className="wrapbox_contact">
                        <ul className="list_contact">
                          <li>
                            <p><strong>Địa chỉ:</strong> 1234 Nguyễn Thị Minh Khai, phường 15, quận 5, Đà Lạt, Lâm Đồng</p>
                          </li>
                          <li>
                            <p>
                              <a href="#">
                                <strong>Điện thoại:</strong> 1900.000.XXX
                              </a>
                            </p>
                          </li>
                          <li>
                            <p><strong>Email:</strong> docongdanh357@gmail.com</p>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="contact-form-container">
                      <h2>Gửi thắc mắc cho chúng tôi</h2>
                      <div id="col-left contactFormWrapper">
                        <form onSubmit={handleSubmit} className="contact-form">
                          <div className="wap_input">
                            <div className="col-sm-12">
                              <div className="input-group">
                                <input
                                  required
                                  type="text"
                                  name="name"
                                  className="form-control"
                                  placeholder="Tên của bạn"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  aria-describedby="basic-addon1"
                                />
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="input-group">
                              <input
                                  required
                                  type="email"
                                  name="email"
                                  className="form-control"
                                  placeholder="Email của bạn"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  aria-describedby="basic-addon1"
                                />
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="input-group">
                                <input
                                  required
                                  type="text"
                                  name="phone"
                                  className="form-control"
                                  placeholder="Số điện thoại của bạn"
                                  pattern="[0-9]{10,12}"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  aria-describedby="basic-addon1"
                                />
                              </div>
                            </div>
                            <div className="input-group">
                              <textarea
                                required
                                name="message"
                                className="form-control"
                                placeholder="Nội dung tin nhắn"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                              ></textarea>
                            </div>
                            <p className="small_p_capcha">
                              This site is protected by reCAPTCHA and the Google 
                              <strong> Privacy Policy</strong> and <strong> Terms of Service</strong> apply.
                            </p>
                            <div className="btn-more text_left">
                              <button type="submit" className="ocean-button">
                                Gửi cho chúng tôi
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Lienhe;
