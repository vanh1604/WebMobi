import React, { use, useEffect, useState } from "react";
import { getImageSlider, getSlider } from "../ultils";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
function SilderWeb() {
  const [slider, setSlider] = useState([]);
  const settings = {
    dots: true, // Show dots navigation
    infinite: true, // Infinite scrolling
    speed: 500,
    slidesToShow: 1, // Number of slides visible
    slidesToScroll: 1,
    arrows: true,
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
    const res = await axios.get(getSlider());

    setSlider(res.data.data.docs);
  };
  useEffect(() => {
    fetchSlider();
  }, []);
  return (
    <div className="bg-slate-300">
      <div className="slider-container w-5/6 m-auto h-[395px]">
        <Slider {...settings}>
          {slider.map((item, index) => (
            <div key={index} className="gap-2">
              <img
                className="w-full object-cover h-[395px]"
                src={getImageSlider(item.image)}
                alt={item.name}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default SilderWeb;
