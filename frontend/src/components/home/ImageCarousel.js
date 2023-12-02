import React from "react";
import Slider from "react-slick/lib/slider";
import image1 from "../../assets/carousel/carousel_1.png";
import image2 from "../../assets/carousel/carousel_2.png";
import image3 from "../../assets/carousel/carousel_3.png";
import image4 from "../../assets/carousel/carousel_4.png";
import image5 from "../../assets/carousel/carousel_5.png";

const ImageCarousel = () => {
  var settings = {
    infinite: true,
    speed: 750,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 5000,
    draggable: false,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          speed: 750,
          variableWidth: true,
          centerMode: true,
          autoplay: true,
          autoplaySpeed: 5000,
          draggable: false,
          adaptiveHeight: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          speed: 750,
          variableWidth: true,
          centerMode: true,
          autoplay: true,
          autoplaySpeed: 5000,
          draggable: false,
          adaptiveHeight: true,
        },
      }
    ],
  };
  return (
    <div className="image-carousel">
      <Slider {...settings}>
        <div className="slider-image">
          <img src={image1} className="carousel-image" />
        </div>
        <div className="slider-image">
          <img src={image2} className="carousel-image" />
        </div>
        <div className="slider-image">
          <img src={image3} className="carousel-image" />
        </div>
        <div className="slider-image">
          <img src={image4} className="carousel-image" />
        </div>
        <div className="slider-image">
          <img src={image5} className="carousel-image" />
        </div>
      </Slider>
    </div>
  );
};

export default ImageCarousel;
