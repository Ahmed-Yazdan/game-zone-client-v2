import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import NavbarCustom from '../../Components/Home/NavbarCustom/NavbarCustom';
import RatingComponent from '../../Components/Home/RatingComponent/RatingComponent';
import SliderCustom from '../../Components/Home/SliderCustom/SliderCustom';
import Games from '../Games/Games';
import "./Home.css";
import AboutUs from '../../Components/Home/AboutUs/AboutUs';

const Home = () => {

    const [slides, setSlides] = useState([]);

    useEffect(() => {
        fetch('slides.json')
            .then(res => res.json())
            .then(data => {
                setSlides(data)
            })
    }, [])

    return (
        <div className='home'>
            <div>
                <NavbarCustom />
                <SliderCustom style={{ width: '100%', height: '100vh' }} slideData={slides} key={slides.id} />
                <h1 style={{textAlign:'center', marginTop:'70px'}}>Featured Games</h1>
                <div className="games">
                    <Games showButtons={false} isNavbar={false} itemCount={3} />
                </div>
            </div>
            <div id='button-bottom'>
                <Button component={Link} to='/games' className='button'>See All</Button>
            </div>
            <div id='rating'>
                <RatingComponent type='view'/>
            </div>
            <AboutUs/>
            <RatingComponent type='rate'/>
        </div>
    );
};

export default Home;