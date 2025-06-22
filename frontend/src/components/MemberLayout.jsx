import MemberSidebar from './MemberSidebar';
import { Outlet } from 'react-router-dom';

const MemberLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <MemberSidebar />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default MemberLayout;
