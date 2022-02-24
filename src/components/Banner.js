import React from "react";
import { Card } from "react-bootstrap";
import { AiOutlineEnvironment } from "react-icons/ai";

export default function Banner({
  id,
  company,
  category,
  ubication,
  photo,
  rate,
}) {
  return (
    <Card key={id} className="p-1 me-1" style={{ padding: 8 }}>
      <Card.Img variant="top" src={photo} style={{ width: "100%" }} />
      <Card.Body>
        <Card.Title> {company}</Card.Title>
        <Card.Text>
          {category} <br />
          <strong>Desde: </strong>S/ {rate}
        </Card.Text>
        <button className="btn btn-secondary">Contactar</button>
      </Card.Body>
      <Card.Footer className="text-muted">
        <AiOutlineEnvironment />
        {ubication}
      </Card.Footer>
    </Card>
  );
}
