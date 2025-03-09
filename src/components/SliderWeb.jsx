import React, { use, useEffect, useState } from "react";
import { getImageSlider, getSlide } from "../ultils";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Http from "../service/Api";
function SilderWeb() {
  const [slider, setSlider] = useState([]);
  const settings = {
    dots: true,
    arrows:false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    waitForAnimate: false,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const fetchSlider = async () => {
    const res = await Http.get(getSlide());

    setSlider(res.data.data.docs);
  };
  useEffect(() => {
    fetchSlider();
  }, []);
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {slider.map((item, index) => (
          <div key={index}>
            <img
              className="w-full object-cover"
              src={getImageSlider(item.image)}
              alt={item.name}
            />
          </div>
        ))}
        
      </Slider>
    </div>
  );
}

export default SilderWeb;
