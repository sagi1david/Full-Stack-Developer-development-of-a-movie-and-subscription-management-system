import { Box, Button, Card, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const urlMovies = "http://localhost:4000/movies";

function editMovie() {
  const navigate = useNavigate();
  const movies = useSelector((state) => state.movies);
  const movieId = useParams();

  const movie = movies.find((movie) => {
    return movie._id === movieId.movieId;
  });

  const [mov, setMovie] = useState({
    id: movie.id,
    name: movie.name,
    genres: movie.genres,
    image: movie.image,
    premiered: movie.premiered,
  });

  const update = async () => {
    const resp = await fetch(`${urlMovies}/${movie._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mov),
    });

    window.location.href = "http://localhost:5173/movies";
  };

  return (
    <>
      <h3>Edit Movie: {movie.name}</h3>
      <Box maxWidth="400px">
        <Card>
          <Text size="3">
            <b>Name: </b>
            <TextField.Root placeholder="Name" defaultValue={movie.name}>
              <TextField.Slot
                onInput={(e) => setMovie({ ...mov, name: e.target.value })}
              ></TextField.Slot>
            </TextField.Root>
            <b>Genres: </b>
            <TextField.Root placeholder="Genres" defaultValue={movie.genres}>
              <TextField.Slot
                onInput={(e) => setMovie({ ...mov, genres: e.target.value })}
              ></TextField.Slot>
            </TextField.Root>
            <b>Image url: </b>
            <TextField.Root placeholder="Image url" defaultValue={movie.image}>
              <TextField.Slot
                onInput={(e) => setMovie({ ...mov, image: e.target.value })}
              ></TextField.Slot>
            </TextField.Root>
            <b>Premiered: </b>
            <TextField.Root
              placeholder="Premiered"
              defaultValue={movie.premiered}
            >
              <TextField.Slot
                onInput={(e) => setMovie({ ...mov, premiered: e.target.value })}
              ></TextField.Slot>
            </TextField.Root>
            <Flex gap="1" mt="2">
              <Button type="submit" onClick={update}>
                update
              </Button>
              <Button type="submit" onClick={() => navigate("/movies")}>
                cancel
              </Button>
            </Flex>
          </Text>
        </Card>
      </Box>
    </>
  );
}

export default editMovie;
