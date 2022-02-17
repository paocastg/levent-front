import React from "react";
import { Container, Alert, Button, FloatingLabel, Form } from "react-bootstrap";

export default function EmailCard() {
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form
          onSubmit=""
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
                type="name"
                // onChange={handleNewUsername}
                data-test-id="newusername-login-form"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput2"
              label="Email"
              className="my-3"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                // onChange={handleEmail}
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
                placeholder="Solicito cotización"
                // onChange={handleNewPassword}
                data-test-id="password-login-form"
              />
            </FloatingLabel>
            <FloatingLabel controlId="floating2" label="Mensaje ">
              <Form.Control
                as="textarea"
                rows={3}
                type="text"
                // onChange={handleInputChange}
              />
            </FloatingLabel>
            <Button
              variant="secondary"
              type="submit"
              className="my-4 v-100"
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
