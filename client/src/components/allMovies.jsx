import { Grid } from "@radix-ui/themes";
import { useSelector } from "react-redux";
import Movie from "./movie";

function AllMovies(props) {
  const movies = useSelector((state) => state.movies);

  return (
    <Grid columns="2" gap="3" maxWidth="850px">
      {props.movieId.movieId &&
        movies
          .filter((movie) => movie._id.includes(props.movieId.movieId))
          .map((movie) => <Movie movie={movie} key={movie._id} />)}
      {!props.movieId.movieId &&
        movies
          .filter((movie) => movie.name.toLowerCase().includes(props.findMovie))
          .map((movie) => <Movie movie={movie} key={movie._id} />)}
    </Grid>
  );
}

export default AllMovies;
