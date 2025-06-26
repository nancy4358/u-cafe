import React, { useEffect, useState, useRef } from 'react';
import supabase from '@/api/supabase';
import { useLocation } from 'react-router-dom';
import './BannerSlider.css';

function BannerSlider() {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const autoSlideRef = useRef();

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    async function fetchBanners() {
      const { data } = await supabase
        .from('banners')
        .select('*')
        .order('created_at');
      if (data) {
        setBanners(data);
        setCurrent(0);
      }
      setIsLoading(false);
    }
    fetchBanners();
  }, [location.key]);

  useEffect(() => {
    autoSlideRef.current = () => {
      setCurrent((prev) => (prev + 1) % banners.length);
    };
  });

  useEffect(() => {
    const interval = setInterval(() => autoSlideRef.current(), 4000);
    return () => clearInterval(interval);
  }, [banners]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    if (Math.abs(deltaX) > 50) {
      deltaX > 0 ? nextSlide() : prevSlide();
    }
  };

  if (isLoading) return <div className="banner-loading">載入中...</div>;
  if (banners.length === 0) return null;

  return (
    <div className="banner-slider">
      <button className="arrow left" onClick={prevSlide}>‹</button>
      <button className="arrow right" onClick={nextSlide}>›</button>

      <div
        className="slider-track"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: 'transform 0.5s ease-in-out',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {banners.map((banner) => (
          <div className="slide-item" key={banner.id}>
            <img
              src={banner.image_url}
              alt="Banner"
              loading="lazy"
              onError={(e) => (e.target.style.display = 'none')}
            />
          </div>
        ))}
      </div>

      <div className="dot-indicator">
        {banners.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? 'active' : ''}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default BannerSlider;
