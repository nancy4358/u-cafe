import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/EditMemberPage.css';

function EditMemberPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ full_name: '', phone: '', birthday: '' });

  useEffect(() => {
    function fetchProfile() {
      if (user) {
        const members = JSON.parse(localStorage.getItem('members')) || [];
        const member = members.find((item) => item.id === user.id);
        if (member) {
          setFormData({
            full_name: member.full_name || '',
            phone: member.phone || '',
            birthday: member.birthday || '',
          });
        }
      }
    }
    fetchProfile();
  }, [user]);

  function handleSubmit(e) {
    e.preventDefault();
    const members = JSON.parse(localStorage.getItem('members')) || [];
    const nextMembers = members.map((member) => (
      member.id === user.id ? { ...member, ...formData } : member
    ));
    localStorage.setItem('members', JSON.stringify(nextMembers));
    navigate('/member');
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  if (!user) {
    return (
      <div className="edit-member">
        <h2>請先登入會員</h2>
      </div>
    );
  }

  return (
    <div className="edit-member">
      <h1>編輯個人資料</h1>
      <form onSubmit={handleSubmit}>
        <label>姓名：
          <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />
        </label>
        <label>電話：
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        <label>生日：
          <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} required />
        </label>
        <button type="submit">儲存</button>
      </form>
    </div>
  );
}

export default EditMemberPage;
