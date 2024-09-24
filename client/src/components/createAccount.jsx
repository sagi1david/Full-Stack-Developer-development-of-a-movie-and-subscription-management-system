import { Box, Button, Card, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const createUrl = "http://localhost:4000/auth/create";

function CreateAccount() {
  const navigator = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const Create = async () => {
    try {
      const resp = await fetch(
        `http://localhost:4000/auth/create?userName=${user.username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (!resp.ok) {
        alert(await resp.text());
      }

      navigator("/login");
    } catch (error) {}
  };

  return (
    <>
      <h3>Create an Account</h3>
      <Box maxWidth="350px">
        <Card>
          <Text size="3">
            <b>User name: </b>
            <TextField.Root
              placeholder="User name"
              onInput={(e) => setUser({ ...user, username: e.target.value })}
            ></TextField.Root>
            <b>Password: </b>
            <TextField.Root
              type="password"
              placeholder="Password"
              onInput={(e) => setUser({ ...user, password: e.target.value })}
            ></TextField.Root>
          </Text>
          <Flex mt="2">
            <Button onClick={Create}>Create</Button>
          </Flex>
        </Card>
      </Box>
    </>
  );
}

export default CreateAccount;
