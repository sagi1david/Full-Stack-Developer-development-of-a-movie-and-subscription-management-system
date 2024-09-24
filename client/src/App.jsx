import "@radix-ui/themes/styles.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AddMember from "./components/addMember";
import AddMovie from "./components/addMovie";
import AddUser from "./components/addUser";
import AllMembers from "./components/allMembers";
import AllMovies from "./components/allMovies";
import AllUsers from "./components/allUsers";
import CreateAccount from "./components/createAccount";
import EditMember from "./components/editMember";
import EditMovie from "./components/editMovie";
import EditUser from "./components/editUser";
import Login from "./components/Login";
import Main from "./components/main";
import ManageUsers from "./components/manageUsers";
import Member from "./components/member";
import Movie from "./components/movie";
import Movies from "./components/movies";
import Subscriptions from "./components/subscriptions";

const urlUsers = "http://localhost:4000/users";
const urlMovies = "http://localhost:4000/movies";
const urlMembers = "http://localhost:4000/members";
const urlSubscriptions = "http://localhost:4000/subscriptions";

const accessToken = sessionStorage["accessToken"];
const userId = localStorage.getItem("userOnline");

const App = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);

  const user = users.find((u) => {
    return u.id === userId;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(urlUsers, {
          method: "GET",
          headers: {
            "x-access-token": accessToken,
          },
        });

        const data = await resp.json();

        dispatch({ type: "Laod_Users", payload: data.users });

        const resp1 = await fetch(urlMovies, {
          method: "GET",
          headers: {
            "x-access-token": accessToken,
          },
        });

        const data1 = await resp1.json();

        dispatch({ type: "Laod_Movies", payload: data1.movies });

        const resp2 = await fetch(urlMembers, {
          method: "GET",
          headers: {
            "x-access-token": accessToken,
          },
        });

        const data2 = await resp2.json();

        dispatch({ type: "Laod_Members", payload: data2.members });

        const resp3 = await fetch(urlSubscriptions, {
          method: "GET",
          headers: {
            "x-access-token": accessToken,
          },
        });

        const data3 = await resp3.json();

        dispatch({ type: "Laod_Subscriptions", payload: data3.subscriptions });
      } catch (error) {
      }
    };
    fetchData();
  }, []);

  const logoutUser = () => {
    window.location.href = "http://localhost:5173/login";
    userDisconnect(user.userName);
    sessionStorage["userOnline"] = undefined;
  };

  const getUserData = (username) => {
    return JSON.parse(localStorage.getItem(username));
  };

  const updateUserConnection = (username, remainingTime) => {
    const userData = {
      lastConnection: Date.now(),
      connectionTime: remainingTime,
    };
    localStorage.setItem(username, JSON.stringify(userData));
  };

  const userDisconnect = (username) => {
    const userData = getUserData(username);
    if (userData) {
      const remainingTime =
        userData.connectionTime - (Date.now() - userData.lastConnection);

      updateUserConnection(username, remainingTime);
    }
  };

  const checkSession = () => {
    const userData = getUserData(user?.userName);

    if (userData) {
      const { lastConnection, connectionTime } = userData;
      const now = Date.now();

      if (now - lastConnection >= connectionTime) logoutUser();
    }
  };

  setInterval(checkSession, 5000);

  return (
    <>
      <h1>Movies - Subscriptions Web Site</h1>

      <Routes>
        <Route path="/addMember" element={<AddMember />} />
        <Route path="/addMovie" element={<AddMovie />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/allMembers" element={<AllMembers />} />
        <Route path="/allMovies" element={<AllMovies />} />
        <Route path="/allUsers" element={<AllUsers />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/editMember/:memberId" element={<EditMember />} />
        <Route path="/editMovie/:movieId" element={<EditMovie />} />
        <Route path="/editUser/:userId" element={<EditUser />} />
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/manageUsers" element={<ManageUsers />} />
        <Route path="/member" element={<Member />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movies/:movieId?" element={<Movies />} />
        <Route path="/subscriptions/:memberId?" element={<Subscriptions />} />
      </Routes>
    </>
  );
};

export default App;
