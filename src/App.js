import { useState, useEffect } from "react";
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PrivateRoute from "./pages/PrivateRoute";
import RedirectUser from "./pages/RedirectUser";
import AuthProvider from "./auth/AuthProvider";
import Categories from "./pages/Categories";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProfileUser from "./pages/ProfileUser";
import MyPosts from "./pages/MyPosts";
import CreateCard from "./pages/CreateCard";
import DetailCard from "./pages/DetailCard";

function App() {
  const [dataCategory, setDataCategory] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_API_URL}/api/v1/posts?limit=100`)
      .then((response) => {
        setDataCategory(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/categories"
            element={
              <Categories posts={dataCategory} setPosts={setDataCategory} />
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreateCard
                  posts={dataCategory}
                  setDataPost={setDataCategory}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectUser>
                <Login />
              </RedirectUser>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectUser>
                <SignUp />
              </RedirectUser>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <PrivateRoute>
                <ProfileUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/myposts"
            element={
              <PrivateRoute>
                <MyPosts />
              </PrivateRoute>
            }
          />
          <Route
            path="/post/:id"
            element={
              dataCategory.length && <DetailCard dataPost={dataCategory} />
            }
          />
        </Routes>

        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
