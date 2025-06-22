import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import supabase from '../api/supabase';
import './CoffeeArticlePage.css';

function CoffeeArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    async function fetchArticle() {
      const { data } = await supabase
        .from('coffee_knowledge_articles')
        .select('*')
        .eq('slug', slug)
        .single();
      setArticle(data);
    }

    fetchArticle();
  }, [slug]);

  if (!article) return <p>載入中...</p>;

  return (
    <div className="coffee-article-container">
      <img src={article.image_url} alt={article.title} className="article-banner" />

      <h1 className="article-title">{article.title}</h1>
      <p className="article-summary">{article.summary}</p>

      <div className="tags">
        {article.tags.map((tag, idx) => (
          <span key={idx} className="tag">#{tag}</span>
        ))}
      </div>

      <p className="date">發布時間：{new Date(article.created_at).toLocaleString()}</p>

      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      ></div>

      <Link to="/coffee-knowledge" className="back-link">← 返回文章列表</Link>
    </div>
  );
}

export default CoffeeArticlePage;
