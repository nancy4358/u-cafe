import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import supabase from '../api/supabase';
import './ProductDetailPage.css';
import { useCart } from '../contexts/CartContext';

function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const { addToCart } = useCart();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await supabase
        .from('products')
        .select()
        .eq('slug', slug)
        .single();
      setProduct(data);
    }
    fetchProduct();
  }, [slug]);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from('product_categories').select();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  function handleAddToCart() {
    addToCart({ ...product, quantity });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }

  function increaseQty() {
    setQuantity((q) => q + 1);
  }

  function decreaseQty() {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  }

  if (!product) return <div className="product-detail-page">載入中...</div>;

  return (
    <div className="product-detail-page">
      <div className="product-layout">
      
        <aside className="category-sidebar">
          <h2>線上購物</h2>
          <ul>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  to={`/products/${cat.slug}`}
                  className={cat.slug === product.category ? 'active' : ''}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>


        <div className="product-detail-container">
          <img src={product.image_url} alt={product.name} />
          <div className="product-info">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <div className="content">
  <h4>商品描述</h4>
  <div dangerouslySetInnerHTML={{ __html: product.content }} />
</div>
            <p className="price">NT${product.price}</p>
            <div className="quantity-wrapper">
              <div className="quantity-selector">
                <button onClick={decreaseQty}>−</button>
                <span>{quantity}</span>
                <button onClick={increaseQty}>＋</button>
              </div>
              <button onClick={handleAddToCart} className="add-to-cart-btn">
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>

      {showToast && <div className="toast">✅ 已加入購物車</div>}
    </div>
  );
}

export default ProductDetailPage;
