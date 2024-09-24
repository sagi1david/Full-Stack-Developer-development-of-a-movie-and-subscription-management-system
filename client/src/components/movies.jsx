import { Button, Flex, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddMovie from "./addMovie";
import AllMovies from "./allMovies";
import { useParams } from "react-router-dom";

const userId = localStorage.getItem("userOnline");

function movies() {
  const users = useSelector((state) => state.users);
  const movieId = useParams();

  const userOnline = users.find((user) => {
    return user.id === userId;
  });
  const [visibleAddMovieButton, setVisibleAddMovieButton] = useState(true);
  const [visibleAllMovies, setVisibleAllMovies] = useState(true);
  const [visibleAddMovie, setVisibleAddMovie] = useState(false);
  const [findMovie, setFindMovie] = useState([]);
  const [find, setFind] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (userOnline != "undefined") {
        userOnline?.permissions.forEach((permission) => {
          if (permission === "Create Movies") setVisibleAddMovieButton(false);
        });
      }
    };
    fetchData();
  }, [userOnline]);

  return (
    <>
      <h3>Movies</h3>

      <Flex gap="1" mb="3">
        <Button
          onClick={() => {
            setVisibleAllMovies(!visibleAllMovies);
            if (visibleAddMovie) setVisibleAddMovie(!visibleAddMovie);
          }}
        >
          All Movies
        </Button>
        <div hidden={visibleAddMovieButton}>
          <Button
            onClick={() => {
              setVisibleAddMovie(!visibleAddMovie);
              if (visibleAllMovies) setVisibleAllMovies(!visibleAllMovies);
            }}
          >
            Add Movie
          </Button>
        </div>

        <b>Find movie: </b>

        <TextField.Root
          type="text"
          onChange={(e) => setFindMovie(e.target.value)}
        ></TextField.Root>
        <Button type="button" onClick={() => setFind(findMovie)}>
          Find
        </Button>
      </Flex>

      {visibleAllMovies && <AllMovies findMovie={find} movieId={movieId} />}
      {visibleAddMovie && (
        <AddMovie
          setVisibleAddMovie={setVisibleAddMovie}
          visibleAddMovie={visibleAddMovie}
          setVisibleAllMovies={setVisibleAllMovies}
          visibleAllMovies={visibleAllMovies}
        />
      )}
    </>
  );
}

export default movies;
