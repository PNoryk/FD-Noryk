import { Card } from "@/components/card/Card.jsx";

export const Favorites = () => {
  let movies = [{}, {}]
  return (
    <div className="grid">
      {movies.length
        ? movies.map((movie) => (
            <Card movie={movie} key={movie.imdbId} />
          ))
        : null}
    </div>
  );
};
