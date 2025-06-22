import { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import supabase from '../api/supabase';
import './MemberCenterPage.css';

function MemberCenterPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    async function fetchData() {
      const { data: member, error: profileErr } = await supabase
        .from('members')
        .select('full_name, phone, birthday, avatar_url')
        .eq('id', user.id)
        .single();
      if (!profileErr && member) {
        setProfile(member);

        if (member.avatar_url) {
          const { data: publicData } = supabase
            .storage
            .from('avatars')
            .getPublicUrl(member.avatar_url);
          setAvatarUrl(`${publicData.publicUrl}?t=${Date.now()}`);
        }
      }
    }

    fetchData();
  }, [user]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    setIsUploading(true); 

    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/avatar.${fileExt}`;

    await supabase.storage.from('avatars').remove([filePath]);

    const { error: uploadErr } = await supabase
      .storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadErr) {
      alert('上傳失敗');
      console.error(uploadErr);
      setIsUploading(false);
      return;
    }

    const { error: updateErr } = await supabase
      .from('members')
      .update({ avatar_url: filePath })
      .eq('id', user.id);

    if (updateErr) {
      alert('資料更新失敗');
      console.error(updateErr);
      setIsUploading(false);
      return;
    }

    const { data: publicData } = supabase
      .storage
      .from('avatars')
      .getPublicUrl(filePath);
    setAvatarUrl(`${publicData.publicUrl}?t=${Date.now()}`);
    setIsUploading(false); 
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
