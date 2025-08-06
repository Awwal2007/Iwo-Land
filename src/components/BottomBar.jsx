import React, { useState } from 'react';
import './css/ButtonBar.css';

const images = [
  {
    src: '/images/img1.jpg',
    caption: 'Itsekiri Ukueke dressing',
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

  return (
    <div className="sidebar-container">
      {/* Images */}
      <div className="section">
        <div className="section-title">Images</div>
        <div className="carousel">
          <img src={images[current].src} alt="carousel" />
          <p className="caption">{images[current].caption}</p>
          <div className="dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={`dot ${current === index ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="section">
        <div className="section-title">Newsletter Signup</div>
        <form className="newsletter-form">
          <h3>Newsletter Signup Form</h3>
          <label>
            Name <span className="required">*</span>
            <div className="name-fields">
              <input type="text" placeholder="First" />
              <input type="text" placeholder="Last" />
            </div>
          </label>
          <label>
            Email <span className="required">*</span>
            <input type="email" placeholder="Email" />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Archives */}
      <div className="section">
        <div className="section-title">Archives</div>
        <select>
          <option>Select Month</option>
          <option>June 2025</option>
          <option>May 2025</option>
        </select>
      </div>
    </div>
  );
};

export default ButtonBar;
