export const transformMovies = (movies) => {
  return movies.map((movie) => {
    return {
      title: movie.Title,
      year: movie.Year,
      imdbId: movie.imdbID,
      type: movie.Type,
      poster: movie.Poster,
    };
  });
};
