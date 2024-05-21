import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const urlSubscriptions = "http://localhost:4000/subscriptions";

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

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(urlSubscriptions, {
        method: "GET",
        headers: {
          "x-access-token": accessToken,
        },
      });

      const data = await resp.json();

movies.map(movie => {
  data.subscriptions.find(subscription => movie.)
})
      

      dispatch({ type: "Laod_Subscriptions", payload: data.subscriptions });
    };
    fetchData();
  }, [visibleDeleteMemberButton]);

  const deleteMember = async () => {
    const urlMembers = "http://localhost:4000/members";

    props.setVisibleAllMembers(true);

    const resp = await fetch(`${urlMembers}/${props.member._id}`, {
      method: "DELETE",
    });

    props.setVisibleAllMembers(false);
  };

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
        <h3>Add a new movie</h3>
        <select></select>
        <option></option>
        <input type="date"></input>
        <button>Subscribe</button>
      </div>
      <ul>
        <li></li>
      </ul>
    </div>
  );
}

export default Member;
