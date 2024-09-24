import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

function User(props) {
  const navigate = useNavigate();

  const deleteUser = async () => {
    const urlUsers = "http://localhost:4000/users";

    const resp = await fetch(`${urlUsers}/${props.user.id}`, {
      method: "DELETE",
    });

    navigate("/allUsers");
  };

  return (
    <Box maxWidth="400px" mb="2">
      <Card>
        <Flex gap="3" justify="between">
          <Text size="3">
            <b>Name: </b>
            {props.user.firstName} {props.user.lastName}
            <br />
            <b>User Name: </b>
            {props.user.userName}
            <br />
            <b>Session time out (Minutes): </b>
            {props.user.sessionTimeOut}
            <br />
            <b>Created data: </b>
            {props.user.createdDate}
            <br />
            <b>Permissions: </b>
            {props.user.permissions.join(", ")}
          </Text>
          <Flex gap="1">
            <Button onClick={() => navigate(`/editUser/${props.user.id}`)}>
              Edit
            </Button>
            <Button color="red" onClick={deleteUser}>
              Delete
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
}

export default User;
