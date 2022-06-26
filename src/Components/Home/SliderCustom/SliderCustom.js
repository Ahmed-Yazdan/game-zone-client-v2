import React, { useRef, useState } from "react";
import '../SliderCustom/SliderCustom.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";

const SliderCustom = (props) => {
    const slides = props.slideData;

    return (
        <div>
            <Swiper
                slidesPerView={1}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
            >
                {
                    slides.map(slide => <SwiperSlide className="slide"><img src={slide.image} key={slide.id} /></SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default SliderCustom;


/* 



let slide = document.querySelectorAll('.content');
    let current = 0;
    const loopRunner = () => {
        for (let i = 0; i < slide.length; i++) {
            slide[i].style.display = 'none';
        }
    }

    const next = () => {
        loopRunner();
        if (current === slide.length - 1) {
            current = -1;
        }
        current++;

        slide[current].style.display = 'block';
    }

    const handleArrow = () => {
        loopRunner();
        slide[current].style.display = 'block';
    }
    handleArrow();





<div className="arrow left">
                <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            <div className='container'>
                <div className='slider-image'>
                    <img src="https://i.pinimg.com/564x/1f/79/ef/1f79ef9aba68b2fc4ee74279af4a0745.jpg" alt="" />
                </div>
                <div className="content">
                    <div className="typography">
                        <h1>Assassins Creed 4</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique ad veniam animi numquam totam excepturi nisi laudantium dignissimos nam deleniti.;D</p>
                    </div>
                    <div className="actions">
                        <button className="slider-button">Buy now</button>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='slider-image'>
                    <img src="https://i.pinimg.com/564x/1f/79/ef/1f79ef9aba68b2fc4ee74279af4a0745.jpg" alt="" />
                </div>
                <div className="content">
                    <div className="typography">
                        <h1>Assassins Creed 4</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique ad veniam animi numquam totam excepturi nisi laudantium dignissimos nam deleniti.;D</p>
                    </div>
                    <div className="actions">
                        <button className="slider-button">Buy now</button>
                    </div>
                </div>
            </div>
            <div className="arrow right">
                <FontAwesomeIcon icon={faArrowRight} />
            </div>
*/