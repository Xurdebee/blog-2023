import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import NewPost from "../pages/NewPost";
import Post from "../pages/Post";
import Header from "../components/Header/HeaderBar";
import Footer from "../components/Footer/Footer";

const App = () => {
  return (
    <BrowserRouter>
        <Header />
      <div className="mb-5 mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:post_id" element={<Post />} />
          <Route path="/new-post" element={<NewPost />} />
        </Routes>
      </div>
      <Footer />

    </BrowserRouter>
  );
};

export default App;
