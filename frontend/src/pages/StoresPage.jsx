import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import '../styles/pages/StoresPage.css';

function StoresPage() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function fetchStores() {
      try {
        const data = await api.getStores();
        setStores(data);
      } catch (error) {
        console.error(error);
      }
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
