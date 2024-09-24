import { Box, Button, Card, Flex, Link, Select, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const urlSubscriptions = "http://localhost:4000/subscriptions";
const urlMembers = "http://localhost:4000/members";
const accessToken = sessionStorage["accessToken"];
const userId = localStorage.getItem("userOnline");

function Member(props) {
  const navigate = useNavigate();

  const movies = useSelector((state) => state.movies);
  const subscriptions = useSelector((state) => state.subscriptions);
  const users = useSelector((state) => state.users);

  const userOnline = users.find((user) => {
    return user.id === userId;
  });

  const subscription = subscriptions.find((subscription) => {
    return subscription.memberId === props.member._id;
  });

  const [visibleDeleteMemberButton, setVisibleDeleteMemberButton] =
    useState(true);
  const [visibleEditMemberButton, setVisibleEditMemberButton] = useState(true);
  const [visibleMoviesWatched, setVisibleMoviesWatched] = useState(true);
  const [movie, setMovie] = useState({
    movieId: "",
    name: "",
    date: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      userOnline.permissions.forEach((permission) => {
        if (permission === "Delete Subscriptions")
          setVisibleDeleteMemberButton(false);
        if (permission === "Update Subscriptions")
          setVisibleEditMemberButton(false);
      });
    };
    fetchData();
  }, []);

  const deleteMember = async () => {
    const resp = await fetch(`${urlMembers}/${props.member._id}`, {
      method: "DELETE",
    });
  };

  const addSubscribe = async () => {
    if (subscription === undefined) {
      const addSubscribe = {
        memberId: props.member._id,
        movies: [movie],
      };

      const resp = await fetch(urlSubscriptions, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addSubscribe),
      });
    } else {
      console.log(movie);

      subscription.movies.push(movie);

      const resp = await fetch(`${urlSubscriptions}/${subscription._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      });
    }

    setVisibleMoviesWatched(true);
  };

  return (
    <>
      <Box maxWidth="400px" mb="2">
        <Card>
          <Flex gap="3" align="center" justify="between">
            <Text size="4">
              <b>{props.member.name}</b>
              <br />
              <Text size="3">
                <b>Email: </b>
                {props.member.email}
                <br />
                <b>City: </b>
                {props.member.city}
              </Text>
            </Text>

            <Flex gap="1">
              <div hidden={visibleEditMemberButton}>
                <Button
                  onClick={() => {
                    navigate(`/editMember/${props.member._id}`);
                  }}
                >
                  Edit
                </Button>
              </div>
              <div hidden={visibleDeleteMemberButton}>
                <Button color="red" onClick={deleteMember}>
                  Delete
                </Button>
              </div>
            </Flex>
          </Flex>

          <h3>Movies Watched</h3>
          <ul>
            {subscription?.movies.map((movie) => {
              return (
                <li key={movie._id}>
                  <a href={`/movies/${movie.movieId}`}>{movie.name}</a>,{" "}
                  {movie.date}
                </li>
              );
            })}
          </ul>
          <Button
            onClick={() => setVisibleMoviesWatched(!visibleMoviesWatched)}
          >
            Subscribe to new movie
          </Button>
          <div hidden={visibleMoviesWatched}>
            <h4>Add a new movie</h4>
            <Flex justify="center" direction="column" gap="2" maxWidth="150px">
              <Select.Root>
                <Select.Trigger placeholder="List of movies" />
                <Select.Content>
                  {movies.map((mov) => {
                    const isSubscribed = subscription?.movies.some(
                      (movi) => mov._id === movi.movieId
                    );
                    if (!isSubscribed) {
                      return (
                        <Select.Item
                          onClick={() =>
                            setMovie({
                              ...movie,
                              movieId: mov._id,
                              name: mov.name,
                            })
                          }
                          key={mov._id}
                          value={mov.name}
                        >
                          {mov.name}
                        </Select.Item>
                      );
                    }
                    return null;
                  })}
                </Select.Content>
              </Select.Root>

              <input
                type="date"
                onChange={(e) => setMovie({ ...movie, date: e.target.value })}
              ></input>
              <Button onClick={addSubscribe}>Subscribe</Button>
            </Flex>
          </div>

          <ul></ul>
        </Card>
      </Box>
    </>
  );
}

export default Member;
