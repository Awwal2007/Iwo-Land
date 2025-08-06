// src/components/CustomMarquee.jsx
import React from 'react';
import Marquee from 'react-fast-marquee';
import news from './news'; // Adjust if it's a named export
import { Link } from 'react-router-dom';

function CustomMarquee() {
  return (
    <Marquee
      style={{ background: "white", padding: "10px", color: "var(--main-color)"}}
      pauseOnHover
      speed={80}
      gradient={false}
    >
      {news.map((newsItem) => (
        <span key={newsItem.id} style={{ marginRight: '50px', fontWeight: '500' }}>
           {/* {newsItem.head} */}
          <Link to={`/singleblog/${newsItem.id}`}>📰 {newsItem.head}</Link>
        </span>
      ))}
    </Marquee>
  );
}

export default CustomMarquee;
