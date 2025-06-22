import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../api/supabase';
import './CategoryGrid.css';

function CategoryGrid() {
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data: catData } = await supabase.from('categories').select('*').order('created_at');
      setCategories(catData || []);
      const { data: bannerData } = await supabase.from('category_banners').select('*').order('created_at');
      setBanners(bannerData || []);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const onScroll = () => {
      revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
          el.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', onScroll);
    const fallback = setTimeout(() => onScroll(), 500);
    return () => {
      clearTimeout(fallback);
      window.removeEventListener('scroll', onScroll);
    };
  }, [categories, banners]);

  return (
    <div className="category-grid-container">
      <div className="category-grid">
        {categories.map((cat) => (
          <Link key={cat.id} to={`/products/${cat.slug}`} className="category-card reveal">
            <img src={cat.image_url} alt={cat.name} />
            <span>{cat.name}</span>
          </Link>
        ))}
      </div>

      <div className="category-banner-area">
        {banners.map((banner) => (
          <Link to={banner.link_url || '#'} key={banner.id} className="category-banner-card reveal">
            <img src={banner.image_url} alt={banner.alt || 'banner'} />
            <div className="category-banner-text">
              <h3>{banner.alt || '點我查看'}</h3>
              <p>{banner.description || ''}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryGrid;
