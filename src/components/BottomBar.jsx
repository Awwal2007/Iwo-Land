import React, { useState, useEffect } from 'react';
import './css/ButtonBar.css';
import image1 from '../assets/jhdhfjsdfsd.jpg';
import image2 from '../assets/hjsdjlkaj.jpg';
import image3 from '../assets/iwo-market.jpg';
import { Link } from 'react-router-dom';

const images = [
  {
    src: image1,
    caption: 'Oluwo stadium',
  },
  {
    src: image2,
    caption: 'Oluwo with his subject',
  },
  {
    src: image3,
    caption: 'Iwo Market',
  },
];

const ButtonBar = () => {
  const [current, setCurrent] = useState(0);

  const handleDotClick = (index) => setCurrent(index);
  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  // ✅ Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000); // every 4 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Images Carousel Section */}
        <div className="footer-section">
          <div className="section-header">
            <h3 className="section-title">Gallery</h3>
          </div>
          <div className="carousel-container">
            <div className="carousel">
              <div className="carousel-image-container">
                <img 
                  src={images[current].src} 
                  alt={images[current].caption} 
                  className="carousel-image"
                />
                <button className="carousel-btn carousel-prev" onClick={prevImage}>
                  &#8249;
                </button>
                <button className="carousel-btn carousel-next" onClick={nextImage}>
                  &#8250;
                </button>
              </div>
              <p className="carousel-caption">{images[current].caption}</p>
              <div className="carousel-dots">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-dot ${current === index ? 'active' : ''}`}
                    onClick={() => handleDotClick(index)}
                    aria-label={`Go to image ${index + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup Section */}
        <div className="footer-section">
          <div className="section-header">
            <h3 className="section-title">Quick Links</h3>
          </div>
          <div className="newsletter-container">
              <div className="archives-list">
                <Link to='/' className="archive-link">Home</Link>
                <Link to='/blogs' className="archive-link">Blogs</Link>
                <Link to='/gallery' className="archive-link">Gallery</Link>
              </div>
              
            {/* <form className="newsletter-form">
             
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  First Name <span className="required">*</span>
                </label>
                <input 
                  type="text" 
                  id="firstName"
                  placeholder="First Name" 
                  className="form-input"
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  Last Name <span className="required">*</span>
                </label>
                <input 
                  type="text" 
                  id="lastName"
                  placeholder="Last Name" 
                  className="form-input"
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email <span className="required">*</span>
                </label>
                <input 
                  type="email" 
                  id="email"
                  placeholder="Email Address" 
                  className="form-input"
                  required 
                />
              </div>
              
              <button type="submit" className="submit-btn">Subscribe Now</button>
            </form> */}
          </div>
        </div>

        {/* Archives Section */}
        <div className="footer-section">
          <div className="section-header">
            <h3 className="section-title">Archives</h3>
          </div>
          <div className="archives-container">
            <p className="archives-description">Browse past content</p>
            <div className="archives-select">
              <select className="month-select">
                <option value="">Select Month</option>
                <option value="2025-06">June 2025</option>
                <option value="2025-05">May 2025</option>
                <option value="2025-04">April 2025</option>
                <option value="2025-03">March 2025</option>
              </select>
            </div>
            <div className="archives-list">
              <a className="archive-link">Recent Articles</a>
              <a className="archive-link">Popular Posts</a>
              <a className="archive-link">Category Index</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Iwo Land. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default ButtonBar;
