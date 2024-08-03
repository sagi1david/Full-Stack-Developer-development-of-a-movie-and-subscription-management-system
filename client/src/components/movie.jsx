import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const urlMovies = "http://localhost:4000/movies";

function Movie(props) {
  const dispatch = useDispatch();
  const userOnline = useSelector((state) => state.userOnline);

  const [visibleDeleteMovieButton, setVisibleDeleteMovieButton] =
    useState(true);
  const [visibleEditMovieButton, setVisibleEditMovieButton] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      userOnline.permissions.forEach((permission) => {
        if (permission === "Delete Movies") setVisibleDeleteMovieButton(false);
        if (permission === "Update Movies") setVisibleEditMovieButton(false);
      });
    };
    fetchData();
  }, []);

  const deleteMovie = async () => {
    props.setVisibleAllMovies(true);

    const resp = await fetch(`${urlMovies}/${props.movie._id}`, {
      method: "DELETE",
    });

    props.setVisibleAllMovies(false);
  };

  return (
    <>
      <Box maxWidth="350px" mb="2">
        <Card>
          <Flex gap="3" align="center">
            <img
              src={props.movie.image}
              style={{
                width: "100px",
                height: "120px",
              }}
            />
            <Box>
              <Text as="div" size="2" weight="bold">
                {props.movie.name} ,{props.movie.premiered.substring(0, 4)}{" "}
              </Text>
              <Text as="div" size="2" color="gray">
                Genres: <br />
                {props.movie.genres.map((genre) => {
                  return genre + ",";
                })}
              </Text>
              <Flex gap="1">
                <Button
                  hidden={visibleEditMovieButton}
                  onClick={() => {
                    props.setVisibleEditMovie(!props.visibleEditMovie);
                    dispatch({ type: "Send_Movie", payload: props.movie });
                  }}
                >
                  Edit
                </Button>
                <Button hidden={visibleDeleteMovieButton} onClick={deleteMovie}>
                  Delete
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Card>
      </Box>
    </>
  );
}

export default Movie;
