import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>U_cafe</h4>
          <p>一杯咖啡，承載生活的厚度。</p>
        </div>
        <div className="footer-section">
          <h4>快速連結</h4>
          <ul>
            <li><a href="/about">關於我們</a></li>
            <li><a href="/products">商品列表</a></li>
            <li><a href="/stores">門市資訊</a></li>
            <li><a href="/faq">常見問題</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>聯絡方式</h4>
          <p>Email: as30528305@gmail.com</p>
          <p>電話：0983101796</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 U_cafe All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
