import React from 'react';
import { useParams } from 'react-router-dom';
import news from './news';
import './css/SingleBlog.css';

const SingleBlog = () => {
  const { id } = useParams();
  const blog = news.find(item => item.id === parseInt(id));

  if (!blog) return <div>Blog not found.</div>;
  console.log(blog);
  

  return (
    <div className="single-blog-container">
      <div className="main-image-container">
        <img src={blog.mainImage} alt="Main" className="main-image" />
      </div>

      <div style={{marginBottom: "50px"}}>
        <h2 className="sub-head">{blog.head}</h2>
        <p className="sub-text">{blog.subHead}</p>
        <p className="description">{blog.description}</p>
      </div>      

      <div className="sub-section-container">
          <div className="sub-section" key={blog.id}>
            <div className='sub-image-container'>
              <img src={blog.image} alt={`Sub ${blog.id}`} className="sub-image" />
              <img src={blog.image2} alt={`Sub ${blog.id}`} className="sub-image" />
              {/* <img src={blog.image} alt={`Sub ${blog.id}`} className="sub-image" /> */}
            </div>
          </div>
      </div>
    </div>
  );
};

export default SingleBlog;
