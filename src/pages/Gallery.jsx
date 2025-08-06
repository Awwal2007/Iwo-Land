import React from 'react';
import galleryImages from '../components/galleryImages';
import './css/Gallery.css';
import SideBar from '../components/SideBar';

const Gallery = () => {
  return (
    <div className="home-content">
        <div className='first-side'>
            <div className="gallery-container">
            <h1 className="gallery-title">📷 Iwo Land Gallery</h1>
            <div className="gallery-grid">
                {galleryImages.map((img) => (
                <div key={img.id} className="gallery-item">
                    <img loading='lazy' src={img.src} alt={img.alt} className="gallery-image" />
                    {/* <p className="image-caption">{img.alt}</p> */}
                </div>
                ))}
            </div>
            </div>            
        </div>
        <div className='second-side'>
            <SideBar />
        </div>
    </div>
  );
};

export default Gallery;
