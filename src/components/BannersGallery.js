import React from "react";
import Banner from "./Banner";
import { Row } from "react-bootstrap";

export default function BannersGallery() {
  return (
    <>
      <Row className="row d-flex justify-content-center py-5 ">
        <div className="mb-3">
          <h3>Planifica tu evento ideal</h3>
        </div>
        <Row
          className="d-flex justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3"
          style={{ gap: 10 }}
        >
          <Banner />
          <Banner />
          <Banner />
          <Banner />
        </Row>
      </Row>
    </>
  );
}
