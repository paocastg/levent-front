import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51KWZiGCPhQu9FAfUNytrY6o5ldVKlbTY8lDEPjHnE1prLlwrgv4HxM3XADK8yfxOyHjhO0P9GhVvxQZXpcg04Hwt00cVi6shuK"
);

function PayForm({ dataPostId }) {
  const { id } = useParams();
  const selectedPost = dataPostId?.find((p) => p.id === id);
  return (
    <Container className="container-fluid my-4">
      <Row>
        <Row>
          <div className="mb-3 mt-5">
            <h2>Realizar Pago</h2>
          </div>

          <Col lg={6} md={12} xs={12}>
            <form className="card card-body">
              <img
                src="https://www.corsair.com/medias/sys_master/images/images/h80/hdd/9029904465950/-CH-9109011-ES-Gallery-K70-RGB-MK2-01.png"
                alt="Corsair Gaming Keyboard RGB"
                className="img-fluid"
              />
              <h3 className="text-center my-2">Price: 1$</h3>
            </form>
          </Col>

          <Col lg={6} md={12} xs={12}>
            <Elements stripe={stripePromise}>
              <div className="container p-6">
                <div>
                  <div>
                    <CheckoutForm dataId={selectedPost} />
                  </div>
                </div>
              </div>
            </Elements>
          </Col>
        </Row>
      </Row>
    </Container>
  );
}

export default PayForm;
