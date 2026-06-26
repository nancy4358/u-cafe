import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import '../styles/pages/CoffeeKnowledgePage.css';

function CoffeeKnowledgePage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const data = await api.getCoffeeArticles();
        setArticles(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchArticles();
  }, []);

  return (
    <div className="knowledge-container">
      <h1 className="title">咖啡知識 Coffee Knowledge</h1>
      <div className="article-list">
        {articles.map((article, index) => (
          <Link to={`/coffee-knowledge/${article.slug}`} className="article-block-link" key={article.slug}>
  <div className={`article-block ${index % 2 === 1 ? 'reverse' : ''}`}>
    <div className="article-row">
      <div className="article-image">
        <img src={article.image_url} alt={article.title} />
      </div>
      <div className="article-text">
        <h2>{String(index + 1).padStart(2, '0')} {article.title}</h2>
        <p className="summary">{article.summary}</p>
        <div className="tags">
          {article.tags?.map(tag => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
</Link>

        ))}
      </div>
    </div>
  );
}

export default CoffeeKnowledgePage;
