import React, { useEffect, useState } from "react";

import Banner from "./Banner";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";

import Photo1 from "../assets/10.jpg";
import Photo2 from "../assets/1437668392.jpg";
import Photo3 from "../assets/portada.jpg";
import Photo4 from "../assets/portada2.jpg";

export default function CarouselHome() {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [queryParams] = useState({ published: 1 });

  // ✅ Data local para probar el carrusel aunque la API no devuelva nada
  const localBanners = [
    {
      id: "l1",
      company: "Demo 1",
      photos: [Photo1],
      ubication: "Lima",
      category: "Animación",
      rate: "500",
    },
    {
      id: "l2",
      company: "Demo 2",
      photos: [Photo2],
      ubication: "Trujillo",
      category: "Video",
      rate: "1000",
    },
    {
      id: "l3",
      company: "Demo 3",
      photos: [Photo3],
      ubication: "Piura",
      category: "Catering",
      rate: "700",
    },
    {
      id: "l4",
      company: "Demo 4",
      photos: [Photo4],
      ubication: "Arequipa",
      category: "Planner",
      rate: "1500",
    },
  ];

  useEffect(() => {
    const params = Object.entries(queryParams).filter(([k, v]) => v !== "");

    const fetchData = async () => {
      if (!params.length) return;

      const queryString = params
        .map(([k, v]) => `${k}=${v}`)
        .join("&");

      try {
        console.log("BASE URL:", process.env.REACT_APP_BASE_API_URL);
        console.log("QueryString:", queryString);

        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/api/v1/posts?${queryString}`
        );

        console.log("API response:", response.data);
        console.log("posts:", response.data?.data);

        setFilteredPosts(response.data?.data || []);
      } catch (error) {
        console.log("Error fetching posts:", error);
        setFilteredPosts([]); // por si falla, para que use el fallback
      }
    };

    fetchData();
  }, [queryParams]);

  // ✅ si la API no trae nada, mostramos las imágenes locales
  const dataToRender =
    filteredPosts && filteredPosts.length > 0 ? filteredPosts : localBanners;

  return (
    <>
      <div className="mb-3 mt-5">
        <h3>Encuentra los mejores proveedores por categoria</h3>
      </div>

      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={2000}
        centerMode={false}
        containerClass="container-with-dots"
        draggable
        infinite
        keyBoardControl
        minimumTouchDrag={80}
        responsive={{
          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            partialVisibilityGutter: 40,
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            partialVisibilityGutter: 30,
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            partialVisibilityGutter: 30,
          },
        }}
        showDots={false}
        slidesToSlide={1}
        swipeable
      >
        {dataToRender.map(({ id, company, photos, ubication, category, rate }) => (
          <Banner
            key={id}
            id={id}
            company={company}
            // ✅ evita que reviente si photos viene null o vacío
            photos={photos?.[0]}
            ubication={ubication}
            category={category}
            rate={rate}
          />
        ))}
      </Carousel>
    </>
  );
}
