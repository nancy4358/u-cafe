import { useEffect, useState, useRef } from 'react';
import supabase from '../api/supabase';
import './BannerSlider.css';

function BannerSlider() {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(1); 
  const [isTransitioning, setIsTransitioning] = useState(true);
  const trackRef = useRef(null);

  // 取得資料
  useEffect(() => {
    async function fetchBanners() {
      const { data } = await supabase.from('banners').select('*').order('created_at');
      if (data?.length > 0) {
        setBanners(data);
        setCurrent(1);
      }
    }
    fetchBanners();
  },[location.key]);

  // 自動輪播
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [banners, current]);

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrent((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrent((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (current === banners.length + 1) {
      setIsTransitioning(false);
      setCurrent(1);
    } else if (current === 0) {
      setIsTransitioning(false);
      setCurrent(banners.length);
    }
  };

  const slideStyle = {
    transform: `translateX(-${current * 100}%)`,
    transition: isTransitioning ? 'transform 0.6s ease-in-out' : 'none',
  };

  if (banners.length === 0) return null;

  return (
    <div className="banner-slider">

      <div className="arrows left" onClick={prevSlide}>&lt;</div>
      <div className="arrows right" onClick={nextSlide}>&gt;</div>


      <div
        className="slider-track"
        style={slideStyle}
        onTransitionEnd={handleTransitionEnd}
        ref={trackRef}
      >

        <a className="slide-item">
          <img src={banners[banners.length - 1]?.image_url} alt="last-banner" loading="lazy" />
        </a>


        {banners.map((banner) => (
          <a key={banner.id} href={banner.link_url || '#'} className="slide-item">
            <img src={banner.image_url} alt={banner.alt || 'banner'} loading="lazy" />
          </a>
        ))}

        <a className="slide-item">
          <img src={banners[0]?.image_url} alt="first-banner" loading="lazy" />
        </a>
      </div>

      <div className="dot-indicator">
        {banners.map((_, index) => (
          <span
            key={index}
            className={`dot ${current === index + 1 ? 'active' : ''}`}
            onClick={() => {
              setIsTransitioning(true);
              setCurrent(index + 1);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default BannerSlider;
