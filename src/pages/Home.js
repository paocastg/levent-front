import React from "react";
import BannersGallery from "../components/BannersGallery";
import Hero from "../components/Hero";
import { Row, Container } from "react-bootstrap";

export default function Home() {
  return (
    <Container className="text-center" fluid>
      <Row>
        <Hero />
      </Row>
      <BannersGallery />
    </Container>
  );
}
