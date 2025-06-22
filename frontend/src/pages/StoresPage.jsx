import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../api/supabase';
import './StoresPage.css';

function StoresPage() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function fetchStores() {
      const { data } = await supabase.from('stores').select('*').order('created_at');
      setStores(data);
    }
    fetchStores();
  }, []);

  return (
    <div className='store-container'>
           <h1 className="title">所有門市 our stores</h1>
           <div className="store-list">
 
 {stores.map(store => (
   <Link to={`/stores/${store.slug}`} key={store.id} className="store-card">
     <img src={store.image_url} alt={store.name} />
     <h3>{store.name}</h3>
     <p>{store.address}</p>
   </Link>
 ))}
</div>
    </div>
   
  );
}

export default StoresPage;
