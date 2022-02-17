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
import profileIcon from "../assets/blank-profile.png";
import { useNavigate } from "react-router-dom";
import config from "../config";
import useAuth from "../auth/useAuth";
import { getToken } from "../user/session";

export default function CreateCard({ posts, setDataPost }) {
  const [alert, setAlert] = useState({ status: false, message: "", type: "" });
  const [isUploaded, setIsUploaded] = useState(false);
  const auth = useAuth();
  let navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    title: "",
    name: "",
    type: "",
    tags: "",
    sex: "",
    color: "",
    size: "",
    age: "",
    reference: "",
    description: "",
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
      characteristics: {
        name: formValues.name,
        age: formValues.age,
        color: formValues.color,
        sex: formValues.sex,
        size: formValues.size,
      },
      location: formValues.reference,

      title: formValues.title,
      type: formValues.type,
      tags: formValues.tags.split(" "),
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
        setAlert({ status: true, message: error.message, type: "danger" });
      });
  };
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
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
        <h2>{auth.userLogin.username}, crea tu anuncio </h2>

        <Col lg={7} className="mt-5">
          <Form onSubmit={onSubmitForm} noValidate autoComplete="off">
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Empresa:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  placeholder="Ejm: Rustic Art Decoraciones"
                  type="text"
                  name="title"
                  onChange={handleInputChange}
                  value={formValues.title}
                  data-test-id="title-post-form"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Página Web:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  placeholder=""
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  value={formValues.name}
                  data-test-id="name-post-form"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Categoria:
              </Form.Label>
              <Col sm="10">
                <Form.Select
                  name="size"
                  onChange={handleInputChange}
                  value={formValues.size}
                  data-test-id="size-select-form"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="XS">Cattering</option>
                  <option value="S">Event Planner</option>
                  <option value="M">Fotografia</option>
                  <option value="L">Video</option>
                  <option value="XL">Música Animación</option>
                  <option value="">Decoración de eventos</option>
                  <option value="XS">Florerias</option>
                  <option value="S">Vestidos</option>
                  <option value="M">Ternos</option>
                  <option value="L">Recepciones</option>
                  <option value="XL">Accesorios</option>
                  <option value="XL">Recuerdos</option>
                  <option value="">Movilidad</option>
                  <option value="XS">Invitaciones</option>
                  <option value="S">Mobiliario</option>
                  <option value="M">Open Bar</option>
                  <option value="L">Food truck y mesas de dulces</option>
                  <option value="XL">Pasteleria</option>
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Precio desde:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  placeholder="Ejm: S/ 700"
                  type="text"
                  name="tags"
                  onChange={handleInputChange}
                  value={formValues.tags}
                  data-test-id="tags-post-form"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Ubicación:
              </Form.Label>
              <Col sm="10">
                <Form.Select
                  name="sex"
                  onChange={handleInputChange}
                  value={formValues.sex}
                  data-test-id="sex-select-form"
                >
                  <option value="">Selecciona tu Ubicación</option>
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
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Descripción:
              </Form.Label>
              <Col sm="10">
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

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Fotos:
              </Form.Label>
              <Col sm="10">
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

            <Button variant="secondary" type="submit" id="button-login-form">
              Crear Anuncio
            </Button>
          </Form>
        </Col>
        <Col lg={4} className="mt-5">
          <figure>
            {!isUploaded ? (
              <>
                <Image
                  width={200}
                  draggable={"false"}
                  src={profileIcon}
                  alt="UploadImage"
                />
              </>
            ) : (
              formValues.photos.map((photo) => {
                return (
                  <Image
                    key={photo.match(/([a-zA-Z0-9]+.jpg)/)[0]}
                    width={200}
                    draggable={"false"}
                    src={photo}
                    alt="UploadImage"
                  />
                );
              })
            )}
          </figure>
        </Col>
      </Row>
    </Container>
  );
}
