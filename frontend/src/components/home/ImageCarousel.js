import React from "react";
import Slider from "react-slick/lib/slider";
import image1 from "../../assets/homepage-header.jpg";
import image2 from "../../assets/homepage-header-2.jpg";

const ImageCarousel = () => {
  var settings = {
    infinite: true,
    speed: 750,
    variableWidth: true,
    slidesToShow: 1,
    centerMode: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            centerMode: true,
            variableWidth: true,
          }
        },
        {
            breakpoint: 700,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              centerMode: true,
              variableWidth: true,
            }
          }
    ]
  };
  return (
    <div className="image-carousel">
      <Slider {...settings}>
        <div>
          <img src={image1} className="carousel-image" />
        </div>
        <div>
          <img src={image2} className="carousel-image" />
        </div>
        <div>
          <img src={image1} className="carousel-image" />
        </div>
        <div>
          <img src={image2} className="carousel-image" />
        </div>
        <div>
          <img src={image1} className="carousel-image" />
        </div>
        <div>
          <img src={image2} className="carousel-image" />
        </div>
      </Slider>
    </div>
  );
};

export default ImageCarousel;
