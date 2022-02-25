import React, { useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import axios from "axios";
import config from "../config";
import { getToken } from "../user/session";

function Payment({ idPost }) {
  const action = `${process.env.REACT_APP_BASE_API_URL}/api/v1/payment/create-checkout-session/${idPost}`;
  const token = getToken();

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      if (query.get("idPost")) {
        axios
          .post(
            `${config.BASE_API_URL}/api/v1/posts/paymentPost/${query.get(
              "idPost"
            )}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(({ data }) => {
            if (data) {
            }
          });
      }
    }

    if (query.get("canceled")) {
      // setMessage(
      //   "Order canceled -- continue to shop around and checkout when you're ready."
      // );
    }
  }, [token]);

  return (
    <Container>
      <Form action={action} method="POST">
        <Button variant="secondary" className="mt-2" type="submit">
          Publicitar
        </Button>
      </Form>
    </Container>
  );
}
export default Payment;
