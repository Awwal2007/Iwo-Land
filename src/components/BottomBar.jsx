import React, { useState } from 'react';
import './css/ButtonBar.css';

const images = [
  {
    src: '/images/img1.jpg',
    caption: 'Title goes here',
  },
  {
    src: '/images/img2.jpg',
    caption: 'Title goes here',
  },
  {
    src: '/images/img3.jpg',
    caption: 'Another caption',
  },
];

const ButtonBar = () => {
  const [current, setCurrent] = useState(0);

  const handleDotClick = (index) => setCurrent(index);
  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

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
            <h3 className="section-title">Stay Updated</h3>
          </div>
          <div className="newsletter-container">
            <form className="newsletter-form">
              <p className="newsletter-description">Subscribe to our newsletter for updates</p>
              
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
            </form>
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
              <a href="#" className="archive-link">Recent Articles</a>
              <a href="#" className="archive-link">Popular Posts</a>
              <a href="#" className="archive-link">Category Index</a>
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