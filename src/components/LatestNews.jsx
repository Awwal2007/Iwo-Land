import React from "react";
import { Link } from "react-router-dom";
import { useNews } from "../hooks/useNews";
import useMediaQuery from "./MediaQuery";
import "./css/LatestNews.css"; // We'll add some CSS for styling

const LatestNews = () => {
  const { news, loading } = useNews();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Helper to truncate text
  const truncateText = (text, length) =>
    text.length > length ? text.slice(0, length) + "..." : text;

  return (
    <div className="latest-news-container">
      <h2 className="latest-news-title">Latest News</h2>

      {/* Loading Skeleton */}
      {loading && (
        <div className="latest-news-grid">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`news-card ${isMobile ? "mobile" : "desktop"}`}
            >
              <div className="skeleton-image" />
              <div className="news-content">
                <div className="skeleton-line title" />
                <div className="skeleton-line" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* News Items */}
      <div className="latest-news-box-container">
        {!loading && news.slice(0, 3).map((item) => {
          const truncatedHead = truncateText(item.title, 50);
          const truncatedSubHead = truncateText(item.description, 85);

          return (
            <Link          
              aria-label={item.title}
              to={`/singleblog/${item._id}`}
              key={item._id}
              className={`news-card ${isMobile ? "mobile" : "desktop"}`}
            >
              <div className="news-image">
                <img src={item.mainImage} alt={item.title} loading="lazy" />
              </div>
              <div className="news-content">
                <div className="news-title">{truncatedHead}</div>
                <div
                  className="news-subhead"
                >
                  {truncatedSubHead}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LatestNews;
