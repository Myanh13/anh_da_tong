import React from "react";
import { useEffect, useState } from "react";
// import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

function Home_nhanvien() {
  return(
        <div>
            <div class="content_admin_para">
                {/* <!-- Main content here --> */}
                <h1>Welcome to Paradiso Nhanvien</h1>
            </div>
            <section class="content">
                {/* <!-- Cards --> */}
                <div class="cards">
                    <div class="card">
                        <h3>Revenue</h3>
                        <p>$50,000</p>
                    </div>
                    <div class="card">
                        <h3>Users</h3>
                        <p>1,200</p>
                    </div>
                    <div class="card">
                        <h3>Growth</h3>
                        <p>15%</p>
                    </div>
                </div>

                {/* <!-- New Tables and Data --> */}
                <div class="tables">
                    <div class="table-container">
                        <h3>Nhân viên xác nhận nhiều nhất tháng</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nhân viên</th>
                                    <th>Số đơn hàng</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Đỗ Công Danh</td>
                                    <td>150</td>
                                </tr>
                                <tr>
                                    <td>Nguyễn Thị Mỹ Ảnh</td>
                                    <td>120</td>
                                </tr>
                                <tr>
                                    <td>Đinh Hoàng Minh</td>
                                    <td>100</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="table-container">
                        <h3>Tổng đơn hàng theo tháng</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Tháng</th>
                                    <th>Tổng đơn hàng</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Tháng 1</td>
                                    <td>200</td>
                                </tr>
                                <tr>
                                    <td>Tháng 2</td>
                                    <td>220</td>
                                </tr>
                                <tr>
                                    <td>Tháng 3</td>
                                    <td>250</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="table-container">
                        <h3>Số dịch vụ đã sử dụng</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Dịch vụ</th>
                                    <th>Số lượng</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Dịch vụ thuê xe</td>
                                    <td>120</td>
                                </tr>
                                <tr>
                                    <td>Dịch vụ giặc ủi</td>
                                    <td>200</td>
                                </tr>
                                <tr>
                                    <td>Dịch vụ 24h</td>
                                    <td>300</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="table-container">
                        <h3>Tổng đơn hàng chưa xác nhận</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Mã đơn hàng</th>
                                    <th>Ngày tạo</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>#001</td>
                                    <td>01/10/2024</td>
                                    <td>Chưa xác nhận</td>
                                </tr>
                                <tr>
                                    <td>#002</td>
                                    <td>05/10/2024</td>
                                    <td>Chưa xác nhận</td>
                                </tr>
                                <tr>
                                    <td>#003</td>
                                    <td>07/10/2024</td>
                                    <td>Chưa xác nhận</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="table-container">
                        <h3>Tổng doanh thu</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Tháng</th>
                                    <th>Doanh thu</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Tháng 1</td>
                                    <td>$10,000</td>
                                </tr>
                                <tr>
                                    <td>Tháng 2</td>
                                    <td>$12,000</td>
                                </tr>
                                <tr>
                                    <td>Tháng 3</td>
                                    <td>$15,000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* <!-- Chart --> */}
                <div class="chart">
                    <h2>Performance Chart</h2>
                    <div class="chart-placeholder">[Chart Placeholder]</div>
                </div>
            </section>
        </div>

    )
    
}
export default Home_nhanvien;