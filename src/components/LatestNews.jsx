import React from 'react'
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Skeleton from '@mui/joy/Skeleton';

import { useNews } from '../hooks/useNews';
import useMediaQuery from './MediaQuery';

const LatestNews = () => {
  const { news, loading } = useNews(); 
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div>
      <div style={{ fontSize: "15px", marginBottom:  "20px"}}>
        <h1>Latest News</h1>
      </div>

      {loading
        ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card
              key={i}
              orientation="horizontal"
              sx={{
                width: isMobile ? '100%' : 320,
                mb: 2,
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
          news
          .slice(0,3)
          .map((item, i) => {
            const truncatedHead = item.title.length > 50 
              ? item.title.slice(0, 50) + "..." 
              : item.title;

            const truncatedSubHead = item.description.length > 85 
              ? item.description.slice(0,85) + "..." 
              : item.description;

            return (
              <div key={item?._id} className='latest-news-grid'>
                <Card
                  key={i}
                  orientation="horizontal"
                  sx={{ 
                    width: isMobile ? '100%' : 370,
                    mb: 2,
                    '&:hover': { 
                      boxShadow: 'md', 
                      borderColor: 'neutral.outlinedHoverBorder' 
                    },
                  }}
                >
                  <AspectRatio ratio="1" sx={{ width: 100 }}>
                    <img src={item.mainImage} loading="lazy" alt={item.title} />
                  </AspectRatio>
                  <CardContent>
                    
                    <Typography
                      sx={{
                        width: isMobile ? '100%' : 230,
                        borderRadius: 4,
                        bgcolor: 'var(--main-color-shade)',
                        p: 0.3,
                        fontSize: "15px",
                        color: 'white',
                      }}
                      level="title-lg"
                    >
                      {truncatedHead}
                    </Typography>

                    <Typography level="body-sm" sx={{ mb: 1 }}>
                      <Link
                        overlay
                        underline="none"
                        href={`/singleblog/${item?._id}`}
                        sx={{
                          color: 'black',
                          fontFamily: "var(--head-font)",
                          fontSize:12,
                          fontWeight: "650",
                        }}
                      >
                        {truncatedSubHead}
                      </Link>
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            );
          })
        )
      }
    </div>
  )
}

export default LatestNews;
