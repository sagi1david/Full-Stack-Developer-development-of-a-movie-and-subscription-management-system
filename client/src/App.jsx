import { Routes, Route } from "react-router-dom";
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

const App = () => {
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
        <Route path="/editMember" element={<EditMember />} />
        <Route path="/editMovie" element={<EditMovie />} />
        <Route path="/editUser" element={<EditUser />} />
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/manageUsers" element={<ManageUsers />} />
        <Route path="/member" element={<Member />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
      </Routes>
    </>
  );
};

export default App;
