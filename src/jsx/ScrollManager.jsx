import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    // Cuộn lên đầu trang mỗi khi thay đổi đường dẫn
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

export default ScrollManager;
