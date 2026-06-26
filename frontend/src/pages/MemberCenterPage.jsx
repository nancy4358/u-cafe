import { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/pages/MemberCenterPage.css';

function MemberCenterPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    function fetchData() {
      const members = JSON.parse(localStorage.getItem('members')) || [];
      const member = members.find((item) => item.id === user.id);

      if (member) {
        setProfile(member);
        setAvatarUrl(member.avatar_url || null);
      }
    }

    fetchData();
  }, [user]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    setIsUploading(true); 

    const reader = new FileReader();
    reader.onload = () => {
      const avatarDataUrl = reader.result;
      const members = JSON.parse(localStorage.getItem('members')) || [];
      const nextMembers = members.map((member) => (
        member.id === user.id ? { ...member, avatar_url: avatarDataUrl } : member
      ));
      localStorage.setItem('members', JSON.stringify(nextMembers));
      setAvatarUrl(avatarDataUrl);
      setIsUploading(false);
    };
    reader.onerror = () => {
      alert('上傳失敗');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  if (!user) {
    return (
      <div className="member-center">
        <h2>請先登入會員</h2>
        <button onClick={() => navigate('/login')}>前往登入</button>
      </div>
    );
  }

  return (
    <div className="member-center">
      <h1>會員中心</h1>
      <div className="member-box">
        <div className="avatar-section">
          <img
            src={avatarUrl || '/default-avatar.png'}
            alt="頭像"
            className="avatar"
            onClick={() => fileInputRef.current.click()}
          />
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleUpload}
          />
          {isUploading ? (
            <p style={{ color: '#888' }}>上傳中...</p>
          ) : (
            <p>點擊圖片可更新</p>
          )}
        </div>
        <div className="member-info">
          <p><strong>Email：</strong>{user.email}</p>
          <p><strong>姓名：</strong>{profile?.full_name || '尚未提供'}</p>
          <p><strong>電話：</strong>{profile?.phone || '尚未提供'}</p>
          <p><strong>生日：</strong>{profile?.birthday || '尚未提供'}</p>
          <Link to="/member/edit" className="edit-button">編輯個人資料</Link>
        </div>
      </div>
    </div>
  );
}

export default MemberCenterPage;
