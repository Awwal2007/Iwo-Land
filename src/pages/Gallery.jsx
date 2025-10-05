import React, { useState } from 'react';
import galleryImages from '../components/galleryImages';
import './css/Gallery.css';
import SideBar from '../components/SideBar';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="home-content">
      <div className="first-side">
        <div className="gallery-container">
          <h1 className="gallery-title">📷 Iwo Land Gallery</h1>
          <div className="gallery-grid">
            {galleryImages.map((img) => (
              <div
                key={img.id}
                className="gallery-item"
                onClick={() => handleImageClick(img)}
              >
                <img
                  loading="lazy"
                  src={img.src}
                  alt={img.alt}
                  className="gallery-image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="second-side">
        <SideBar />
      </div>

      {/* ✅ Modal for zoomed image */}
      {selectedImage && (
        <div className="image-modal" onClick={closeModal}>
          <span className="close-btn" onClick={closeModal}>
            &times;
          </span>
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="modal-image"
          />
          <p className="modal-caption">{selectedImage.alt}</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
