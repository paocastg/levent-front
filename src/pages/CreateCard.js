import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Col,
  Row,
  Image,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import profileIcon from "../assets/landscape-placeholder.png";
import { useNavigate } from "react-router-dom";
import config from "../config";

import { getToken } from "../user/session";

export default function CreateCard({ posts, setDataPost }) {
  const [alert, setAlert] = useState({ status: false, message: "", type: "" });
  const [isUploaded, setIsUploaded] = useState(false);

  let navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    company: "",
    category: "",
    ubication: "",
    description: "",
    facebook: "",
    instagram: "",
    page: "",
    rate: "",
    photos: [],
  });
  const token = getToken();

  const handleInputChange = ({ target }) => {
    setFormValues((state) => ({ ...state, [target.name]: target.value }));
  };

  // Upload images and display them
  const handlePhotoChange = ({ target }) => {
    const formData = new FormData();
    let files = target.files;
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("file", file);
      formData.append("upload_preset", config.CLOUDINARY_UPLOAD_PRESET);
      axios
        .post(config.CLOUDINARY_UPLOAD_URL, formData)
        .then((response) => {
          setFormValues((previousFormValues) => ({
            ...previousFormValues,
            photos: previousFormValues.photos.concat(response.data.url),
          }));
          setIsUploaded(true);
        })
        .catch((error) => {
          setAlert({ status: true, message: error.message, type: "danger" });
        });
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const newPost = {
      links: {
        facebook: formValues.facebook,
        instagram: formValues.instagram,
        page: formValues.page,
      },
      company: formValues.company,
      category: formValues.category,
      ubication: formValues.ubication,
      rate: formValues.rate,
      description: formValues.description,
      mainPhoto: 0,
      photos: formValues.photos,
    };
    axios
      .post(`${config.BASE_API_URL}/api/v1/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setDataPost(posts.concat(response.data.data));
          navigate(`/post/${response.data.data.id}`);
        }
      })
      .catch((error) => {
        setAlert({
          status: true,
          message: "Complete los campos",
          type: "danger",
        });
      });
  };
  return (
    <Container className="justify-content-center my-5">
      <Row className="row d-flex justify-content-center px-5 ">
        {alert.status && (
          <Alert
            variant={alert.type}
            onClose={() => {
              setAlert({ status: false, message: "", type: "" });
            }}
            dismissible
          >
            <p>{alert.message}</p>
          </Alert>
        )}
        <div className="mb-5">
          <h2> Crea tu anuncio </h2>
        </div>

        <Form
          onSubmit={onSubmitForm}
          noValidate
          autoComplete="off"
          className="justify-content-center px-5"
        >
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Galeria:
            </Form.Label>
            <Col sm="9">
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <input
                  type="file"
                  name="photos"
                  accept=".jpg,.jpeg,.gif,.png"
                  onChange={handlePhotoChange}
                  multiple
                  data-test-id="photos-post-form"
                />
              </Form.Group>
            </Col>
          </Form.Group>
          <Form.Group className="mb-3">
            <figure className="mb-3">
              {!isUploaded ? (
                <>
                  <Image
                    className="mx-1 mb-3"
                    width={300}
                    draggable={"false"}
                    src={profileIcon}
                    alt="UploadImage"
                  />
                </>
              ) : (
                formValues.photos.map((photo) => {
                  return (
                    <Image
                      className="mx-2 mb-3"
                      key={photo.match(/([a-zA-Z0-9]+.jpg)/)[0]}
                      width={300}
                      draggable={"false"}
                      src={photo}
                      alt="UploadImage"
                    />
                  );
                })
              )}
            </figure>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Empresa:
            </Form.Label>
            <Col sm="9">
              <Form.Control
                placeholder="Ejm: Rustic Art Decoraciones"
                type="text"
                name="company"
                onChange={handleInputChange}
                value={formValues.company}
                data-test-id="title-post-form"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Categoria:
            </Form.Label>
            <Col sm="9">
              <Form.Select
                name="category"
                onChange={handleInputChange}
                value={formValues.category}
                data-test-id="size-select-form"
              >
                <option value="">Selecciona una opción</option>
                <option value="Cattering">Cattering</option>
                <option value="Event Planner">Event Planner</option>
                <option value="Fotografia">Fotografia</option>
                <option value="Video">Video</option>
                <option value="Música Animación">Música Animación</option>
                <option value="Decoración de eventos">
                  Decoración de eventos
                </option>
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
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Ubicación:
            </Form.Label>
            <Col sm="9">
              <Form.Select
                name="ubication"
                onChange={handleInputChange}
                value={formValues.ubication}
                data-test-id="sex-select-form"
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
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Precio desde:
            </Form.Label>
            <Col sm="9">
              <Form.Control
                placeholder="Ejm: S/ 700"
                type="text"
                name="rate"
                onChange={handleInputChange}
                value={formValues.rate}
                data-test-id="tags-post-form"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Página Web:
            </Form.Label>
            <Col sm="9">
              <Form.Control
                placeholder=""
                type="text"
                name="page"
                onChange={handleInputChange}
                value={formValues.page}
                data-test-id="name-post-form"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Facebook:
            </Form.Label>
            <Col sm="9">
              <Form.Control
                placeholder=""
                type="text"
                name="facebook"
                onChange={handleInputChange}
                value={formValues.facebook}
                data-test-id="name-post-form"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Instagram:
            </Form.Label>
            <Col sm="9">
              <Form.Control
                placeholder=""
                type="text"
                name="instagram"
                onChange={handleInputChange}
                value={formValues.instagram}
                data-test-id="name-post-form"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Descripción:
            </Form.Label>
            <Col sm="9">
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                name="description"
                onChange={handleInputChange}
                value={formValues.description}
                data-test-id="description-post-form"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="justify-content-center">
            <Button
              className="mt-5 w-50 "
              variant="secondary"
              type="submit"
              id="button-login-form"
            >
              Crear Anuncio
            </Button>
          </Form.Group>
        </Form>
      </Row>
    </Container>
  );
}
