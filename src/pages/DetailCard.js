import { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import GalleryDetailCard from "../components/GalleryDetailCard";
import HeadBoard from "../components/HeadBoard";
import { useParams } from "react-router-dom";
import EmailCard from "../components/EmailCard";

export default function DetailCard({ dataPost }) {
  const { id } = useParams();
  const data = dataPost?.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <Container className="container-fluid my-4">
        <Row>
          <Row className="align-items-center my-4 ">
            <HeadBoard data={data} />
          </Row>
          <Row>
            <Col lg={6} md={12} xs={12}>
              <GalleryDetailCard data={data} />
              <p></p>
            </Col>

            <Col lg={6} md={12} xs={12}>
              <EmailCard />
            </Col>
          </Row>
          <hr className="my-4" />
          <Row>
            <Col lg={6} md={12} xs={12}>
              <h4> Descripcion </h4>
              <p className="text-secondary">{data.description}</p>
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
  );
}
