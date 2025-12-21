import React, { useState, useEffect } from 'react';
import './css/ButtonBar.css';
import { Link } from 'react-router-dom';

const ButtonBar = () => {
  const [current, setCurrent] = useState(0);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  /* ---------------- FETCH GALLERY ---------------- */
  const fetchGalleryImages = async () => {
    try {
      setGalleryLoading(true);

      const res = await fetch(`${baseUrl}/gallery`);
      if (!res.ok) throw new Error('Failed to fetch gallery images');

      const data = await res.json();
      if (data.status === 'success') {
        setGalleryImages(data.gallery || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setGalleryLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  /* ---------------- DISPLAY LIMIT ---------------- */
  const displayedImages = galleryImages.slice(0, 10);

  /* ---------------- CAROUSEL LOGIC ---------------- */
  const handleDotClick = (index) => setCurrent(index);

  const nextImage = () => {
    if (!displayedImages.length) return;
    setCurrent((prev) => (prev + 1) % displayedImages.length);
  };

  const prevImage = () => {
    if (!displayedImages.length) return;
    setCurrent((prev) => (prev - 1 + displayedImages.length) % displayedImages.length);
  };

  /* ---------------- AUTO SLIDE ---------------- */
  useEffect(() => {
    if (!displayedImages.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % displayedImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [displayedImages.length]);

  /* ---------------- SKELETON LOADER ---------------- */
  if (galleryLoading) {
    return (
      <footer className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="section-header">
              <h3 className="section-title">Gallery</h3>
            </div>

            <div className="carousel-container">
              <div className="carousel">
                <div className="carousel-image-container">
                  <div className="carousel-skeleton-image" />
                </div>

                <div className="carousel-dots">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="carousel-dot skeleton-dot" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  if (!displayedImages.length) return null;

  const currentImage = displayedImages[current];

  return (
    <footer className="footer-container">
      <div className="footer-content">

        {/* ---------------- GALLERY CAROUSEL ---------------- */}
        <div className="footer-section">
          <div className="section-header">
            <h3 className="section-title">Gallery</h3>
          </div>

          <div className="carousel-container">
            <div className="carousel">
              <div className="carousel-image-container">
                <img
                  loading="lazy"
                  src={currentImage.gallery}
                  alt={currentImage.title}
                  className="carousel-image"
                />

                <button
                  className="carousel-btn carousel-prev"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  &#8249;
                </button>

                <button
                  className="carousel-btn carousel-next"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  &#8250;
                </button>
              </div>

              <p className="carousel-caption">{currentImage.title}</p>

              <div className="carousel-dots">
                {displayedImages.map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-dot ${current === index ? 'active' : ''}`}
                    onClick={() => handleDotClick(index)}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- QUICK LINKS ---------------- */}
        <div className="footer-section">
          <div className="section-header">
            <h3 className="section-title">Quick Links</h3>
          </div>
          <div className="archives-list">
            <Link to="/" className="archive-link">Home</Link>
            <Link to="/blogs" className="archive-link">Blogs</Link>
            <Link to="/gallery" className="archive-link">Gallery</Link>
          </div>
        </div>

        {/* ---------------- ARCHIVES ---------------- */}
        <div className="footer-section">
          <div className="section-header">
            <h3 className="section-title">Archives</h3>
          </div>
          <div className="archives-list">
            <a className="archive-link">Recent Articles</a>
            <a className="archive-link">Popular Posts</a>
            <a className="archive-link">Category Index</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Iwo Land. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default ButtonBar;
