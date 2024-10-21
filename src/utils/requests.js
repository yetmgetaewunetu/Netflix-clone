const API_KEY = "ada6e4c7b4f1f5b110a217a26add93a2";
const requests = {
  fetchtrending: `/trending/movie/day?language=en-US&api_key=ada6e4c7b4f1f5b110a217a26add93a2`,
  fetchNetflixOriginals: `/discover/tv?with_networks=213&api_key=${API_KEY}`,
  fetchTopRatedMovies: `/movie/top_rated?language=en-US&api_key=${API_KEY}`,
  fetchActionMovies: `/discover/movie?with_genres=28&api_key=${API_KEY}`,
  fetchComedyMovies: `/discover/movie?with_genres=35&api_key=${API_KEY}`,
  fetchHorrorMovies: `/discover/movie?with_genres=27&api_key=${API_KEY}`,
  fetchRomanticMovies: `/discover/movie?with_genres=10749&api_key=${API_KEY}`,
  fetchDocumentaries: `/discover/movie?with_genres=99&api_key=${API_KEY}`,
  fetchTvShow: `tv/popular?language=en-US&api_key=${API_KEY}&page=1`,
};

export default requests;
