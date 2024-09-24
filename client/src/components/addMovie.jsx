import { Box, Button, Card, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const urlMovies = "http://localhost:4000/movies";

function addMovie() {

  const navigate = useNavigate();


  const [movie, setMovie] = useState({
    name: "",
    genres: [],
    image: "",
    premiered: "",
  });

  const addMovie = async () => {
    const resp1 = await fetch(urlMovies, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    });

    navigate('/movies')
  };

  return (
    <>
      <h3>Add new Movie</h3>
      <Box maxWidth="350px">
        <Card>
          <Text size="3">
            <b>Name: </b>
            <TextField.Root placeholder="Name">
              <TextField.Slot
                onInput={(e) => setMovie({ ...movie, name: e.target.value })}
              ></TextField.Slot>
            </TextField.Root>
            <b>Genres: </b>
            <TextField.Root placeholder="Genres">
              <TextField.Slot
                onInput={(e) => setMovie({ ...movie, genres: e.target.value })}
              ></TextField.Slot>
            </TextField.Root>
            <b>Image url: </b>
            <TextField.Root placeholder="Image url">
              <TextField.Slot
                onInput={(e) => setMovie({ ...movie, image: e.target.value })}
              ></TextField.Slot>
            </TextField.Root>
            <b>Premiered: </b>
          </Text>
          <br />
          <Flex gap="1">
            <Button type="submit" onClick={addMovie}>
              Save
            </Button>
            <Button
              type="submit"
              onClick={() => navigate('/movies')}
            >
              Cancel
            </Button>
          </Flex>
        </Card>
      </Box>
    </>
  );
}

export default addMovie;
