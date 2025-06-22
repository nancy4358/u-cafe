import { useEffect, useState } from 'react';
import './OrdersPage.css'

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('orders');
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="orders-page">
      <h1>訂單記錄</h1>
      {orders.length === 0 ? (
        <p>尚無訂單記錄。</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id} style={{ marginBottom: '1.5rem' }}>
              <h3>訂單時間：{order.createdAt}</h3>
              <p>姓名：{order.customer.name}</p>
              <p>電話：{order.customer.phone}</p>
              <p>地址：{order.customer.address}</p>
              <p>備註：{order.customer.note}</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} × {item.quantity}（NT${item.price * item.quantity}）
                  </li>
                ))}
              </ul>
              <p><strong>總金額：NT${order.total}</strong></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrdersPage;
