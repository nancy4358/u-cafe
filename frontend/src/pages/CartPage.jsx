import { useCart } from '../contexts/CartContext';
import './CartPage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState(() =>
    cartItems.map((item) => item.id)
  );

  const handleCheck = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  const handleCheckAll = () => {
    if (checkedItems.length === cartItems.length) {
      setCheckedItems([]);
    } else {
      setCheckedItems(cartItems.map((item) => item.id));
    }
  };

  const checkedList = cartItems.filter((item) =>
    checkedItems.includes(item.id)
  );

  const totalPrice = checkedList.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleGoCheckout = () => {
    if (checkedList.length === 0) return;
    localStorage.setItem('checkoutItems', JSON.stringify(checkedList));
    navigate('/checkout');
  };

  return (
    <div className="cart-page">
      <h1>購物車</h1>
      {cartItems.length === 0 ? (
        <p>目前沒有商品。</p>
      ) : (
        <>
          <div style={{ marginBottom: '10px' }}>
            <label>
              <input
                type="checkbox"
                checked={checkedItems.length === cartItems.length}
                onChange={handleCheckAll}
              />{' '}
              全選
            </label>
          </div>

          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <input
                type="checkbox"
                checked={checkedItems.includes(item.id)}
                onChange={() => handleCheck(item.id)}
              />
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="cart-image"
                />
              )}
              <div className="cart-info">
                <h3>{item.name}</h3>
                <p>單價：NT${item.price}</p>
                <p>數量：{item.quantity}</p>
                <p>小計：NT${item.price * item.quantity}</p>
                <button onClick={() => removeFromCart(item.id)}>移除</button>
              </div>
            </div>
          ))}

          <div className="cart-total">
            總計：NT${totalPrice}
            {checkedItems.length > 0 && (
              <button
                onClick={handleGoCheckout}
                style={{ marginLeft: '16px' }}
              >
                前往結帳
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
