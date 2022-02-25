import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineEnvironment } from "react-icons/ai";
import Payment from "./Payment";

export default function MyPostsCard({
  id,
  photos,
  company,
  ubication,
  category,
  rate,
}) {
  return (
    <Col key={id} className="py-2 text-center" lg={3} md={6} xs={12}>
      <div
        className="d-flex flex-column p-1 me-1"
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
            height: "130px",
            objectFit: "cover",
          }}
          variant="top"
          src={photos[0]}
          className="rounded"
        />

        <Card.Body className="d-flex flex-column justify-content-center">
          <Card.Title>{company}</Card.Title>{" "}
          <Card.Text>
            {category}
            <br />
            <AiOutlineEnvironment /> {ubication}
            <br />
            <strong>Desde: </strong>S/ {rate}
          </Card.Text>
          <Button
            as={Link}
            to={`/post/${id}`}
            variant="secondary"
            id="see-post"
          >
            Ver
          </Button>
          <Payment className="d-flex flex-column" idPost={id} />
        </Card.Body>
      </div>
    </Col>
  );
}
