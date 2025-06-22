import './AboutPage.css';

function AboutPage() {
  return (
    <div className="about-container">
      <div className="hero">
        <img src="/about.jpeg" alt="咖啡生活" />
        <div className="hero-text">
          <h1>關於我們</h1>
          <p>一杯咖啡，承載生活的厚度</p>
        </div>
      </div>

      <div className="about-content">
        <h2>U_CAFE 的起點</h2>
        <p>
          嚴謹與熱情交融，讓純粹與美好成為日常。
          U_CAFE 的誕生，是源自一個簡單的想法——讓每個人都能在喧囂的生活裡，
          找到屬於自己的片刻寧靜。從第一杯手沖開始，我們就堅信，咖啡不只是飲料，
          而是傳遞溫度與情感的載體。
        </p>

        <h2>我們的理念</h2>
        <p>
          一杯咖啡，不只是提神醒腦的飲料，它能是一個人的陪伴、一段對話的起點、
          一個早晨的儀式感，更是對生活品味的詮釋。我們致力於從源頭選豆，
          堅持新鮮現烘，用心沖煮每一杯只屬於你的咖啡風味。
        </p>

        <div className="about-gallery">
          <img src="/about03.png"  />
          <img src="/about04.png"/>
        </div>

        <h2>我們相信</h2>
        <p>
          每一杯好咖啡的背後，都有一段用心的堅持。U_CAFE 希望透過每一次沖煮、
          每一次交流，讓你感受到：「生活很快，咖啡要慢」的溫柔提醒。
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
