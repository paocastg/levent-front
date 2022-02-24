import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Form,
  Button,
  Container,
  Alert,
  Image,
} from "react-bootstrap";
import profileIcon from "../assets/blank-profile.png";
import useAuth from "../auth/useAuth";
import { getToken } from "../user/session";
import config from "../config";

export default function ProfileUser() {
  const auth = useAuth();
  const token = getToken();
  const [formValues, setFormValues] = useState({
    name: "",
    number: "",
    bio: "",
    photo: "",
  });
  const [alert, setAlert] = useState();

  useEffect(() => {
    if (token) {
      axios
        .get(`${process.env.REACT_APP_BASE_API_URL}/api/v1/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setFormValues(response.data);
        });
    }
  }, [token]);

  const handleInputChange = ({ target }) => {
    setFormValues((state) => ({ ...state, [target.name]: target.value }));
  };

  const handlePhotoChange = ({ target }) => {
    const formData = new FormData();
    let file = target.files[0];
    formData.append("file", file);
    formData.append("upload_preset", config.CLOUDINARY_UPLOAD_PRESET);
    axios.post(config.CLOUDINARY_UPLOAD_URL, formData).then((response) => {
      setFormValues((previousFormValues) => ({
        ...previousFormValues,
        photo: response.data.url,
      }));
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const updatedProfile = {
      name: formValues.name,
      number: formValues.number,
      bio: formValues.bio,
      photo: formValues.photo,
    };

    axios
      .put(
        `${process.env.REACT_APP_BASE_API_URL}/api/v1/users/profile`,
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setAlert(true);
      });
  };
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <Form onSubmit={handleSubmitForm}>
            {alert && (
              <Alert
                variant="success"
                onClose={() => {
                  setAlert(false);
                }}
                dismissible
              >
                <p>El usuario se ha guardado exitosamente</p>
              </Alert>
            )}
            <span className="text-center my-2">
              <h2>{auth.userLogin.username}</h2>
            </span>

            <br />

            <Row>
              <Col md={{ span: 2, offset: 1 }}>
                <figure>
                  {!formValues.photo ? (
                    <>
                      <Image
                        className="author-thumb"
                        style={{
                          width: "200px",
                          height: "200px",
                          float: "left",
                          marginright: "13px",
                        }}
                        draggable={"false"}
                        src={profileIcon}
                        alt="UploadImage"
                        roundedCircle
                      />

                      <Form.Group as={Row} className="mb-3">
                        <input
                          type="file"
                          name="photo"
                          accept=".jpg,.jpeg,.gif,.png"
                          onChange={handlePhotoChange}
                        />
                      </Form.Group>
                    </>
                  ) : (
                    <Image
                      className="author-thumb"
                      style={{
                        width: "200px",
                        height: "200px",
                        float: "left",
                        marginright: "13px",
                      }}
                      draggable={"false"}
                      src={formValues.photo}
                      alt="UploadImage"
                      roundedCircle
                    />
                  )}
                </figure>
              </Col>
              <Col md={{ span: 6, offset: 1 }}>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Persona de contacto:
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      value={formValues.name}
                      onChange={handleInputChange}
                      type="text"
                      name="name"
                      data-test-id="name-profile-form"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Correo:
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control value={auth.userLogin.email} disabled />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Teléfono:
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      value={formValues.number}
                      onChange={handleInputChange}
                      type="text"
                      name="number"
                      placeholder="Porfavor agregar el indicativo segun el País y el numero todo junto"
                      data-test-id="telephone-profile-form"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="4">
                    Describe tu empresa:
                  </Form.Label>
                  <Col sm="8">
                    <Form.Control
                      value={formValues.bio}
                      as="textarea"
                      rows={3}
                      onChange={handleInputChange}
                      type="text"
                      name="bio"
                      data-test-id="descripCompany-profile-form"
                    />
                  </Col>
                </Form.Group>
                <Button
                  className="btn btn-dark mb-6"
                  variant="primary"
                  type="submit"
                  id="profileupdate-button"
                >
                  Guardar
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
