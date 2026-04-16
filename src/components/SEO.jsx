import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url, type = 'website', schema }) => {
  const siteName = "Official Website of Iwoland";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const canonicalUrl = url || "https://iwoland.com";
  const defaultDescription = "Welcome to the official website of Iwoland. Explore the history, leadership, news, and cultural heritage of the ancient crown of Iwo Kingdom.";
  const metaDescription = description || defaultDescription;
  const metaImage = image || "https://iwoland.com/logo.png"; // Replace with your actual logo path

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Official Iwoland" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Trust Signals & Indexing */}
      <meta name="author" content="Iwo Land Royal Institution" />
      <meta name="robots" content="index, follow" />

      {/* JSON-LD Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
