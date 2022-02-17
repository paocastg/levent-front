import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Col,
  Form,
  Row,
  Container,
  Accordion,
  ListGroup,
  ard,
} from "react-bootstrap";
import PetCard from "../components/CategoryCard";

export default function Categories({ posts, setPosts }) {
  const [queryParams, setQueryParams] = useState({
    type: "",
    limit: "10",
    title: "",
  });
  const [shallowSearch, setShallowSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleShallowSearch = (e) => {
    e.preventDefault();
    const searchInput = e.target.value;
    setShallowSearch(searchInput);
    if (searchInput) {
      let lookupText = new RegExp(searchInput, "i");
      let justFilteredPosts = posts.filter((post) =>
        lookupText.test(post.title)
      );
      setFilteredPosts(justFilteredPosts);
    } else {
      setFilteredPosts(posts);
    }
  };

  const handleInputChange = ({ target }) => {
    setQueryParams((state) => ({ ...state, [target.name]: target.value }));
  };

  useEffect(() => {
    let params = Object.entries(queryParams).filter(([k, v]) => v !== "");

    const fetchData = async () => {
      if (params.length) {
        const queryString = params
          .map((arr) => `${arr[0]}=${arr[1]}`)
          .reduce((k, v) => {
            if (k !== "") {
              let result = `${k}&${v}`;
              return result;
            } else {
              return `${v}`;
            }
          }, "");
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_API_URL}/api/v1/posts?${queryString}`
          );
          setPosts(response.data.data);
          setFilteredPosts(response.data.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [queryParams]);

  return (
    <Container className="text-center" fluid>
      <Row sm={2} className="row d-flex justify-content-center py-4">
        <h2 className="p-2">
          Encuentra los mejores profesionales para tu evento
        </h2>
      </Row>
      <div className="container-fluid mx-2">
        <div className="row  mx-2">
          <div className="col-md-3">
            <Form.Control
              className="mb-3"
              size="lg"
              name="title"
              type="text"
              placeholder="Buscar por titulo"
              onChange={handleShallowSearch}
              value={shallowSearch}
            />
            <Form.Select
              className="mb-3"
              name="type"
              onChange={handleInputChange}
              value={queryParams.type}
            >
              <option value="">Ubicación</option>
              <option value="amazonas">Amazonas</option>
              <option value="ancash">Ancash</option>
              <option value="apurimac">Apurimac</option>
              <option value="arequipa">Arequipa</option>
              <option value="ayacucho">Ayacucho</option>
              <option value="cajamarca">Cajamarca</option>
              <option value="callao">Callao</option>
              <option value="cusco">Cusco</option>
              <option value="huancavelica">Huancavelica </option>
              <option value="huanuco">Huanuco</option>
              <option value="ica">Ica</option>
              <option value="junin">Junín</option>
              <option value="lalibertad">La Libertad</option>
              <option value="lambayeque">Lambayeque</option>
              <option value="lima">Lima</option>
              <option value="loreto">Loreto</option>
              <option value="madrededios">Madre de Dios</option>
              <option value="moquegua">Moquegua</option>
              <option value="pasco">Pasco </option>
              <option value="piura">Piura</option>
              <option value="puno">Puno</option>
              <option value="sanmartin">San Martín</option>
              <option value="tacna">Tacna</option>
              <option value="tumbes">Tumbes</option>
              <option value="ucayali">Ucayali</option>
            </Form.Select>
            <Accordion defaultActiveKey="0" className="mb-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Categorías</Accordion.Header>
                <Accordion.Body>
                  <button className="btn w-100 mb-2">Catering</button>
                  <button className="btn w-100 mb-2">Event Planner</button>
                  <button className="btn w-100 mb-2">Fotografía y Video</button>
                  <button className="btn w-100 mb-2">Música y Animación</button>
                  <button className="btn w-100 mb-2">
                    Decoración de eventos
                  </button>
                  <button className="btn w-100 mb-2">Florerias</button>
                  <button className="btn w-100 mb-2">Vestidos</button>
                  <button className="btn w-100 mb-2">Ternos</button>
                  <button className="btn w-100 mb-2">Recepciones</button>
                  <button className="btn w-100 mb-2">Accesorios</button>
                  <button className="btn w-100 mb-2">Recuerdos</button>
                  <button className="btn w-100 mb-2">Movilidad</button>
                  <button className="btn w-100 mb-2">Invitaciones</button>
                  <button className="btn w-100 mb-2">Mobiliario</button>
                  <button className="btn w-100 mb-2">Open Bar</button>
                  <button className="btn w-100 mb-2">
                    Food truck y mesas de dulces
                  </button>
                  <button className="btn w-100 mb-2">Pasteleria</button>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <div className="col-md-9">
            {filteredPosts.length ? (
              <Row className="d-flex justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                {filteredPosts.map(({ id, title, createdAt: date, photos }) => {
                  return (
                    <PetCard
                      key={id}
                      id={id}
                      title={title}
                      photos={photos}
                      date={date}
                    />
                  );
                })}
              </Row>
            ) : (
              <div>No se encontraron resultados</div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
