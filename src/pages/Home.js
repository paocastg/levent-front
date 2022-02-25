import React from "react";
import Hero from "../components/Hero";
import { Row, Container } from "react-bootstrap";
import About from "../components/About";
import CarouselHome from "../components/CarouselHome";
import ButtonsFilters from "../components/ButtonsFilters";

export default function Home({ posts, setPosts }) {
  return (
    <Container className="text-center" fluid>
      <Row>
        <Hero />
      </Row>
      <ButtonsFilters posts={posts} setPosts={setPosts} />
      <CarouselHome />
      <About />
    </Container>
  );
}
