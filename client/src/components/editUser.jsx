import {
  Box,
  Button,
  Card,
  CheckboxGroup,
  Flex,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const urlUsers = "http://localhost:4000/users";

function editUser() {
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  const userId = useParams();

  const temp = users.find((user) => {
    return user.id === userId.userId;
  });

  const [user, setUser] = useState({
    firstName: temp.firstName,
    lastName: temp.lastName,
    userName: temp.userName,
    createdDate: temp.createdDate,
    sessionTimeOut: temp.sessionTimeOut,
    permissions: temp.permissions,
  });

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
      setViewSubscriptions(false);
      setCreateSubscriptions(false);
      setDeleteSubscriptions(false);
      setUpdateSubscriptions(false);
      setViewMovies(false);
      setCreateMovies(false);
      setDeleteMovies(false);
      setUpdateMovies(false);

      await user.permissions.map((permission) => {
        if (permission === "View Subscriptions") setViewSubscriptions(true);

        if (permission === "Create Subscriptions") setCreateSubscriptions(true);

        if (permission === "Delete Subscriptions") setDeleteSubscriptions(true);

        if (permission === "Update Subscriptions") setUpdateSubscriptions(true);

        if (permission === "View Movies") setViewMovies(true);

        if (permission === "Create Movies") setCreateMovies(true);

        if (permission === "Delete Movies") setDeleteMovies(true);

        if (permission === "Update Movies") setUpdateMovies(true);
      });
    };

    fetchData();
  }, []);

  const update = async () => {
    const permissions = [];

    if (
      viewSubscriptions &&
      !createSubscriptions &&
      !deleteSubscriptions &&
      !updateSubscriptions
    )
      permissions.push("View Subscriptions");

    if (createSubscriptions)
      if (
        permissions.find(
          (permission) => permission === "View Subscriptions"
        ) !== "View Subscriptions"
      ) {
        permissions.push("View Subscriptions");
        setViewSubscriptions(!viewSubscriptions);
      }
    permissions.push("Create Subscriptions");

    if (deleteSubscriptions) {
      if (
        permissions.find(
          (permission) => permission === "View Subscriptions"
        ) !== "View Subscriptions"
      ) {
        permissions.push("View Subscriptions");
        setViewSubscriptions(!viewSubscriptions);
      }
      permissions.push("Delete Subscriptions");
    }

    if (updateSubscriptions) {
      if (
        permissions.find(
          (permission) => permission === "View Subscriptions"
        ) !== "View Subscriptions"
      ) {
        permissions.push("View Subscriptions");
        setViewSubscriptions(!viewSubscriptions);
      }
      permissions.push("Update Subscriptions");
    }

    if (viewMovies && !createMovies && !deleteMovies && !updateMovies)
      permissions.push("View Movies");

    if (createMovies) {
      if (
        permissions.find((permission) => permission === "View Movies") !==
        "View Movies"
      ) {
        permissions.push("View Movies");
        setViewMovies(!viewMovies);
      }
      permissions.push("Create Movies");
    }

    if (deleteMovies) {
      if (
        permissions.find((permission) => permission === "View Movies") !==
        "View Movies"
      ) {
        permissions.push("View Movies");
        setViewMovies(!viewMovies);
      }
      permissions.push("Delete Movies");
    }

    if (updateMovies) {
      if (
        permissions.find((permission) => permission === "View Movies") !==
        "View Movies"
      ) {
        permissions.push("View Movies");
        setViewMovies(!viewMovies);
      }
      permissions.push("Update Movies");
    }

    setUser((user.permissions = permissions));

    const resp = await fetch(`${urlUsers}/${userId.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    window.location.href = "http://localhost:5173/manageUsers";
  };

  return (
    <>
      <h3>
        Edit User: {user.firstName} {user.lastName}
      </h3>
      <Box maxWidth="350px">
        <Card>
          <Text size="3">
            <b>First Name:</b>
            <TextField.Root
              placeholder="First Name"
              defaultValue={user.firstName}
              onInput={(e) => setUser({ ...user, firstName: e.target.value })}
            ></TextField.Root>
            <b>Last Name: </b>
            <TextField.Root
              placeholder="Last Name"
              defaultValue={user.lastName}
              onInput={(e) => setUser({ ...user, lastName: e.target.value })}
            ></TextField.Root>
            <b>User Name: </b>
            <TextField.Root
              placeholder="User Name"
              defaultValue={user.userName}
              onInput={(e) => setUser({ ...user, userName: e.target.value })}
            ></TextField.Root>
            <b>Session Time Out (Minutes): </b>
            <TextField.Root
              type="number"
              placeholder="Session Time Out"
              defaultValue={user.sessionTimeOut}
              onInput={(e) =>
                setUser({ ...user, sessionTimeOut: e.target.value })
              }
            ></TextField.Root>
            <b>Created data: </b> <br /> {user.createdDate} <br />
            <b>Permissions: </b>
          </Text>

          <CheckboxGroup.Root>
            <CheckboxGroup.Item
              checked={viewSubscriptions}
              onClick={() => setViewSubscriptions(!viewSubscriptions)}
              value="viewSubscriptions"
            >
              View Subscriptions
            </CheckboxGroup.Item>
            <CheckboxGroup.Item
              checked={createSubscriptions}
              onClick={() => setCreateSubscriptions(!createSubscriptions)}
              value="createSubscriptions"
            >
              Create Subscriptions
            </CheckboxGroup.Item>
            <CheckboxGroup.Item
              checked={deleteSubscriptions}
              onClick={() => setDeleteSubscriptions(!deleteSubscriptions)}
              value="deleteSubscriptions"
            >
              Delete Subscriptions
            </CheckboxGroup.Item>
            <CheckboxGroup.Item
              checked={updateSubscriptions}
              onClick={() => setUpdateSubscriptions(!updateSubscriptions)}
              value="updateSubscriptions"
            >
              Update Subscriptions
            </CheckboxGroup.Item>
            <CheckboxGroup.Item
              checked={viewMovies}
              onClick={() => setViewMovies(!viewMovies)}
              value="viewMovies"
            >
              View Movies
            </CheckboxGroup.Item>
            <CheckboxGroup.Item
              checked={createMovies}
              onClick={() => setCreateMovies(!createMovies)}
              value="createMovies"
            >
              Create Movies
            </CheckboxGroup.Item>
            <CheckboxGroup.Item
              checked={deleteMovies}
              onClick={() => setDeleteMovies(!deleteMovies)}
              value="deleteMovies"
            >
              Delete Movies
            </CheckboxGroup.Item>
            <CheckboxGroup.Item
              checked={updateMovies}
              onClick={() => setUpdateMovies(!updateMovies)}
              value="updateMovies"
            >
              Update Movies
            </CheckboxGroup.Item>
          </CheckboxGroup.Root>
          <Flex gap="1" mt="2">
            <Button type="submit" onClick={update}>
              update
            </Button>
            <Button type="submit" onClick={() => navigate(`/manageUsers`)}>
              cancel
            </Button>
          </Flex>
        </Card>
      </Box>
    </>
  );
}

export default editUser;
