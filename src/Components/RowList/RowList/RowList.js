import React from "react";
import Row from "../Row/Row";
import requests from "../../../utils/requests";
export default function RowList() {
  return (
    <div>
      <Row title="Trending" fetchUrl={requests.fetchtrending} />
      <Row
        title="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
      />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Action" fetchUrl={requests.fetchActionMovies} />
      <Row title="Documentary" fetchUrl={requests.fetchDocumentaries} />
      <Row title="Horror" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romantic" fetchUrl={requests.fetchRomanticMovies} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRatedMovies} />
      <Row title="Tv Show" fetchUrl={requests.fetchTvShow} />
    </div>
  );
}
