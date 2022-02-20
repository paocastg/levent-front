import React, { useState } from "react";
import { Button, FloatingLabel, Alert, Form } from "react-bootstrap";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

export default function EmailCard({ data }) {
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState();
  // let navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    mail: "",
    subject: "",
    body: "",
  });

  const handleInputChange = ({ target }) => {
    setFormValues((state) => ({ ...state, [target.name]: target.value }));
  };

  const handleForm = (e) => {
    e.preventDefault();

    const newEmail = {
      name: formValues.name,
      mail: formValues.mail,
      subject: formValues.subject,
      body: formValues.body,
      emailcompany: data.user.email,
    };

    axios
      .post(
        `${process.env.REACT_APP_BASE_API_URL}/api/v1/posts/sendemail`,
        newEmail
      )
      .then(({ data }) => {
        if (data.error) {
          setMessage(data.message);
          setAlert(data.error);
        } else {
          setMessage("se envio con éxito");
          setAlert(true);
          setFormValues({
            name: "",
            mail: "",
            subject: "",
            body: "",
          });
          // setTimeout(() => {
          //   navigate(`/categories`);
          // }, 1500);
        }
      });
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        {alert && (
          <Alert
            variant="success"
            onClose={() => {
              setAlert(false);
            }}
            dismissible
          >
            <p>{message}</p>
          </Alert>
        )}
        <form
          onSubmit={handleForm}
          noValidate
          autoComplete="off"
          className="justify-content-center text-center"
        >
          <h4>Solicitar Cotización</h4>

          <Form.Group>
            <FloatingLabel
              controlId="floatingInput1"
              label="Nombres y Apellidos"
              className="my-3"
            >
              <Form.Control
                type="text"
                name="name"
                onChange={handleInputChange}
                value={formValues.name}
                data-test-id="newusername-login-form"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput2"
              label="Email"
              className="my-3"
            >
              <Form.Control
                type="text"
                name="mail"
                value={formValues.mail}
                onChange={handleInputChange}
                data-test-id="email-login-form"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floating1"
              label="Asunto"
              className="my-3"
            >
              <Form.Control
                type="text"
                name="subject"
                value={formValues.subject}
                onChange={handleInputChange}
                data-test-id="password-login-form"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floating2"
              label="Mensaje "
              className="my-3"
            >
              <Form.Control
                as="textarea"
                rows={5}
                type="text"
                name="body"
                value={formValues.body}
                onChange={handleInputChange}
              />
            </FloatingLabel>
            <Button
              variant="secondary"
              type="submit"
              className="my-2 v-100"
              id="button-login-form"
            >
              Enviar Solicitud
            </Button>
          </Form.Group>
        </form>
      </div>
    </div>
  );
}
