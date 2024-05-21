import { useSelector } from "react-redux";
import Movie from "./movie";

function AllMovies(props) {
  const movies = useSelector((state) => state.movies);

  return (
    <div>
      {movies.map((movie) => (
        <Movie
          movie={movie}
          key={movie._id}
          setVisibleEditMovie={props.setVisibleEditMovie}
          visibleEditMovie={props.visibleEditMovie}
          setVisibleAllMovies={props.setVisibleAllMovies}
        />
      ))}
    </div>
  );
}

export default AllMovies;
