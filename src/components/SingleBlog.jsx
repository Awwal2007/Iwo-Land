import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './css/SingleBlog.css';
import { useNews } from '../hooks/useNews';

const SingleBlog = () => {
  const {singleNews, getNewsById} = useNews();
  const { id } = useParams();
  // const blog = news.find(item => item.id === parseInt(id));

  useEffect(() => {
    getNewsById(id)
  }, [id])
  

  

  if (!singleNews) return <div>News not found.</div>;
  console.log(singleNews);
  

  return (
    <div className="single-blog-container">
      <div className="main-image-container">
        <img src={singleNews.mainImage} alt="Main" className="main-image" />
      </div>

      <div style={{marginBottom: "50px"}}>
        <h2 className="sub-head">{singleNews.title}</h2>
        {/* <p className="sub-text">{blog.subHead}</p> */}
        <p className="description">{singleNews.description}</p>
      </div>      

      <div className="sub-section-container">
          <div className="sub-section" key={singleNews._id}>
            <div className='sub-image-container'>
              <img src={singleNews.image1} alt={`Sub ${singleNews._id}`} className="sub-image" />
              <img src={singleNews.image2} alt={`Sub ${singleNews._id}`} className="sub-image" />
              <img src={singleNews.image3} alt={`Sub ${singleNews._id}`} className="sub-image" />
            </div>
          </div>
      </div>
    </div>
  );
};

export default SingleBlog;
