import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { useLocation } from 'react-router-dom';
import './BannerSlider.css'; // 確保你有這個CSS

function BannerSlider() {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const autoSlideRef = useRef();

  useEffect(() => {
    async function fetchBanners() {
      const { data, error } = await supabase
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
    autoSlideRef.current = nextSlide;
  });

  useEffect(() => {
    const play = () => {
      autoSlideRef.current();
    };
    const interval = setInterval(play, 4000);
    return () => clearInterval(interval);
  }, [banners]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  if (isLoading) return <div className="banner-loading">載入中...</div>;
  if (banners.length === 0) return null;

  return (
    <div className="banner-slider">
      <button className="arrow left" onClick={prevSlide}>‹</button>
      <button className="arrow right" onClick={nextSlide}>›</button>

      {banners.map((banner, index) => (
        <div
          className={`slide ${index === current ? 'active' : ''}`}
          key={banner.id}
        >
          {index === current && (
            <img
              src={banner.image_url}
              alt={`Banner ${index + 1}`}
              className="banner-image"
              loading="lazy"
              onError={(e) => (e.target.style.display = 'none')}
            />
          )}
        </div>
      ))}

      <div className="dots">
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
