import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CategoryCard({ id, photos, title, date }) {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <Card
        key={id}
        className="p-1 me-1"
        style={{
          wordWrap: "break-word",
          backgroundColor: "#fff",
          backgroundClip: "border-box",
          border: "1px solid rgba(0,0,0,.125)",
          borderRadius: "0.25rem",
        }}
      >
        <Card.Img
          variant="top"
          style={{
            minWidth: "50%",
            height: "150px",
            objectFit: "cover",
          }}
          src={photos}
          className="rounded"
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Button as={Link} to={`/post/${id}`} variant="secondary">
            Contactar
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
