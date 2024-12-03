import React from "react";
import { Link } from "react-router-dom";
function Nav_nhanvien() {
    return(
            <div>
                {/* <!-- Main Content --> */}
                <div className="main-content_admin_para">
                    <contens>
                        <div className="header-left_admin_para">
                            <button className="menu-toggle_admin_para">☰</button>
                            <input type="text" placeholder="Search..."/>
                        </div>
                        <div className="header-right_admin_para">
                            <span>English</span>
                            <div className="notifications_admin_para">
                                <span>🔔</span>
                                <span className="badge_admin_para">4</span>
                            </div>
                        </div>
                    </contens>
                </div>
            </div>
    )
}
export default Nav_nhanvien;;