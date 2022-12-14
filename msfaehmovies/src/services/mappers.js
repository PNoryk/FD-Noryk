export const transformSearchMovie = (searchMovies) => {
  return searchMovies.map((searchMovie) => {
    return {
      title: searchMovie.Title,
      year: searchMovie.Year,
      imdbId: searchMovie.imdbID,
      type: searchMovie.Type,
      poster: searchMovie.Poster,
    };
  });
};
