import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Main from "../../Components/Main/Main";
import RowList from "../../Components/RowList/RowList/RowList";
import SingleVideo from "../../Components/video/SingleVideo";

import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <Header />
      <div className="main-content">
        <Router basename="/Netflix-clone">
          <Routes>
            <Route path="/single/:id" element={<SingleVideo />} />
            <Route
              path="/"
              element={
                <>
                  <Main />
                  <RowList />
                </>
              }
            />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}
