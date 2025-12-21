import React, { useState, useEffect } from 'react';
import './css/Admin.css';
import { useNews } from '../hooks/useNews';
import { toast } from 'sonner';

const Admin = () => {
  const [events, setEvents] = useState([]);
  const [imagePreviews, setImagePreviews] = useState({});
  const [expandedRows, setExpandedRows] = useState({});
  const [facebookLink, setFacebookLink] = useState('');
  const [activeTab, setActiveTab] = useState('events');
  // gallery
  const [galleryData, setGalleryData] = useState({
    title: "",
    gallery: null
  })
  const [galleryLoading, setGalleryLoading] = useState(false)
  const [galleryImages, setGalleryImages] = useState([])
  const [imageGalleryPreviews, setImageGalleryPreviews] = useState(null)

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    description: '',
    mainImage: null,
    image1: null,
    image2: null,
    image3: null,
  });

  const {
    createNews,
    fetchNews,
    deleteNews, 
    loading,
    creating,
    news,
    createFacebookLink,
    fetchFacebookLink,
    deleteFacebookLink,
    facebookPosts
  } = useNews();

  // Fetch news when component mounts
  useEffect(() => {
    fetchNews();
    fetchFacebookLink();
    fetchGalleryImages();
  }, []);

  // Keep local events list synced with news from the hook
  useEffect(() => {
    setEvents(news);
  }, [news]);

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (file) {
      setNewEvent((prev) => ({ ...prev, [name]: file }));
      setImagePreviews((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };

  const addEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newEvent.title);
    formData.append('date', newEvent.date);
    formData.append('description', newEvent.description);
    if (newEvent.mainImage) formData.append('mainImage', newEvent.mainImage);
    if (newEvent.image1) formData.append('image1', newEvent.image1);
    if (newEvent.image2) formData.append('image2', newEvent.image2);
    if (newEvent.image3) formData.append('image3', newEvent.image3);

    await createNews(formData);
    setNewEvent({ title: '', date: '', description: '', mainImage: null, image1: null, image2: null, image3: null, });
    setImagePreviews({});
    fetchNews();
  };

  const removeEvent = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await deleteNews(id);
      fetchNews();
    }
  };

  const toggleExpand = (id, field) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: !prev[id]?.[field],
      },
    }));
  };

  const truncate = (text, length) => {
    if (!text) return '';
    return text.length > length ? text.slice(0, length) + '...' : text;
  };

  // Facebook Link Section
  const addFacebookPost = async (e) => {
    e.preventDefault();
    if (!facebookLink) return;

    await createFacebookLink({facebookLink});
    setFacebookLink('');
    fetchFacebookLink();
  };

  const removeFacebookPost = async (id) => {
    if (window.confirm('Are you sure you want to delete this Facebook post?')) {
      await deleteFacebookLink(id);
      fetchFacebookLink();
    }
  };

  // Facebook SDK loader
  useEffect(() => {
    if (!window.FB) {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      document.body.appendChild(script);
    } else {
      window.FB.XFBML.parse();
    }
  }, []);

  useEffect(() => {
    if (window.FB) window.FB.XFBML.parse();
  }, [facebookPosts]);


  // Gallery Images

  const handleGalleryImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setGalleryData((prev) => ({ ...prev, gallery: file }));
    setImageGalleryPreviews(URL.createObjectURL(file));
  };


  const baseUrl = import.meta.env.VITE_BASE_URL
  const token = localStorage.getItem("accessToken")

  const addGalleryImage = async (e) => {
    e.preventDefault();

    if (!galleryData.title || !galleryData.gallery) {
      alert("Gallery title and image are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", galleryData.title);
    formData.append("gallery", galleryData.gallery);

    try {
      setGalleryLoading(true)
      const response = await fetch(`${baseUrl}/gallery`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to create Gallery Image");

      const created = await response.json();

      if (created.status === "success") {
        toast.success("Gallery image created successfully");
        fetchGalleryImages();
        setGalleryData({ title: "", gallery: null });
        setImageGalleryPreviews(null);        
      }
    } catch (error) {
      console.error(error);
    }finally{
      setGalleryLoading(false)
    }
  };


  const fetchGalleryImages = async()=>{
    try {
      const res =  await fetch(`${baseUrl}/gallery`)
      if(!res.ok) throw new Error("Failed to Load gallery images")
      const data = await res.json()
      
      if(data.status === "success"){
        setGalleryImages(data.gallery)
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  const removeGalleryImage = async (id) => {
    if (window.confirm('Are you sure you want to delete this gallery image?')){
      try {
        const res = await fetch(`${baseUrl}/gallery/${id}`,{
          method: "DELETE",
          headers: { 'Authorization': `Bearer ${token}` }
        })

        if(!res.ok) throw new Error("Fail to delete gallery image")

        const deleted = await res.json()

        if(deleted.status === "success"){
          alert(deleted.message)
        }
        fetchGalleryImages()
      } catch (error) {
        console.log(error);        
      }
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <nav className="admin-nav">
          <button 
            className={activeTab === 'events' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('events')}
          >
            Events
          </button>
          <button 
            className={activeTab === 'facebook' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('facebook')}
          >
            Facebook Posts
          </button>
          <button 
            className={activeTab === 'gallery' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('gallery')}
          >
            Gallery Images
          </button>
        </nav>
      </header>

      {activeTab === 'events' && (
        <>
          <section className="form-section">
            <h2>Add New Event</h2>
            <form onSubmit={addEvent} className="event-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Title *</label>
                  <input
                    required
                    type="text"
                    name="title"
                    placeholder="Event title"
                    value={newEvent.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="date">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={newEvent.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  name="description"
                  placeholder="Event description"
                  value={newEvent.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="mainImage">Main Image *</label>
                  <input
                    name="mainImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="image1">Image 1</label>
                  <input name="image1" type="file" accept="image/*" onChange={handleImage} />
                </div>
                <div className="form-group">
                  <label htmlFor="image2">Image 2</label>
                  <input name="image2" type="file" accept="image/*" onChange={handleImage} />
                </div>
                <div className="form-group">
                  <label htmlFor="image3">Image 3</label>
                  <input name="image3" type="file" accept="image/*" onChange={handleImage} />
                </div>
              </div>
              
              <div className="preview-row">
                {imagePreviews.mainImage && <div className="preview-container"> <img loading='lazy' src={imagePreviews.mainImage} alt='mainImage' className="preview" /><span>Main</span></div>}
                {imagePreviews.image1 && <div className="preview-container">  <img loading='lazy' src={imagePreviews.image1} alt='image1' className="preview" /><span>Image 1</span></div>}
                {imagePreviews.image2 && <div className="preview-container">  <img loading='lazy' src={imagePreviews.image2} alt='image2' className="preview" /><span>Image 2</span></div>}
                {imagePreviews.image3 && <div className="preview-container">  <img loading='lazy' src={imagePreviews.image3} alt='image3' className="preview" /><span>Image 3</span></div>}
              </div>
              
              <button disabled={creating} type="submit" className="submit-btn">
                {creating ? 'Adding Event...' : 'Add Event'}
              </button>
            </form>
          </section>

          <section className="events-section">
            <h2>Manage Events</h2>
            {loading ? (
              <div className="loading">Loading events...</div>
            ) : events.length === 0 ? (
              <div className="no-data">No events found. Add your first event above.</div>
            ) : (
              <div className="events-table-container">
                <table className="events-table">
                  <thead>
                    <tr>
                      <th>Main Image</th>
                      <th>Title</th>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Extra Images</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events
                    .slice(0,16)
                    .map((ev) => (
                      <tr key={ev._id}>
                        <td>
                            <img loading='lazy' src={ev.mainImage} alt={ev.title} className="thumb" />
                        </td>
                        <td>
                          {expandedRows[ev._id]?.title ? ev.title : truncate(ev.title, 20)}
                          {ev?.title && ev.title.length > 20 && (
                            <span
                              className="read-more"
                              onClick={() => toggleExpand(ev._id, 'title')}
                            >
                              {expandedRows[ev._id]?.title ? ' Show less' : ' Show more'}
                            </span>
                          )}
                        </td>
                        <td>{new Date(ev.date).toLocaleDateString()}</td>
                        <td>
                          {expandedRows[ev._id]?.description ? ev.description : truncate(ev.description, 50)}
                          {ev?.description && ev.description.length > 50 && (
                            <span
                              className="read-more"
                              onClick={() => toggleExpand(ev._id, 'description')}
                            >
                              {expandedRows[ev._id]?.description ? ' Show less' : ' Show more'}
                            </span>
                          )}
                        </td>
                        <td className="extra-images">
                          {ev.image1 &&   <img loading='lazy' src={ev.image1} alt={ev.title} className="thumb" />}
                          {ev.image2 &&   <img loading='lazy' src={ev.image2} alt={ev.title} className="thumb" />}
                          {ev.image3 &&   <img loading='lazy' src={ev.image3} alt={ev.title} className="thumb" />}
                        </td>
                        <td>
                          <button onClick={() => removeEvent(ev._id)} className="delete-btn">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}

      {activeTab === 'facebook' && (
        <section className="facebook-section">
          <h2>Add New Facebook Posts</h2>
          
          <form onSubmit={addFacebookPost} className="facebook-form">
            <div className="form-group">
              <label htmlFor="facebookLink">Facebook Post URL</label>
              <input
                type="url"
                id="facebookLink"
                value={facebookLink}
                onChange={(e) => setFacebookLink(e.target.value)}
                placeholder="Paste Facebook post URL here"
                required
              />
            </div>
            <button type="submit" className="submit-btn">Add Facebook Post</button>
          </form>
          <br />
          <h2>Manage Facebook Posts</h2>
          <div className="facebook-posts-grid">
            {facebookPosts.length === 0 ? (
              <div className="no-data">No Facebook posts added yet.</div>
            ) : (
              facebookPosts
              .slice(0,6)
              .map((post) => (
                <div key={post._id} className="facebook-post-card">
                  <div className="fb-post-container">
                    <div
                      className="fb-post"
                      data-href={post.facebookLink}
                      data-width="100%"
                      data-show-text="true"
                    ></div>
                  </div>
                  <button onClick={() => removeFacebookPost(post._id)} className="delete-btn">Delete Post</button>
                </div>
              ))
            )}
          </div>
        </section>
      )}

      {activeTab === 'gallery' && (
        <section className="facebook-section">
          <h2>Add New Gallery Images</h2>
          
          <form onSubmit={addGalleryImage} className="facebook-form">
            <div className="form-group">
              <label htmlFor="galleryTitle">Gallery Title</label>
              <input
                type="text"
                name='title'
                id="galleryTitle"
                value={galleryData.title}
                onChange={(e)=> setGalleryData((prev)=> ({...prev, title: e.target.value}))}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="gallery">Upload Gallery Image</label>
              <input
                type="file"
                accept='image/*'
                id="gallery"
                name='gallery'
                // value={galleryData.gallery}
                onChange={handleGalleryImage}
                required
              />
            </div>
            {imageGalleryPreviews &&
              <img src={imageGalleryPreviews} alt="uploaded image" />
            }
            <button disabled={galleryLoading} type="submit" className="submit-btn">{galleryLoading ? "Adding...." : "Add Gallery Image"}</button>
          </form>
          <br />
          <h2>Manage Gallery Images</h2>
          <div className="facebook-posts-grid">
            {galleryImages.length === 0 ? (
              <div className="no-data">No Gallery image added yet.</div>
            ) : (
              galleryImages
              .slice(0,6)
              .map((post) => (
                <div key={post._id} className="facebook-post-card">
                  <div className="fb-post-container">
                    <div>{post.title}</div>
                    <img height={100} src={post.gallery} alt={post.title} />
                  </div>
                  <button onClick={() => removeGalleryImage(post._id)} className="delete-btn">Delete Post</button>
                </div>
              ))
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default Admin;