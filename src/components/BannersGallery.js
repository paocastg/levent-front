import React from "react";
import Banner from "./Banner";
import { Row } from "react-bootstrap";

const banners = [
  {
    id: 0,
    company: "Katrina Florist Shop",
    photo:
      "https://res.cloudinary.com/paocast/image/upload/v1645215074/wayki/vb5tv6t6xyxp7kv4whdn.png",
    ubication: "Lima",
    category: "Floreria",
  },
  {
    id: 1,
    company: "The Perfect Match",
    photo:
      "https://res.cloudinary.com/paocast/image/upload/v1645215074/wayki/fh9j4zqrousekpjchqhf.png",
    ubication: "Tumbes",
    category: "Event Planner",
  },
  {
    id: 2,
    company: "Michilot Perú",
    photo:
      "https://res.cloudinary.com/paocast/image/upload/v1645215075/wayki/hkwgkom1pleux4bfz2mq.jpg",
    ubication: "La Libertad",
    category: "Video",
  },
  {
    id: 3,
    company: "San Jonás Catering",
    photo:
      "https://res.cloudinary.com/paocast/image/upload/v1645215082/wayki/cywqfsy7xorcrnwf0zhx.png",
    ubication: "Ancash",
    category: "Catering",
  },
];

export default function BannersGallery() {
  return (
    <>
      <Row className="row d-flex justify-content-center py-5 ">
        <div className="mb-3">
          <h3>Planifica tu evento ideal</h3>
        </div>
        {banners.length ? (
          <Row
            className="d-flex justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3"
            style={{ gap: 10 }}
          >
            {banners.map(({ id, company, photo, ubication, category }) => {
              return (
                <Banner
                  key={id}
                  id={id}
                  company={company}
                  photo={photo}
                  ubication={ubication}
                  category={category}
                />
              );
            })}
          </Row>
        ) : (
          <div>No se encontraron resultados</div>
        )}
      </Row>
    </>
  );
}
