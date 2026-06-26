import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import '../styles/pages/ProductsPage.css';

function ProductsPage() {
  const { categorySlug } = useParams(); // 從網址取得目前分類
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(categorySlug || '');

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await api.getProductCategories();
        setCategories(data);

        // 若初次進入 /products 頁無分類，導向第一個分類
        if (!categorySlug && data.length > 0) {
          navigate(`/products/${data[0].slug}`, { replace: true });
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategories();
  }, [categorySlug, navigate]);

  useEffect(() => {
    if (!categorySlug) return;
    async function fetchProducts() {
      try {
        const productsData = await api.getProducts(categorySlug);
        setProducts(productsData);
        setActiveCategory(categorySlug);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, [categorySlug]);

  return (
    <div className="products-page">
      <h1>線上購物</h1>

      <div className="product-layout">
        <aside className="product-sidebar">
          <ul>
            {categories
              .filter((cat) => ['餅乾', '蛋糕', '濾掛咖啡', '咖啡豆'].includes(cat.name))
              .map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/products/${cat.slug}`}
                    className={`sidebar-link ${cat.slug === activeCategory ? 'active' : ''}`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
          </ul>
        </aside>

        <section className="product-content">
          <div className="product-list">
            {products.map((product) => (
              <Link to={`/products/detail/${product.slug}`} className="product-card" key={product.slug}>
                <img src={product.image_url} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">NT${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProductsPage;
