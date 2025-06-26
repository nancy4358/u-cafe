import './FaqPage.css';
import { useState } from 'react';

const faqs = [
  {
    question: '咖啡豆該如何保存？',
    answer: '咖啡豆應密封、避免陽光直射與高溫，開封後請於兩週內飲用完畢。'
  },
  {
    question: '甜點的保存期限是多久？',
    answer: '常溫餅乾約可保存60天，ˇ蛋糕保存約2天，依包裝為準。'
  },
  {
    question: '是否可宅配？',
    answer: '是，我們提供超商與本島宅配服務。滿額可享免運。'
  },
  {
    question: '如何加入會員？',
    answer: '請點選右上角會員帳戶圖示，並點擊下方『註冊會員』即可加入官網會員。'
  },
];

function FaqPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-title">常見問題</h1>
      <div className="faq-list">
        {faqs.map((item, index) => (
          <div className="faq-item" key={index}>
            <button className="faq-question" onClick={() => toggle(index)}>
              {item.question}
              <span className="faq-arrow">{activeIndex === index ? '▲' : '▼'}</span>
            </button>
            {activeIndex === index && (
              <div className="faq-answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FaqPage;
