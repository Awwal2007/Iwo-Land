import React from 'react'
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Skeleton from '@mui/joy/Skeleton';

import { useNews } from '../hooks/useNews';

const LatestNews = () => {
  const { news, loading } = useNews(); // <-- make sure useNews returns loading state too

  return (
    <div>
      <div style={{fontSize: "15px"}}>
        <h1>Latest News</h1>
      </div>

      {loading
        ? (
          // Show skeleton placeholders
          Array.from({ length: 3 }).map((_, i) => (
            <Card
              key={i}
              orientation="horizontal"
              sx={{
                width: 320,
                mb: 2
              }}
            >
              <AspectRatio ratio="1" sx={{ width: 90 }}>
                <Skeleton variant="overlay" />
              </AspectRatio>
              <CardContent>
                <Skeleton variant="text" width={170} sx={{ mb: 1 }} />
                <Skeleton variant="text" width={150} />
              </CardContent>
            </Card>
          ))
        )
        : (
          // Show actual news
          news.map((item, i) => {
            const truncatedHead =
              item.title.length > 45 ? item.title.slice(0, 45) + "..." : item.title;
            const truncatedSubHead =
              item.description.length > 40 ? item.description.slice(0, 40) + "..." : item.description;

            return (
              <Card
                key={i}
                orientation="horizontal"
                sx={{
                  width: 320,
                  mb: 2,
                  '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                }}
              >
                <AspectRatio ratio="1" sx={{ width: 90 }}>
                  <img
                    src={item.mainImage}
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
                <CardContent>
                  <Typography
                    sx={{
                      width: 170,
                      borderRadius: 4,
                      bgcolor: 'var(--main-color-shade)',
                      p: 0.3,
                      fontSize: 12,
                      color: 'white',
                    }}
                    level="title-lg"
                    id="card-description"
                  >
                    {truncatedHead}
                  </Typography>
                  <Typography
                    level="body-sm"
                    aria-describedby="card-description"
                    sx={{ mb: 1 }}
                  >
                    <Link
                      overlay
                      underline="none"
                      href={`/singleblog/${item?._id}`}
                      sx={{
                        color: 'black',
                        fontFamily: "var(--head-font)",
                        fontSize: "17px",
                        fontWeight: "650",
                      }}
                    >
                      {truncatedSubHead}
                    </Link>
                  </Typography>
                </CardContent>
              </Card>
            );
          })
        )
      }
    </div>
  )
}

export default LatestNews;
