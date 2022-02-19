import React from "react";
import { Card } from "react-bootstrap";
import { AiOutlineEnvironment } from "react-icons/ai";

export default function Banner({ id, company, category, ubication, photo }) {
  return (
    <Card key={id} className="p-1 me-1">
      <Card.Img variant="top" src={photo} />
      <Card.Body>
        <Card.Text>
          <p>{category}</p>
          <p>
            <AiOutlineEnvironment />
            {ubication}
          </p>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        {/* <Image
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
        /> */}
        {company}
      </Card.Footer>
    </Card>
  );
}
