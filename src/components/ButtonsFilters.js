import React from "react";
import { Button } from "react-bootstrap";
import Deco from "../assets/icons8-festival-50.png";
import Event from "../assets/icons8-libreta-de-direcciones-2-80.png";
import Flores from "../assets/icons8-ramo-de-novia-50.png";
import Foto from "../assets/icons8-professional-photographer-50.png";
import Musica from "../assets/icons8-musical-50.png";
import Food from "../assets/icons8-comida-50.png";
import { Link } from "react-router-dom";

export default function ButtonsFilters({ posts }) {
  return (
    <div>
      <div className="mb-3 mt-5">
        <h3>Encuentra los mejores proveedores por categoria</h3>
      </div>

      <Button
        variant="light"
        className="btn btncat"
        as={Link}
        value="Decoración"
        to={`/categories?category=Decoración`}
      >
        <img src={Deco} width="56" height="56" alt="deco" />
        Decoración
      </Button>
      <Button
        variant="light"
        className="btn btncat"
        as={Link}
        value="Florerias"
        to={`/categories?category=Florerias`}
      >
        <img src={Flores} width="56" height="56" alt="flores" />
        Florerias
      </Button>
      <Button
        variant="light"
        className="btn btncat"
        as={Link}
        value="Event Planner"
        to={`/categories?category=Event Planner`}
      >
        <img src={Event} width="56" height="56" alt="flores" />
        Event Planner
      </Button>
      <Button
        variant="light"
        className="btn btncat"
        as={Link}
        value="Fotografia"
        to={`/categories?category=Fotografia`}
      >
        <img src={Foto} width="56" height="56" alt="flores" />
        Fotografía
      </Button>
      <Button
        variant="light"
        className="btn btncat"
        as={Link}
        value="Música"
        to={`/categories?category=Música`}
      >
        <img src={Musica} width="56" height="56" alt="flores" />
        Música
      </Button>
      <Button
        variant="light"
        className="btn btncat"
        as={Link}
        value="Cattering"
        to={`/categories?category=Cattering`}
      >
        <img src={Food} width="56" height="56" alt="flores" />
        Cattering
      </Button>
    </div>
  );
}
