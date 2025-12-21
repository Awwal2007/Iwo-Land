import React, { useEffect, useState } from 'react';
// import galleryImages from '../components/galleryImages';
import './css/Gallery.css';
import SideBar from '../components/SideBar';
import { Helmet } from 'react-helmet-async';
import MissedArticles from '../components/MissedArticles';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false)

  const ITEMS_PER_PAGE = 6;

  const [currentPage, setCurrentPage] = useState(1);



  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const baseUrl = import.meta.env.VITE_BASE_URL

  const fetchGalleryImages = async()=>{
    try {
      setGalleryLoading(true)

      const res = await fetch(`${baseUrl}/gallery`)
      if(!res.ok) throw new Error("failed to fetch gallery images")
      
      const data = await res.json()

      if(data.status === "success"){
        setGalleryImages(data.gallery)
      }

    } catch (error) {
      console.log(error);      
    }finally{
      setGalleryLoading(false)
    }
  }

  useEffect(()=>{
    fetchGalleryImages()
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);


  const totalPages = Math.ceil(galleryImages.length / ITEMS_PER_PAGE);

  const paginatedImages = galleryImages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );


  return (
    <>

      <Helmet>
        <title>Gallery | Iwo Land</title>
        <link rel="robot" content="index, follow" />
        <meta name="description" content="Explore stunning photos capturing the culture, people, and heritage of Iwo Land." />
        <meta name="keywords" content="Iwo Land, Iwo news, Iwo Land news, Oluwo, Iwo, Iwo Osun State, Osun State, History of Iwo, Odidere, Raven, Yoruba Land, Osun Oshogo, Oshogo, Telu 1" />
        <link rel="canonical" href="https://iwoland.com/gallery" />
        <meta property="og:title" content="Iwo Land Gallery" />
        <meta property="og:description" content="Discover a curated gallery of images from Iwo Land." />
        <meta property="og:type" content="website" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
      </Helmet>

      <div className="home-content">
        <div>
          <div className="gallery-container">
            <h1 className="gallery-title">Iwo Land Gallery</h1>
            <div className="gallery-grid">
              {galleryLoading
                ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                    <div key={index} className="gallery-item skeleton">
                      <div className="skeleton-image"></div>
                    </div>
                  ))
                : paginatedImages.map((img) => (
                    <div
                      role="button"
                      tabIndex="0"
                      key={img._id}
                      className="gallery-item"
                      onClick={() => handleImageClick(img)}
                    >
                      <img
                        loading="lazy"
                        src={img.gallery}
                        alt={img.title}
                        className="gallery-image"
                      />
                    </div>
              ))}

            </div>

            {!galleryLoading && totalPages > 1 && (
              <div className="pagination">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  Prev
                </button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next
                </button>
              </div>
            )}
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
              src={selectedImage.gallery}
              alt={selectedImage.title}
              className="modal-image"
            />
            <p className="modal-caption">{selectedImage.title}</p>
          </div>
        )}
      </div>
      <div>
        <MissedArticles />
      </div>
    </>
    
  );
};

export default Gallery;
