import { Box, Button, Card, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const loginUrl = "http://localhost:4000/auth/login";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const users = useSelector((state) => state.users);

  const u = users.find((u) => {
    return u.userName === user?.username;
  });

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

  const canUserConnect = (username) => {
    const userData = getUserData(username);

    if (!userData) return true;

    const { lastConnection, connectionTime } = userData;
    const now = new Date();
    const currentDate = now.toISOString().split("T")[0];
    const lastConnectionDate = new Date(userData.lastConnection)
      .toISOString()
      .split("T")[0];

    if (currentDate !== lastConnectionDate) {
      const userSessionTimeOut = u.sessionTimeOut;

      updateUserConnection(username, userSessionTimeOut.sessionTimeOut * 60000);

      return true;
    }

    if (connectionTime <= 0) return false;

    return true;
  };

  const Login = async () => {
    try {
      if (canUserConnect(user?.username)) {
        const resp = await fetch(loginUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });

        if (!resp.ok) alert(await resp.text());

        const data = await resp.json();
        if (data.user.id !== undefined) {
          localStorage.setItem("userOnline", data.user.id);
          sessionStorage["accessToken"] = data.accessToken;

          const userSessionTimeOut = u.sessionTimeOut;

          const userData = getUserData(user.username);

          const remainingTime = userData !== null
            ? userData.connectionTime
            : userSessionTimeOut * 60000;

            console.log(user.username)

          updateUserConnection(user.username, remainingTime);

          window.location.href = "http://localhost:5173/main";
        } else alert(data);
      } else {
        alert(
          `The time that the user ${user.username} can be logged in has expired, after midnight it will be possible to log in again.`
        );
      }
    } catch (error) {}
  };

  return (
    <>
      <h3>Login Page</h3>
      <Box maxWidth="350px">
        <Card>
          <Text>
            <b>User name: </b>
            <TextField.Root
              placeholder="User name"
              onInput={(e) => setUser({ ...user, username: e.target.value })}
            >
              <TextField.Slot></TextField.Slot>
            </TextField.Root>
            <b>Password: </b>
            <TextField.Root
              type="password"
              placeholder="Password"
              onInput={(e) => setUser({ ...user, password: e.target.value })}
            >
              <TextField.Slot></TextField.Slot>
            </TextField.Root>
          </Text>
          <Flex mt="2">
            <Button onClick={Login}>Login</Button>
          </Flex>
        </Card>
      </Box>
      <Box>
        <Flex mt="2">
          <Text size="3">
            <b>New User ?: </b>
            <Link color="none" to="/createAccount">
              Create Account
            </Link>
          </Text>
        </Flex>
      </Box>
    </>
  );
}

export default Login;
