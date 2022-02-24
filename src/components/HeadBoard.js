import React, { useState } from "react";
import axios from "axios";
import config from "../config";
import { Col, Button, Alert } from "react-bootstrap";
import {
  AiFillDelete,
  AiOutlineEnvironment,
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import useAuth from "../auth/useAuth";
import { useParams, useNavigate } from "react-router-dom";
import { getToken } from "../user/session";

export default function HeadBoard({ data }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);
  const [deletePost, setDeletePost] = useState(false);
  const auth = useAuth();
  const token = getToken();
  const url = `https://api.whatsapp.com/send?phone=${data.user?.number}&text=Hola,%20quisiera%20cotizar%20mi%20evento`;
  const urlFb = data.links.facebook;
  const urlIg = data.links.instagram;

  const handleDeletePost = () => {
    axios
      .delete(`${config.BASE_API_URL}/api/v1/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        if (data) {
          setDeletePost(true);
          setAlert(false);
          navigate("/myposts");
        }
      });
  };

  return (
    <>
      {alert && (
        <Alert
          variant="danger"
          onClose={() => {
            setAlert(false);
          }}
          dismissible
        >
          <p className="d-inline">Estás seguro de querer eliminar éste post?</p>
          <Button
            variant="danger"
            onClick={handleDeletePost}
            className="mx-3 d-inline"
          >
            Si
          </Button>
          <Button
            variant="success"
            onClick={() => setAlert(false)}
            className="mx-2 d-inline"
          >
            No
          </Button>
        </Alert>
      )}

      {deletePost && (
        <Alert
          variant="success"
          onClose={() => {
            setDeletePost(false);
          }}
          dismissible
        >
          <p>Éste post ha sido eliminado satisfactoriamente!</p>
        </Alert>
      )}
      <Col lg={6} md={12} xs={12}>
        <h2>
          {data.company}{" "}
          {auth.userLogin?.id === data.user?.id && (
            <Button variant="light" onClick={() => setAlert(true)}>
              <AiFillDelete />
            </Button>
          )}
        </h2>

        <div className="d-flex gap-5 py-2">
          <span>
            <strong> Categoria: </strong>
            {data.category}
          </span>
          <span>
            <AiOutlineEnvironment /> {data.ubication}
          </span>
        </div>

        <h6>
          <strong>Precio desde:</strong> S/
          <span className="badge rounded-pill bg-secondary m-1">
            {data.rate}
          </span>
        </h6>
      </Col>
      <Col>
        <p>
          <Button variant="light" href={url} target="_blank">
            <AiOutlineWhatsApp />
          </Button>{" "}
          <Button variant="light" href={urlFb} target="_blank">
            <AiOutlineFacebook />
          </Button>
          {"  "}
          <Button variant="light" href={urlIg} target="_blank">
            <AiOutlineInstagram />
          </Button>
        </p>
      </Col>
      <hr className="my-4" />
    </>
  );
}
