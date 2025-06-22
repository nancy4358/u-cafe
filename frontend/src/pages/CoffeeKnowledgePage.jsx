import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../api/supabase';
import './CoffeeKnowledgePage.css';

function CoffeeKnowledgePage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      const { data } = await supabase
        .from('coffee_knowledge_articles')
        .select('*')
        .order('created_at', { ascending: false });
      setArticles(data);
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
