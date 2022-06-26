import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Card, CardContent, TextField } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import { Box } from '@mui/system';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";

const RatingComponent = (props) => {
    if (props.type === 'view') {
        const [ratings, setRatings] = useState([]);
        useEffect(() => {
            fetch('https://pure-depths-91725.herokuapp.com/ratings')
                .then(res => res.json())
                .then(data => {
                    setRatings(data)
                })
        }, [])

        return (
            <div>
                <h1 style={{ textAlign: 'center', marginTop: '70px' }}>Some happy customers</h1>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                    style={{ marginTop: '30px' }}
                >
                    {
                        ratings.map(rating =>
                            <SwiperSlide style={{border:'1px solid black'}}>
                                <Card variant="outlined" style={{ flexGrow: 3 }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            {rating.name}
                                        </Typography>
                                        <Rating name="read-only" value={rating.star} readOnly />
                                        <Typography variant="body2">
                                            {
                                                rating.description
                                            }
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </SwiperSlide>)
                    }
                </Swiper>
            </div>
        );
    };

    if (props.type === 'rate') {
        const { user } = useAuth();
        const [starCount, setStarCount] = useState(1);
        const [description, setDescription] = useState('');
        const handleOnSubmit = e => {
            e.preventDefault();
            if (starCount === null || description==='') {
                return
            } else {
                const ratingData = {
                    name: user?.displayName,
                    email: user.email,
                    star: starCount,
                    description
                }
                fetch('https://pure-depths-91725.herokuapp.com/ratings', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(ratingData)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            alert('Your rating was received with love. Thanks for keeping with us !')
                        };
                    });
            };
        };

        const handleOnBlur = e => {
            const value = e.target.value;
            let newDescription = description;
            newDescription = value;
            setDescription(newDescription);
        };

        return (
            <div>
                <form
                    style={{
                        display: 'flex',
                        alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                        width: '100%',
                        marginTop: '70px'
                    }} onSubmit={handleOnSubmit}>
                    <h1 style={{ margin: '25px 0px', color: '#000000' }}>Rate Us</h1>
                    <TextField
                        id="description"
                        name="description"
                        label="Your Thoughts"
                        multiline
                        maxRows={4}
                        className='textField'
                        onBlur={handleOnBlur}
                        style={{ width: '25%' }}
                    />
                    <Rating
                        sx={{ my: 3 }}
                        name="simple-controlled"
                        value={starCount}
                        onChange={(event, newValue) => {
                            setStarCount(newValue);
                        }}
                    />
                    <button className='login-buttons' type="submit">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
};

export default RatingComponent;