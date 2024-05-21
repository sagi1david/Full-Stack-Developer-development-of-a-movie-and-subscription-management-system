import { useEffect, useState } from "react";
import Movies from "./movies";
import Subscriptions from "./subscriptions";
import ManageUsers from "./manageUsers";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigator = useNavigate();
  const userOnline = useSelector((state) => state.userOnline);

  const [visibleMoviesButton, setVisibleMoviesButton] = useState(true);
  const [visibleSubscriptionsButton, setVisibleSubscriptionsButton] =
    useState(true);
  const [visibleManageUserButtons, setVisibleManageUsersButton] =
    useState(true);
  const [visibleMovies, setVisibleMovies] = useState(true);
  const [visibleSubscriptions, setVisibleSubscriptions] = useState(true);
  const [visibleManageUsers, setVisibleManageUsers] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      userOnline.permissions.forEach((permission) => {
        if (permission === "View Subscriptions")
          setVisibleSubscriptionsButton(false);
        if (permission === "View Movies") setVisibleMoviesButton(false);
      });
      if (userOnline.userName === "admin") setVisibleManageUsersButton(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <button
        hidden={visibleMoviesButton}
        onClick={() => {
          setVisibleMovies(!visibleMovies);
          if (!visibleSubscriptions)
            setVisibleSubscriptions(!visibleSubscriptions);
          if (!visibleManageUsers) setVisibleManageUsers(!visibleManageUsers);
        }}
      >
        Movies
      </button>
      <button
        hidden={visibleSubscriptionsButton}
        onClick={() => {
          setVisibleSubscriptions(!visibleSubscriptions);
          if (!visibleMovies) setVisibleMovies(!visibleMovies);
          if (!visibleManageUsers) setVisibleManageUsers(!visibleManageUsers);
        }}
      >
        Subscriptions
      </button>
      <button
        hidden={visibleManageUserButtons}
        onClick={() => {
          setVisibleManageUsers(!visibleManageUsers);
          if (!visibleMovies) setVisibleMovies(!visibleMovies);
          if (!visibleSubscriptions)
            setVisibleSubscriptions(!visibleSubscriptions);
        }}
      >
        User Management
      </button>
      <button onClick={() => navigator("/")}>Log Out</button>

      <div hidden={visibleMovies}>
        <Movies />
      </div>
      <div hidden={visibleSubscriptions}>
        <Subscriptions />
      </div>
      <div hidden={visibleManageUsers}>
        <ManageUsers />
      </div>
    </div>
  );
}

export default Main;
