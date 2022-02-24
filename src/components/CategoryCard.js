import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineEnvironment } from "react-icons/ai";

export default function CategoryCard({
  id,
  photos,
  company,
  ubication,
  category,
  rate,
}) {
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
          maxHeight: "400px",
        }}
      >
        <Card.Img
          variant="top"
          style={{
            // minWidth: "50%",
            // maxHeight: "130px",
            height: "130px",
            objectFit: "cover",
          }}
          src={photos[0]}
          className="rounded"
        />
        <Card.Body>
          <Card.Title>{company}</Card.Title>
          <Card.Text>
            {category}
            <br />
            <AiOutlineEnvironment /> {ubication}
            <br />
            <strong>Desde: </strong>S/ {rate}
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
