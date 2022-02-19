import { Row, Col, Image } from "react-bootstrap";
import PhotoAbout from "../assets/prueba.jpg";

export default function About() {
  return (
    <Row className="container mx-auto py-5">
      <Col>
        <h2 id="about">Sobre L'event</h2>
        <Row xs={10} sm={8}>
          <Row className="fs-5">
            <Col>
              Somos un portal de eventos que te ayudan a organizar tu evento,
              <br /> un día único en la vida para disfrutar con la familia y los
              amigos. <br /> Todo esto lo hacemos con la colaboración de miles
              de
              <br /> empresas especializadas y crecemos junto a ellas.
            </Col>
          </Row>
          <Image className="mt-4" src={PhotoAbout} alt="Find your pet" />
        </Row>
      </Col>
    </Row>
  );
}
