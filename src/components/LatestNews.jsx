import React from 'react'
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';

import { useNews } from '../hooks/useNews';



const LatestNews = () => {
    const {news} = useNews();
  return (
    <div>
        <div>
            <h1>Latest</h1>
        </div>
        {news.map((item, i) => {
            const truncatedHead = item.title.length > 30 ? item.title.slice(0, 30) + "..." : item.title;
            const truncatedSubHead = item.description.length > 40 ? item.description.slice(0, 40) + "..." : item.description;

            return (
                <Card
                key={i}
                variant=""
                orientation="horizontal"
                sx={{
                    width: 320,
                    '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                }}
            >
                    <AspectRatio ratio="1" sx={{ width: 90 }}>
                        <img
                            src={item.mainImage}
                            srcSet={item.mainImage}
                            loading="lazy"
                            alt=""
                        />
                    </AspectRatio>
                    <CardContent>
                        <Typography
                            sx={{
                                width: 170,
                                '&:hover': {}
                            }}
                            borderRadius={4}
                            bgcolor='var(--main-color-shade)'
                            padding={0.3}
                            fontSize={12}
                            textColor='white'
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
        })}

    </div>
  )
}

export default LatestNews