import { useState } from "react";

function addUser(props) {
  const urlUsers = "http://localhost:4000/users";

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    createdDate: "",
    sessionTimeOut: 0,
    permissions: [],
  });

  const [viewSubscriptions, setViewSubscriptions] = useState(false);
  const [createSubscriptions, setCreateSubscriptions] = useState(false);
  const [deleteSubscriptions, setDeleteSubscriptions] = useState(false);
  const [updateSubscriptions, setUpdateSubscriptions] = useState(false);
  const [viewMovies, setViewMovies] = useState(false);
  const [createMovies, setCreateMovies] = useState(false);
  const [deleteMovies, setDeleteMovies] = useState(false);
  const [updateMovies, setUpdateMovies] = useState(false);

  const addUser = async () => {
    if (viewSubscriptions)
      setUser({
        ...user,
        permissions: user.permissions.push("View Subscriptions"),
      });

    if (createSubscriptions)
      setUser({
        ...user,
        permissions: user.permissions.push(
          "View Subscriptions",
          "Create Subscriptions"
        ),
      });

    if (deleteSubscriptions)
      setUser({
        ...user,
        permissions: user.permissions.push(
          "View Subscriptions",
          "Delete Subscriptions"
        ),
      });

    if (updateSubscriptions)
      setUser({
        ...user,
        permissions: user.permissions.push(
          "View Subscriptions",
          "Update Subscriptions"
        ),
      });

    if (viewMovies)
      setUser({ ...user, permissions: user.permissions.push("View Movies") });

    if (createMovies)
      setUser({
        ...user,
        permissions: user.permissions.push("View Movies", "Create Movies"),
      });

    if (deleteMovies)
      setUser({
        ...user,
        permissions: user.permissions.push("View Movies", "Delete Movies"),
      });

    if (updateMovies)
      setUser({
        ...user,
        permissions: user.permissions.push("View Movies", "Update Movies"),
      });

    const resp1 = await fetch(urlUsers, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    props.setVisibleAddUser(!props.visibleAddUsre);
    props.setVisibleAllUsers(!props.visibleAllUsers);
  };

  return (
    <div>
      <h3>Add New User</h3>
      First Name:
      <input
        type="text"
        onInput={(e) => setUser({ ...user, firstName: e.target.value })}
        placeholder="First Name"
      />
      <br />
      Last Name:
      <input
        type="text"
        onInput={(e) => setUser({ ...user, lastName: e.target.value })}
        placeholder="Last Name"
      />
      <br />
      User Name:
      <input
        type="text"
        onInput={(e) => setUser({ ...user, userName: e.target.value })}
        placeholder="User Name"
      />
      <br />
      Session Time Out (Minutes):
      <input
        type="number"
        onInput={(e) => setUser({ ...user, sessionTimeOut: e.target.value })}
        placeholder="Session Time Out"
      />
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
      <button type="submit" onClick={addUser}>
        save
      </button>
      <button
        type="submit"
        onClick={() => props.setVisibleAddUser(!props.visibleAddUsre)}
      >
        cancel
      </button>
    </div>
  );
}

export default addUser;
