import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const urlSubscriptions = "http://localhost:4000/subscriptions";
const urlMembers = "http://localhost:4000/members";

function Member(props) {
  const dispatch = useDispatch();
  const userOnline = useSelector((state) => state.userOnline);
  const movies = useSelector((state) => state.movies);

  const accessToken = sessionStorage["accessToken"];

  const [visibleDeleteMemberButton, setVisibleDeleteMemberButton] =
    useState(true);
  const [visibleEditMemberButton, setVisibleEditMemberButton] = useState(true);
  const [visibleMoviesWatched, setVisibleMoviesWatched] = useState(true);
  const [moviesDontWatched, setMoviesDontWatched] = useState([]);
  const [subscriptions, setSubscriptions] = useState();
  const [subscription, setSubscription] = useState({
    memberId: props.member._id,
    movies: [{ movieId: "", date: "" }]
  });


  useEffect(() => {
    const fetchData = async () => {
      userOnline.permissions.forEach((permission) => {
        if (permission === "Delete Subscriptions")
          setVisibleDeleteMemberButton(false);
        if (permission === "Update Subscriptions")
          setVisibleEditMemberButton(false);
      });
      const resp = await fetch(urlSubscriptions, {
        method: "GET",
        headers: {
          "access-token": accessToken,
        },
      });

      const data = await resp.json();
      setSubscriptions(data.subscriptions);
      dispatch({ type: "Laod_Subscriptions", payload: data.subscriptions });
    };
    fetchData();
  }, []);

  const deleteMember = async () => {

    props.setVisibleAllMembers(true);

    const resp = await fetch(`${urlMembers}/${props.member._id}`, {
      method: "DELETE",
    });

    props.setVisibleAllMembers(false);
  };

  const addSubscribe = async () => {

    const resp = await fetch(urlSubscriptions, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscription),
    });
  }

  return (
    <div>
      <h3>{props.member.name}</h3>
      Email: {props.member.email}
      <br />
      City: {props.member.city}
      <br />
      <button
        hidden={visibleEditMemberButton}
        onClick={() => {
          props.setVisibleEditMember(!props.visibleEditMember);
          dispatch({ type: "Send_Member", payload: props.member });
        }}
      >
        Edit
      </button>
      <button hidden={visibleDeleteMemberButton} onClick={deleteMember}>
        Delete
      </button>
      <br />
      <h3>Movies Watched</h3>
      <button onClick={() => setVisibleMoviesWatched(!visibleMoviesWatched)}>
        Subscribe to new movie
      </button>
      <div hidden={visibleMoviesWatched}>
        <h4>Add a new movie</h4>
        <select onChange={(e) => setSubscription({ ...subscription, movieId: e.target.value })}>
          {movies.map((movie) => (
            <option key={movie._id} value={movie.id}>
              {movie.name}
            </option>
          ))}
        </select>
        <input type="date" onChange={(e) => setSubscription({ ...subscription, date: e.target.value })}></input>
        <br />
        <button onClick={addSubscribe}>Subscribe</button>
      </div>

      <ul>
      </ul>
    </div>
  );
}

export default Member;
