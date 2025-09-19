import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';

import './css/SingleBlog.css';
import { useNews } from '../hooks/useNews';

const SingleBlog = () => {
  const { singleNews, getNewsById, singleNewsLoading } = useNews();
  const { id } = useParams();

  useEffect(() => {
    getNewsById(id);
  }, [id]);

  if (singleNewsLoading) {
    return (
      <div className="single-blog-container">
        <div className="main-image-container">
          <Skeleton variant="rectangular" width="100%" height={400} />
        </div>

        <div style={{ marginBottom: "50px" }}>
          <Skeleton variant="text" width="60%" height={40} />
          <Skeleton variant="text" width="80%" height={20} />
          <Skeleton variant="text" width="90%" height={20} />
          <Skeleton variant="text" width="85%" height={20} />
        </div>

        <div className="sub-section-container">
          <div className="sub-section">
            <div className="sub-image-container">
              <Skeleton variant="rectangular" width={150} height={150} />
              <Skeleton variant="rectangular" width={150} height={150} />
              <Skeleton variant="rectangular" width={150} height={150} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!singleNews) return <div>News not found.</div>;

  return (
    <div className="single-blog-container">
      <div className="main-image-container">
        <img loading="lazy" src={singleNews.mainImage} alt="Main" className="main-image" />
      </div>

      <div style={{ marginBottom: "50px" }}>
        <h2 className="sub-head">{singleNews.title}</h2>
        <p className="description">{singleNews.description}</p>
      </div>

      <div className="sub-section-container">
        <div className="sub-section" key={singleNews._id}>
          <div className='sub-image-container'>
            <img loading="lazy" src={singleNews.image1} alt={`Sub ${singleNews._id}`} className="sub-image" />
            <img loading="lazy" src={singleNews.image2} alt={`Sub ${singleNews._id}`} className="sub-image" />
            <img loading="lazy" src={singleNews.image3} alt={`Sub ${singleNews._id}`} className="sub-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
