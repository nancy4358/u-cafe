import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import supabase from '../api/supabase';
import './StoreDetailPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faStore } from '@fortawesome/free-solid-svg-icons';

function StoreDetailPage() {
  const { slug } = useParams();
  const [store, setStore] = useState(null);

  useEffect(() => {
    async function fetchStore() {
      const { data } = await supabase.from('stores').select('*').eq('slug', slug).single();
      setStore(data);
    }
    fetchStore();
  }, [slug]);

  if (!store) return <div>載入中...</div>;

  return (
    <div className="store-detail">
      <div className="store-detail-grid">
        <img src={store.image_url} alt={store.name} />
        <div className="store-info">
          <h2>{store.name}</h2>
          <p>
  <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#d34a4a', marginRight: '8px' }} />
  {store.address}
</p>

<p>
<FontAwesomeIcon icon={faStore} style={{ color: '#427ac2', marginRight: '8px' }} />
星期二至星期日｜11:00-19:30</p>

          <Link to="/stores" className="back-link">← 返回門市列表</Link>
        </div>
      </div>
    </div>
  );
}

export default StoreDetailPage;
