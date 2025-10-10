import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: "https://iwo-land.vercel.app" });

  // List all pages
  const links = [
    { url: "/", changefreq: "daily", priority: 1.0 },
    { url: "/blogs", changefreq: "monthly", priority: 0.9 },
    { url: "/gallery", changefreq: "monthly", priority: 0.8 },
  ];

  links.forEach((link) => sitemap.write(link));
  sitemap.end();

  const data = await streamToPromise(sitemap);
  createWriteStream("./dist/sitemap.xml").write(data);
  console.log("✅ Sitemap generated at dist/sitemap.xml");
}

generateSitemap();
