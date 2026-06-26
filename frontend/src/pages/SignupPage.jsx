import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/pages/SignupPage.css';

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    phone: '',
    birthday: '',
  });
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  const today = new Date().toISOString().split('T')[0]; 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePhone = (phone) => /^09\d{8}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!formData.email || !formData.password) {
      setError('請填寫電子郵件與密碼');
      return;
    }

    if (!validatePhone(formData.phone)) {
      setError('手機格式錯誤');
      return;
    }


    const members = JSON.parse(localStorage.getItem('members')) || [];

    if (members.some((member) => member.email === formData.email)) {
      setError('此電子郵件已註冊');
      return;
    }

    const userId = crypto.randomUUID();
    const newMember = {
      id: userId,
      email: formData.email,
      password: formData.password,
      full_name: formData.full_name,
      phone: formData.phone,
      birthday: formData.birthday,
      avatar_url: '',
    };

    localStorage.setItem('members', JSON.stringify([...members, newMember]));
    signIn({ id: userId, email: formData.email });

    navigate('/member');
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>會員註冊</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="電子郵件"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="密碼"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="full_name"
            placeholder="姓名"
            value={formData.full_name}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="手機號碼"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            max={today} 
          />
          <button type="submit">註冊</button>
          {error && <div className="error">{error}</div>}
        </form>
        <p className="login-hint">
          已有帳號？<Link to="/login">立即登入</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
