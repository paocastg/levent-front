import React from "react";
import { Card, Image } from "react-bootstrap";
import photo from "../assets/6.jpg";

export default function Banner() {
  return (
    <Card>
      <Card.Img
        variant="top"
        className="featured-image img-fluid"
        src={photo}
      />
      <Card.Body>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Image
          className="author-thumb"
          style={{
            width: "40px",
            height: "40px",
            float: "left",
            marginright: "13px",
          }}
          src={photo}
          alt="Sal"
          roundedCircle
        />
        sal
      </Card.Footer>
    </Card>
  );
}
