import { Box, Button, Card, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const urlMembers = "http://localhost:4000/members";

function editMember() {
  const navigate = useNavigate();
  const members = useSelector((state) => state.members);
  const memberId = useParams();

  const member = members.find((member) => {
    return member._id === memberId.memberId;
  });

  const [mem, setMember] = useState({
    id: member._id,
    name: member.name,
    email: member.email,
    city: member.city,
  });

  const update = async () => {
    const resp = await fetch(`${urlMembers}/${member._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mem),
    });

    window.location.href = "http://localhost:5173/subscriptions";
  };

  return (
    <>
      <h3>Edit Member: {member.name}</h3>
      <Box maxWidth="400px">
        <Card>
          <Text size="3">
            <b>Name: </b>
            <TextField.Root placeholder="Name" defaultValue={member.name}>
              <TextField.Slot
                onInput={(e) => setMember({ ...mem, name: e.target.value })}
              ></TextField.Slot>
            </TextField.Root>
            <b>Email: </b>
            <TextField.Root placeholder="Email" defaultValue={member.email}>
              <TextField.Slot
                onInput={(e) => setMember({ ...mem, email: e.target.value })}
              ></TextField.Slot>
            </TextField.Root>
            <b>City: </b>
            <TextField.Root placeholder="City" defaultValue={member.city}>
              <TextField.Slot
                onInput={(e) => setMember({ ...mem, city: e.target.value })}
              ></TextField.Slot>
            </TextField.Root>
          </Text>
          <Flex gap="1" mt="2">
            <Button type="submit" onClick={update}>
              update
            </Button>
            <Button type="submit" onClick={() => navigate("/subscriptions")}>
              cancel
            </Button>
          </Flex>
        </Card>
      </Box>
    </>
  );
}

export default editMember;
