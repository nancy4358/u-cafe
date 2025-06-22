import { Link, useLocation } from 'react-router-dom';
import './MemberSidebar.css';

function MemberSidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="member-sidebar">
      <h2 className="sidebar-title">會員中心</h2>
      <ul>
        <li>
          <Link to="/member" className={isActive('/member') ? 'active' : ''}>
            個人資料
          </Link>
        </li>
        <li>
          <Link to="/member/cart" className={isActive('/member/cart') ? 'active' : ''}>
            購物車
          </Link>
        </li>
        <li>
          <Link to="/member/orders" className={isActive('/member/orders') ? 'active' : ''}>
            訂單紀錄
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default MemberSidebar;
