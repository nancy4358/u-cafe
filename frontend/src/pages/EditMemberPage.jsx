import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import supabase from '../api/supabase';
import './EditMemberPage.css';

function EditMemberPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ full_name: '', phone: '', birthday: '' });

  useEffect(() => {
    async function fetchProfile() {
      if (user) {
        const { data } = await supabase
          .from('members')
          .select('full_name, phone, birthday')
          .eq('id', user.id)
          .single();
        if (data) setFormData(data);
      }
    }
    fetchProfile();
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase
      .from('members')
      .upsert({ id: user.id, ...formData });
    if (!error) navigate('/member');
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
