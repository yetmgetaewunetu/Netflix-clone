import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Main from "../../Components/Main/Main";
import RowList from "../../Components/RowList/RowList/RowList";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SingleVideo from "../../Components/video/SingleVideo";
export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <div
        style={{
          flexGrow: "1",
        }}
      >
        <Router>
          <Routes>
            <Route path="/single/:id" element={<SingleVideo />} />
            <Route
              path="/"
              element={
                <>
                  <Main />
                  <RowList />{" "}
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
