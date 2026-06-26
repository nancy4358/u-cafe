import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import '../styles/pages/LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    const members = JSON.parse(localStorage.getItem('members')) || [];
    const member = members.find((item) => item.email === email && item.password === password);

    if (!member) {
      setError('帳號或密碼錯誤，請再確認一次');
    } else {
      setError('');
      signIn({ id: member.id, email: member.email });
      toast.success('登入成功！');
      setTimeout(() => navigate('/'), 2000); 
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>會員登入</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email 帳號"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">登入</button>
          {error && <p className="error">{error}</p>}
        </form>
        <p className="register-hint">
          還沒加入會員？<Link to="/signup">立即註冊</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
