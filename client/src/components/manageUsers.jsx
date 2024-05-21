import { useEffect, useState } from "react";
import AllUsers from "./allUsers";
import AddUser from "./addUser";
import EditUser from "./editUser";
import { useDispatch } from "react-redux";

const urlUsers = "http://localhost:4000/users";

function manageUsers() {
  const [visibleAllUsers, setVisibleAllUsers] = useState(true);
  const [visibleAddUser, setVisibleAddUser] = useState(true);
  const [visibleEditUser, setVisibleEditUser] = useState(true);

  const accessToken = sessionStorage["accessToken"];

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(urlUsers, {
        method: "GET",
        headers: {
          "x-access-token": accessToken,
        },
      });

      const data = await resp.json();

      dispatch({ type: "Laod_Users", payload: data.users });
    };
    fetchData();
  }, [visibleAllUsers, visibleAddUser, visibleEditUser]);

  return (
    <div>
      <h3>Users</h3>
      <div hidden={!visibleEditUser}>
        <button
          onClick={() => {
            setVisibleAllUsers(!visibleAllUsers);
            if (!visibleAddUser) setVisibleAddUser(!visibleAddUser);
          }}
        >
          All Users
        </button>
        <button
          onClick={() => {
            setVisibleAddUser(!visibleAddUser);
            if (!visibleAllUsers) setVisibleAllUsers(!visibleAllUsers);
          }}
        >
          Add User
        </button>
        <div hidden={visibleAllUsers}>
          <br />
          <AllUsers
            setVisibleEditUser={setVisibleEditUser}
            visibleEditUser={visibleEditUser}
            setVisibleAllUsers={setVisibleAllUsers}
          />
        </div>
        <div hidden={visibleAddUser}>
          <AddUser
            setVisibleAddUser={setVisibleAddUser}
            visibleAddUser={visibleAddUser}
            setVisibleAllUsers={setVisibleAllUsers}
            visibleAllUsers={visibleAllUsers}
          />
        </div>
      </div>
      <div hidden={visibleEditUser}>
        <EditUser
          setVisibleEditUser={setVisibleEditUser}
          visibleEditUser={visibleEditUser}
        />
      </div>
    </div>
  );
}

export default manageUsers;
