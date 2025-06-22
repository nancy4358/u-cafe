import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './CheckoutPage.css';

function CheckoutPage() {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();

  const [checkedItems, setCheckedItems] = useState([]);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
  });


  useEffect(() => {
    const stored = localStorage.getItem('checkoutItems');
    if (stored) {
      setCheckedItems(JSON.parse(stored));
    }
  }, []);

  const total = checkedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 儲存訂單記錄
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const newOrder = {
      id: Date.now(),
      items: checkedItems,
      total,
      customer: form,
      createdAt: new Date().toLocaleString(),
    };
    localStorage.setItem('orders', JSON.stringify([newOrder, ...existingOrders]));

    // 從購物車中移除已結帳商品
    const remainingItems = cartItems.filter(
      (cartItem) => !checkedItems.some((checked) => checked.id === cartItem.id)
    );
    setCartItems(remainingItems);
    localStorage.setItem('cart', JSON.stringify(remainingItems));
    localStorage.removeItem('checkoutItems');

    alert('訂單送出成功！');
    navigate('/orders');
  };

  if (checkedItems.length === 0) return <p>❗未選擇商品，請返回購物車。</p>;

  return (
    <div className="checkout-page">
      <h1>結帳資訊</h1>
      <ul className="checkout-list">
        {checkedItems.map((item) => (
          <li key={item.id}>
            {item.name} × {item.quantity}（NT${item.price * item.quantity}）
          </li>
        ))}
      </ul>
      <p className="total">總金額：NT${total}</p>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="姓名" required onChange={handleChange} />
        <input name="phone" placeholder="電話" required onChange={handleChange} />
        <input name="address" placeholder="地址" required onChange={handleChange} />
        <textarea name="note" placeholder="備註" onChange={handleChange} />
        <button type="submit">送出訂單</button>
      </form>
    </div>
  );
}

export default CheckoutPage;
