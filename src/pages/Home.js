import React from "react";
import BannersGallery from "../components/BannersGallery";
import Hero from "../components/Hero";
import { Row, Container } from "react-bootstrap";
import About from "../components/About";

export default function Home() {
  return (
    <Container className="text-center" fluid>
      <Row>
        <Hero />
      </Row>
      <BannersGallery />
      <About />
    </Container>
  );
}
