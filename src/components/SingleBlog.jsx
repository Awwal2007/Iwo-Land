import React, { useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import SEO from "./SEO";
import "./css/SingleBlog.css";
import { useNews } from "../hooks/useNews";
import SideBar from "./SideBar";
import { IoArrowBack, IoTimeOutline, IoPersonOutline, IoCalendarOutline, IoCopyOutline, IoLogoWhatsapp, IoLogoFacebook, IoLogoTwitter } from "react-icons/io5";
import { toast } from "sonner";

const SingleBlog = () => {
  const { singleNews, getNewsById, singleNewsLoading } = useNews();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getNewsById(id);
  }, [id, getNewsById]);

  // Calculate estimated read time
  const readTime = useMemo(() => {
    if (!singleNews?.description) return 0;
    const wordsPerMinute = 200;
    const words = singleNews.description.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }, [singleNews?.description]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const shareUrls = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(singleNews?.title + " " + window.location.href)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(singleNews?.title)}&url=${encodeURIComponent(window.location.href)}`,
  };
  if (singleNewsLoading) {
    return (
      <div className="single-blog-wrapper">
        <div className="single-blog-content-layout">
          <div className="blog-main-column">
             <Skeleton variant="text" width="120px" height={24} sx={{ mb: 4 }} />
             <Skeleton variant="text" width="90%" height={80} sx={{ mb: 2 }} />
             <Skeleton variant="text" width="40%" height={24} sx={{ mb: 4 }} />
             <Skeleton variant="rectangular" width="100%" height={500} sx={{ borderRadius: "16px", mb: 4 }} />
             <Skeleton variant="text" width="100%" height={20} animation="wave" sx={{ mb: 1 }} />
             <Skeleton variant="text" width="100%" height={20} animation="wave" sx={{ mb: 1 }} />
             <Skeleton variant="text" width="95%" height={20} animation="wave" sx={{ mb: 4 }} />
          </div>
          <div className="blog-sidebar-column">
             <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: "12px" }} />
          </div>
        </div>
      </div>
    );
  }

  if (!singleNews || Object.keys(singleNews).length === 0) {
    return (
      <div className="error-container">
        <h2>Article not found</h2>
        <Link to="/blogs" className="back-btn">Return to News</Link>
      </div>
    );
  }

  const { title, description, mainImage, author = "Iwoland Editorial", date } = singleNews;
  
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const newsSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    image: [mainImage],
    author: { "@type": "Person", name: author },
    publisher: {
      "@type": "Organization",
      name: "Iwoland Official",
      logo: {
        "@type": "ImageObject",
        url: "https://iwoland.com/favicon.png",
      },
    },
    datePublished: date,
    dateModified: date,
    description: description,
  };

  return (
    <div className="single-blog-wrapper">
      <SEO 
        title={title}
        description={description?.substring(0, 160)}
        image={mainImage}
        url={`https://iwoland.com/singleblog/${id}`}
        type="article"
        schema={newsSchema}
      />

      <div className="single-blog-content-layout">
        <article className="blog-main-column">
          {/* Navigation & Breadcrumb */}
          <nav className="blog-nav">
            <button onClick={() => navigate("/blogs")} className="back-link">
              <IoArrowBack /> Back to News & Updates
            </button>
          </nav>

          {/* Header Section */}
          <header className="blog-header">
            <h1 className="blog-title">{title}</h1>
            
            <div className="blog-meta-new">
              <span className="meta-item">
                <IoPersonOutline className="meta-icon" /> {author}
              </span>
              <span className="meta-separator">|</span>
              <span className="meta-item">
                <IoCalendarOutline className="meta-icon" /> {formattedDate}
              </span>
              <span className="meta-separator">|</span>
              <span className="meta-item">
                <IoTimeOutline className="meta-icon" /> {readTime} min read
              </span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="featured-image-wrapper">
            <img
              src={mainImage}
              alt={title}
              className="featured-image"
              loading="eager"
            />
          </div>

          {/* Article Body */}
          <section className="article-body">
            {description.split('\n').map((paragraph, index) => (
              paragraph && <p key={index}>{paragraph}</p>
            ))}
          </section>

          {/* Additional Gallery Section */}
          {(singleNews.image1 || singleNews.image2 || singleNews.image3) && (
            <section className="article-gallery">
              <h3 className="gallery-title">More Pictures</h3>
              <div className="gallery-grid">
                {[singleNews.image1, singleNews.image2, singleNews.image3].filter(Boolean).map((img, i) => (
                  <div key={i} className="gallery-item">
                    <img src={img} alt={`Gallery image ${i + 1}`} loading="lazy" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Sharing Placeholder - Highly Professional feel */}
          <footer className="article-footer">
             <div className="share-section">
                <span>Share this article:</span>
                <div className="share-actions">
                  <a href={shareUrls.whatsapp} target="_blank" rel="noopener noreferrer" className="share-icon-btn whatsapp" title="Share on WhatsApp">
                    <IoLogoWhatsapp />
                  </a>
                  <a href={shareUrls.facebook} target="_blank" rel="noopener noreferrer" className="share-icon-btn facebook" title="Share on Facebook">
                    <IoLogoFacebook />
                  </a>
                  <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer" className="share-icon-btn twitter" title="Share on Twitter">
                    <IoLogoTwitter />
                  </a>
                  <button onClick={handleCopyLink} className="btn-share-copy" title="Copy Link">
                    <IoCopyOutline /> Copy Link
                  </button>
                </div>
             </div>
          </footer>
        </article>

        {/* Improved SideBar Column */}
        <aside className="blog-sidebar-column">
          <SideBar />
        </aside>
      </div>
    </div>
  );
};

export default SingleBlog;
