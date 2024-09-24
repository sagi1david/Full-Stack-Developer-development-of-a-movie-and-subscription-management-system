import {
  Box,
  Button,
  Card,
  CheckboxGroup,
  Flex,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";

const urlUsers = "http://localhost:4000/users";

function addUser(props) {
  const [user, setUser] = useState({});

  const [viewSubscriptions, setViewSubscriptions] = useState(false);
  const [createSubscriptions, setCreateSubscriptions] = useState(false);
  const [deleteSubscriptions, setDeleteSubscriptions] = useState(false);
  const [updateSubscriptions, setUpdateSubscriptions] = useState(false);
  const [viewMovies, setViewMovies] = useState(false);
  const [createMovies, setCreateMovies] = useState(false);
  const [deleteMovies, setDeleteMovies] = useState(false);
  const [updateMovies, setUpdateMovies] = useState(false);

  const addUser = async () => {
    const permissions = [];

    if (
      viewSubscriptions &&
      !createSubscriptions &&
      !deleteSubscriptions &&
      !updateSubscriptions
    )
      permissions.push("View Subscriptions");

    if (createSubscriptions) {
      if (
        permissions.find(
          (permission) => permission === "View Subscriptions"
        ) !== -1
      ) {
        permissions.push("View Subscriptions");
      }
      permissions.push("Create Subscriptions");
      if (!viewSubscriptions) setViewSubscriptions(!viewSubscriptions);
    }

    if (deleteSubscriptions) {
      if (
        permissions.find(
          (permission) => permission === "View Subscriptions"
        ) !== -1
      )
        permissions.push("View Subscriptions");
      permissions.push("Delete Subscriptions");
      if (!viewSubscriptions) setViewSubscriptions(!viewSubscriptions);
    }

    if (updateSubscriptions) {
      if (
        permissions.find(
          (permission) => permission === "View Subscriptions"
        ) !== -1
      )
        permissions.push("View Subscriptions");
      permissions.push("Update Subscriptions");
      if (!viewSubscriptions) setViewSubscriptions(!viewSubscriptions);
    }

    if (viewMovies && !createMovies && !deleteMovies && !updateMovies)
      permissions.push("View Movies");

    if (createMovies) {
      if (permissions.find((permission) => permission === "View Movies") !== -1)
        permissions.push("View Movies");
      permissions.push("Create Movies");
      if (!viewMovies) setViewMovies(!viewMovies);
    }

    if (deleteMovies) {
      if (permissions.find((permission) => permission === "View Movies") !== -1)
        permissions.push("View Movies");
      permissions.push("Delete Movies");
      if (!viewMovies) setViewMovies(!viewMovies);
    }

    if (updateMovies) {
      if (permissions.find((permission) => permission === "View Movies") !== -1)
        permissions.push("View Movies");
      permissions.push("Update Movies");
      if (!viewMovies) setViewMovies(!viewMovies);
    }

    setUser((user.permissions = permissions));

    const resp1 = await fetch(urlUsers, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    props.setVisibleAddUser(!props.visibleAddUser);
    props.setVisibleAllUsers(!props.visibleAllUsers);

    useState({
      firstName: "",
      lastName: "",
      userName: "",
      createdDate: "",
      sessionTimeOut: 0,
      permissions: [],
    });
  };

  return (
    <>
      <h3>Add New User</h3>
      <Box maxWidth="350px">
        <Card>
          <Text size="3">
            <b>First Name:</b>
            <TextField.Root
              placeholder="First Name"
              onInput={(e) => setUser({ ...user, firstName: e.target.value })}
            ></TextField.Root>
            <b>Last Name: </b>
            <TextField.Root
              placeholder="Last Name"
              onInput={(e) => setUser({ ...user, lastName: e.target.value })}
            ></TextField.Root>
            <b>User Name: </b>
            <TextField.Root
              placeholder="User Name"
              onInput={(e) => setUser({ ...user, userName: e.target.value })}
            ></TextField.Root>
            <b>Session Time Out (Minutes): </b>
            <TextField.Root
              type="number"
              placeholder="Session Time Out"
              onChange={(e) =>
                setUser({ ...user, sessionTimeOut: e.target.value })
              }
            ></TextField.Root>
            <b>Permissions: </b>
          </Text>

          <CheckboxGroup.Root>
            <CheckboxGroup.Item
              onClick={() => setViewSubscriptions(!viewSubscriptions)}
              value="viewSubscriptions"
            >
              View Subscriptions
            </CheckboxGroup.Item>
            <CheckboxGroup.Item
              onClick={() => setCreateSubscriptions(!createSubscriptions)}
              value="createSubscriptions"
            >
              Create Subscriptions
            </CheckboxGroup.Item>
            <CheckboxGroup.Item
              onClick={() => setDeleteSubscriptions(!deleteSubscriptions)}
              value="deleteSubscriptions"
            >
              Delete Subscriptions
            </CheckboxGroup.Item>
            <CheckboxGroup.Item
              onClick={() => setUpdateSubscriptions(!updateSubscriptions)}
              value="updateSubscriptions"
            >
              Update Subscriptions
            </CheckboxGroup.Item>
            <CheckboxGroup.Item
              onClick={() => setViewMovies(!viewMovies)}
              value="viewMovies"
            >
              View Movies
            </CheckboxGroup.Item>
            <CheckboxGroup.Item
              onClick={() => setCreateMovies(!createMovies)}
              value="createMovies"
            >
              Create Movies
            </CheckboxGroup.Item>
            <CheckboxGroup.Item
              onClick={() => setDeleteMovies(!deleteMovies)}
              value="deleteMovies"
            >
              Delete Movies
            </CheckboxGroup.Item>
            <CheckboxGroup.Item
              onClick={() => setUpdateMovies(!updateMovies)}
              value="updateMovies"
            >
              Update Movies
            </CheckboxGroup.Item>
          </CheckboxGroup.Root>
          <Flex gap="1" mt="2">
            <Button type="submit" onClick={addUser}>
              save
            </Button>
            <Button
              type="submit"
              onClick={() => {
                props.setVisibleAddUser(!props.visibleAddUser),
                  props.setVisibleAllUsers(!props.visibleAllUsers);
              }}
            >
              cancel
            </Button>
          </Flex>
        </Card>
      </Box>
    </>
  );
}

export default addUser;
