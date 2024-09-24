import { Box, Button, Card, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";

function addMovie(props) {
  const urlMembers = "http://localhost:4000/members";

  const [member, setMember] = useState({
    name: "",
    email: "",
    city: "",
  });

  const addMember = async () => {
    const resp1 = await fetch(urlMembers, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member),
    });

    props.setVisibleAddMember(!props.visibleAddMember);
    props.setVisibleAllMembers(!props.visibleAllMembers);
  };

  return (
    <>
      <h3>Add new Member</h3>
      <Box maxWidth="350px">
        <Card>
          <Text size="3">
            <b>Name: </b>
            <TextField.Root placeholder="Name">
              <TextField.Slot
                onInput={(e) => setMember({ ...member, name: e.target.value })}
              ></TextField.Slot>
            </TextField.Root>
            <b>Email: </b>
            <TextField.Root placeholder="Email">
              <TextField.Slot
                onInput={(e) => setMember({ ...member, email: e.target.value })}
              ></TextField.Slot>
            </TextField.Root>
            <b>City: </b>
            <TextField.Root placeholder="City">
              <TextField.Slot
                onInput={(e) => setMember({ ...member, city: e.target.value })}
              ></TextField.Slot>
            </TextField.Root>
          </Text>
          <br />
          <Flex gap="1">
            <Button type="submit" onClick={addMember}>
              Save
            </Button>
            <Button
              type="submit"
              onClick={() => props.setVisibleAddMember(!props.visibleAddMember)}
            >
              Cancel
            </Button>
          </Flex>
        </Card>
      </Box>
    </>
  );
}

export default addMovie;
