import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MyPostsCard({ id, title, date, photos }) {
  return (
    <Col key={id} className="py-2 text-center" lg={3} md={6} xs={12}>
      <div
        className="d-flex flex-column"
        style={{
          wordWrap: "break-word",
          backgroundColor: "#fff",
          backgroundClip: "border-box",
          border: "1px solid rgba(0,0,0,.125)",
          borderRadius: "0.25rem",
        }}
      >
        <Card.Img
          style={{
            minWidth: "50%",
            height: "300px",
            objectFit: "cover",
          }}
          variant="top"
          src={photos[0]}
        />

        <Card.Body className="d-flex flex-column justify-content-center">
          <Card.Title>{title}</Card.Title>{" "}
          <Button as={Link} to={`/post/${id}`} variant="primary" id="see-post">
            Ver
          </Button>
        </Card.Body>
      </div>
    </Col>
  );
}
