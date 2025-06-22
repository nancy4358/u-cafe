import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import supabase from '../api/supabase';
import { toast } from 'react-toastify';

function Navbar() {
  const [stores, setStores] = useState([]);
  const [isOpen, setIsOpen] = useState(null);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStores() {
      const { data } = await supabase.from('stores').select('name, slug').order('created_at');
      setStores(data);
    }

    async function fetchUser() {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });
    }

    fetchStores();
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    toast.success('會員已登出');
    navigate('/');
  };

  const toggleDropdown = (name) => {
    setIsOpen(prev => (prev === name ? null : name));
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
    setIsOpen(null);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo" onClick={handleLinkClick}>
          <img src="/logo.png" alt="logo" />
        </Link>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <div className={`dropdown ${isOpen === 'magazine' ? 'open' : ''}`} onClick={() => toggleDropdown('magazine')}>
            <span className="dropdown-toggle">咖啡誌 ▾</span>
            <div className="dropdown-menu">
              <Link to="/coffee-knowledge" onClick={handleLinkClick}>咖啡知識</Link>
              <Link to="/faq" onClick={handleLinkClick}>常見問題</Link>
            </div>
          </div>

          <div className={`dropdown ${isOpen === 'stores' ? 'open' : ''}`} onClick={() => toggleDropdown('stores')}>
            <span className="dropdown-toggle">門市 ▾</span>
            <div className="dropdown-menu">
              <Link to="/stores" onClick={handleLinkClick}>所有門市</Link>
              {stores.map((store) => (
                <Link key={store.slug} to={`/stores/${store.slug}`} onClick={handleLinkClick}>{store.name}</Link>
              ))}
            </div>
          </div>

          <div className={`dropdown ${isOpen === 'products' ? 'open' : ''}`} onClick={() => toggleDropdown('products')}>
            <span className="dropdown-toggle">線上購物 ▾</span>
            <div className="dropdown-menu">
              <Link to="/products/cakes" onClick={handleLinkClick}>蛋糕</Link>
              <Link to="/products/cookies" onClick={handleLinkClick}>餅乾</Link>
              <Link to="/products/drip-bags" onClick={handleLinkClick}>濾掛咖啡</Link>
              <Link to="/products/beans" onClick={handleLinkClick}>咖啡豆</Link>
            </div>
          </div>

          <Link to="/about" onClick={handleLinkClick}>關於我們</Link>

          <div className={`dropdown member-icon ${isOpen === 'member' ? 'open' : ''}`} onClick={() => toggleDropdown('member')}>
            {user ? (
              <>
                <span className="dropdown-toggle">會員中心 ▾</span>
                <div className="dropdown-menu">
                  <Link to="/member" onClick={handleLinkClick}>個人資料</Link>
                  <Link to="/member/cart" onClick={handleLinkClick}>購物車</Link>
                  <Link to="/member/orders" onClick={handleLinkClick}>訂單紀錄</Link>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleSignOut(); handleLinkClick(); }}>登出</a>
                </div>
              </>
            ) : (
              <Link to="/login" onClick={handleLinkClick}>登入</Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
