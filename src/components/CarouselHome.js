import React from "react";

import Banner from "./Banner";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const banners = [
  {
    id: 0,
    company: "ChikyPau Eventos",
    photo:
      "https://res.cloudinary.com/paocast/image/upload/v1645300724/wayki/chikypau_fghsga.jpg",
    ubication: "La Libertad",
    category: "Animación",
    rate: "500",
  },
  {
    id: 1,
    company: "The Perfect Match",
    photo:
      "https://res.cloudinary.com/paocast/image/upload/v1645215074/wayki/fh9j4zqrousekpjchqhf.png",
    ubication: "Tumbes",
    category: "Event Planner",
    rate: "1500",
  },
  {
    id: 2,
    company: "Michilot Perú",
    photo:
      "https://res.cloudinary.com/paocast/image/upload/v1645215075/wayki/hkwgkom1pleux4bfz2mq.jpg",
    ubication: "La Libertad",
    category: "Video",
    rate: "1000",
  },
  {
    id: 3,
    company: "San Jonás Catering",
    photo:
      "https://res.cloudinary.com/paocast/image/upload/v1645215082/wayki/cywqfsy7xorcrnwf0zhx.png",
    ubication: "Ancash",
    category: "Catering",
    rate: "700",
  },
];

export default function CarouselHome() {
  return (
    <>
      <div className="mb-3 mt-5">
        <h3>Planifica tu evento ideal</h3>
      </div>

      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={2000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 4,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 2,
            partialVisibilityGutter: 30,
          },
        }}
        showDots={false}
        sliderClass=""
        slidesToSlide={2}
        swipeable
      >
        {banners.map(({ id, company, photo, ubication, category, rate }) => {
          return (
            <Banner
              key={id}
              id={id}
              company={company}
              photo={photo}
              ubication={ubication}
              category={category}
              rate={rate}
            />
          );
        })}
      </Carousel>
    </>
  );
}
