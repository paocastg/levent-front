import React, { useEffect, useState } from "react";
import { Row, Container } from "react-bootstrap";
import axios from "axios";
import MyPostsCard from "../components/MyPostsCard";
import useAuth from "../auth/useAuth";
import { getToken } from "../user/session";

export default function MyPosts() {
  const auth = useAuth();
  const [postById, setPostById] = useState([]);
  const token = getToken();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_API_URL}/api/v1/users/myposts/${auth.userLogin.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setPostById(response.data);
      });
  }, [auth, token]);

  return (
    <Container
      className="my-5"
      style={{
        minHeight: "500px",
      }}
    >
      <h2 className="pt-4">Mis Anuncios</h2>
      {postById.length ? (
        <Row className="align-items-center my-4 sm-8" lg={12} md={12} xs={12}>
          {postById.map(
            ({ id, company, ubication, category, rate, photos, published }) => {
              return (
                <MyPostsCard
                  key={id}
                  id={id}
                  company={company}
                  photos={photos}
                  ubication={ubication}
                  category={category}
                  rate={rate}
                  published={published}
                />
              );
            }
          )}
        </Row>
      ) : (
        <div>No se encontraron resultados</div>
      )}
    </Container>
  );
}
