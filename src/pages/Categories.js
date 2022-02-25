import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Row, Container } from "react-bootstrap";
import CategoryCard from "../components/CategoryCard";

export default function Categories({ posts, setPosts }) {
  const [queryParams, setQueryParams] = useState({
    ubication: "",
    category: "",
    limit: "10",
    company: "",
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
        lookupText.test(post.company)
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
    const query = new URLSearchParams(window.location.search);

    if (query.get("category")) {
      queryParams.category = query.get("category");
    }

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
          setFilteredPosts(response.data.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [queryParams]);

  return (
    <Container
      className="text-center"
      fluid
      style={{
        minHeight: "500px",
      }}
    >
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
              name="company"
              type="text"
              placeholder="Buscar por empresa"
              onChange={handleShallowSearch}
              value={shallowSearch}
            />
            <Form.Select
              className="mb-3"
              name="ubication"
              onChange={handleInputChange}
              value={queryParams.ubication}
            >
              <option value="">Ubicación</option>
              <option value="Amazonas">Amazonas</option>
              <option value="Ancash">Ancash</option>
              <option value="Apurimac">Apurimac</option>
              <option value="Arequipa">Arequipa</option>
              <option value="Ayacucho">Ayacucho</option>
              <option value="Cajamarca">Cajamarca</option>
              <option value="Callao">Callao</option>
              <option value="Cusco">Cusco</option>
              <option value="Huancavelica">Huancavelica </option>
              <option value="Huanuco">Huanuco</option>
              <option value="Ica">Ica</option>
              <option value="Junin">Junín</option>
              <option value="La Libertad">La Libertad</option>
              <option value="Lambayeque">Lambayeque</option>
              <option value="Lima">Lima</option>
              <option value="Loreto">Loreto</option>
              <option value="Madre de Dios">Madre de Dios</option>
              <option value="Moquegua">Moquegua</option>
              <option value="Pasco">Pasco </option>
              <option value="Piura">Piura</option>
              <option value="Puno">Puno</option>
              <option value="San Martín">San Martín</option>
              <option value="Tacna">Tacna</option>
              <option value="Tumbes">Tumbes</option>
              <option value="Ucayali">Ucayali</option>
            </Form.Select>
            <Form.Select
              className="mb-3"
              name="category"
              onChange={handleInputChange}
              value={queryParams.category}
            >
              <option value="">Categorías</option>
              <option value="Cattering">Cattering</option>
              <option value="Event Planner">Event Planner</option>
              <option value="Fotografia">Fotografia</option>
              <option value="Video">Video</option>
              <option value="Música">Música </option>
              <option value="Decoración">Decoración</option>
              <option value="Florerias">Florerias</option>
              <option value="Vestidos">Vestidos</option>
              <option value="Ternos">Ternos</option>
              <option value="Recepciones">Recepciones</option>
              <option value="Accesorios">Accesorios</option>
              <option value="Recuerdos">Recuerdos</option>
              <option value="Movilidad">Movilidad</option>
              <option value="Invitaciones">Invitaciones</option>
              <option value="Mobiliario">Mobiliario</option>
              <option value="Open Bar">Open Bar</option>
              <option value="Food truck">Food truck</option>
              <option value="Pasteleria">Pasteleria</option>
            </Form.Select>
          </div>
          <div className="col-md-9">
            {filteredPosts.length ? (
              <Row className="d-flex justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                {filteredPosts.map(
                  ({ id, company, ubication, category, rate, photos }) => {
                    return (
                      <CategoryCard
                        key={id}
                        id={id}
                        company={company}
                        photos={photos}
                        ubication={ubication}
                        category={category}
                        rate={rate}
                      />
                    );
                  }
                )}
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
