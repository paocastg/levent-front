import { Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/L'EVENT - PNG.png";
import BackgroundImage from "../assets/prueba2.webp";

const style = {
  backgroundImage: `url(${BackgroundImage}), linear-gradient(rgba(255,255,255,0.8),rgba(255,255,255,0.8))`,
  backgroundSize: "cover",
  backgroundBlendMode: "overlay",
};

const css = `
@media (min-width: 200px) {
  #backimage {
      background-image: url(${BackgroundImage})!important;
  }
}`;

export default function Hero() {
  return (
    <Col
      style={style}
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      id="backimage"
    >
      <style scoped>{css}</style>

      <Image style={{ maxWidth: "400px" }} src={logo} alt="logo" />

      <p className="h4 mt-2">Encuentra todo lo que necesitas para tu evento</p>
      <Button
        className="mx-2 my-4"
        variant="secondary"
        as={Link}
        to="/Categories"
        size="lg"
      >
        Ver Categorias
      </Button>
    </Col>
  );
}
