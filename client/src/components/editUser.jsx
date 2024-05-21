import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function editUser(props) {
  const userState = useSelector((state) => state.user);

  const [user, setUser] = useState({});

  const [viewSubscriptions, setViewSubscriptions] = useState(false);
  const [createSubscriptions, setCreateSubscriptions] = useState(false);
  const [deleteSubscriptions, setDeleteSubscriptions] = useState(false);
  const [updateSubscriptions, setUpdateSubscriptions] = useState(false);
  const [viewMovies, setViewMovies] = useState(false);
  const [createMovies, setCreateMovies] = useState(false);
  const [deleteMovies, setDeleteMovies] = useState(false);
  const [updateMovies, setUpdateMovies] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setUser({});

      setViewSubscriptions(false);
      setCreateSubscriptions(false);
      setDeleteSubscriptions(false);
      setUpdateSubscriptions(false);
      setViewMovies(false);
      setCreateMovies(false);
      setDeleteMovies(false);
      setUpdateMovies(false);

      if (userState.id !== undefined) {
        setUser({
          id: userState.id,
          firstName: userState.firstName,
          lastName: userState.lastName,
          userName: userState.userName,
          createdDate: userState.createdDate,
          sessionTimeOut: userState.sessionTimeOut,
          permissions: userState.permissions,
        });

        await userState.permissions.map((permission) => {
          if (permission === "View Subscriptions")
            setViewSubscriptions(!viewSubscriptions);

          if (permission === "Create Subscriptions")
            setCreateSubscriptions(!createSubscriptions);

          if (permission === "Delete Subscriptions")
            setDeleteSubscriptions(!deleteSubscriptions);

          if (permission === "Update Subscriptions")
            setUpdateSubscriptions(!updateSubscriptions);

          if (permission === "View Movies") setViewMovies(!viewMovies);

          if (permission === "Create Movies") setCreateMovies(!createMovies);

          if (permission === "Delete Movies") setDeleteMovies(!deleteMovies);

          if (permission === "Update Movies") setUpdateMovies(!updateMovies);
        });
      }
    };
    fetchData();
  }, [userState]);

  const update = async () => {
    const urlUsers = "http://localhost:4000/users";

    const resp = await fetch(`${urlUsers}/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    props.setVisibleEditUser(!props.visibleEditUser);
  };

  return (
    <div>
      <h3>
        Edit User: {userState.firstName} {userState.lastName}
      </h3>
      First Name:
      <input
        type="text"
        onInput={(e) => setUser({ ...user, firstName: e.target.value })}
        defaultValue={userState.firstName}
      />
      <br />
      Last Name:
      <input
        type="text"
        onInput={(e) => setUser({ ...user, lastName: e.target.value })}
        defaultValue={userState.lastName}
      />
      <br />
      User Name:
      <input
        type="text"
        onInput={(e) => setUser({ ...user, userName: e.target.value })}
        defaultValue={userState.userName}
      />
      <br />
      Session Time Out (Minutes):
      <input
        type="number"
        onInput={(e) => setUser({ ...user, sessionTimeOut: e.target.value })}
        defaultValue={userState.sessionTimeOut}
      />
      <br />
      Created data: {userState.createdDate}
      <br />
      Permissions:
      <br />
      <input
        type="checkbox"
        checked={viewSubscriptions}
        onChange={() => setViewSubscriptions(!viewSubscriptions)}
      />
      <label for="View Subscriptions"> View Subscriptions</label>
      <br />
      <input
        type="checkbox"
        checked={createSubscriptions}
        onChange={() => setCreateSubscriptions(!createSubscriptions)}
      />
      <label for="Create Subscriptions">Create Subscriptions</label>
      <br />
      <input
        type="checkbox"
        checked={deleteSubscriptions}
        onChange={() => setDeleteSubscriptions(!deleteSubscriptions)}
      />
      <label for="Delete Subscriptions">Delete Subscriptions</label>
      <br />
      <input
        type="checkbox"
        checked={updateSubscriptions}
        onChange={() => setUpdateSubscriptions(!updateSubscriptions)}
      />
      <label for="Update Subscriptions">Update Subscriptions</label>
      <br />
      <input
        type="checkbox"
        checked={viewMovies}
        onChange={() => setViewMovies(!viewMovies)}
      />
      <label for="View Movies">View Movies</label>
      <br />
      <input
        type="checkbox"
        checked={createMovies}
        onChange={() => setCreateMovies(!createMovies)}
      />
      <label for="Create Movies">Create Movies</label>
      <br />
      <input
        type="checkbox"
        checked={deleteMovies}
        onChange={() => setDeleteMovies(!deleteMovies)}
      />
      <label for="Delete Movies">Delete Movies</label>
      <br />
      <input
        type="checkbox"
        checked={updateMovies}
        onChange={() => setUpdateMovies(!updateMovies)}
      />
      <label for="Update Movies">Update Movies</label>
      <br />
      <br />
      <button type="submit" onClick={update}>
        update
      </button>
      <button
        type="submit"
        onClick={() => props.setVisibleEditUser(!props.visibleEditUser)}
      >
        cancel
      </button>
    </div>
  );
}

export default editUser;
