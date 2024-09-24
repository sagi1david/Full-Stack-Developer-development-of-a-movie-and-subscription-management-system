import { Box, Button, Card, Flex, Link, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const urlMovies = "http://localhost:4000/movies";
const userId = localStorage.getItem("userOnline");
const accessToken = sessionStorage["accessToken"];

function Movie(props) {
  const navigate = useNavigate();

  const [visibleDeleteMovieButton, setVisibleDeleteMovieButton] =
    useState(true);
  const [visibleEditMovieButton, setVisibleEditMovieButton] = useState(true);

  const users = useSelector((state) => state.users);
  const subscriptions = useSelector((state) => state.subscriptions);
  const members = useSelector((state) => state.members);

  const userOnline = users.find((user) => {
    return user.id === userId;
  });

  useEffect(() => {
    const fetchData = async () => {
      userOnline?.permissions.forEach((permission) => {
        if (permission === "Delete Movies") setVisibleDeleteMovieButton(true);
        if (permission === "Update Movies") setVisibleEditMovieButton(true);
      });
    };
    fetchData();
  }, []);

  const deleteMovie = async () => {
    const resp = await fetch(`${urlMovies}/${props.movie._id}`, {
      method: "DELETE",
      headers: {
        "x-access-token": accessToken,
      },
    });
  };

  return (
    <Box>
      <Card key={props.movie._id}>
        <Flex gap="3">
          <img
            src={props.movie.image}
            style={{
              width: "100px",
              height: "120px",
            }}
          />
          <Flex direction="column" gap="2">
            <Text as="div" size="2" weight="bold">
              {props.movie.name}, {props.movie.premiered.substring(0, 4)}
            </Text>
            <Text as="div" size="2" color="gray">
              Genres: <br />
              {props.movie.genres.join(", ")}
            </Text>
            <Text>
              Subscriptions watched
              <ul>
                {subscriptions.map((subscription) =>
                  subscription.movies.map((movie) => {
                    if (movie.movieId === props.movie._id) {
                      const member = members.find((member) => {
                        return member._id === subscription.memberId;
                      });
                      return (
                        <li key={movie._id}>
                          <a href={`/subscriptions/${subscription.memberId}`}>
                            {member?.name}
                          </a>
                          , {movie.date}
                        </li>
                      );
                    }

                    return null;
                  })
                )}
              </ul>
            </Text>
            <Flex gap="1">
              {visibleEditMovieButton && (
                <Button
                  onClick={() => {
                    navigate(`/editMovie/${props.movie._id}`);
                  }}
                >
                  Edit
                </Button>
              )}
              {visibleDeleteMovieButton && (
                <Button color="red" onClick={deleteMovie}>
                  Delete
                </Button>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
}

export default Movie;
