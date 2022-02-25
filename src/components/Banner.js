import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineEnvironment } from "react-icons/ai";

export default function Banner({
  id,
  company,
  category,
  ubication,
  photos,
  rate,
}) {
  return (
    <Card key={id} className="p-1 me-1" style={{ padding: 8 }}>
      <Card.Img
        variant="top"
        src={photos}
        style={{ width: "100%", height: "200px" }}
      />
      <Card.Body>
        <Card.Title> {company}</Card.Title>
        <Card.Text>
          {category} <br />
          <strong>Desde: </strong>S/ {rate}
        </Card.Text>
        <Button as={Link} to={`/post/${id}`} variant="secondary">
          Contactar
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">
        <AiOutlineEnvironment />
        {ubication}
      </Card.Footer>
    </Card>
  );
}
