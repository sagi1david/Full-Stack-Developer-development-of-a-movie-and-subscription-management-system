import { Button, Flex } from "@radix-ui/themes";
import { useState } from "react";
import AddUser from "./addUser";
import AllUsers from "./allUsers";

function manageUsers() {
  const [visibleAllUsers, setVisibleAllUsers] = useState(true);
  const [visibleAddUser, setVisibleAddUser] = useState(false);

  return (
    <>
      <h3>Users</h3>

      <Flex gap="1" mb="3">
        <Button
          onClick={() => {
            setVisibleAllUsers(!visibleAllUsers);
            if (visibleAddUser) setVisibleAddUser(!visibleAddUser);
          }}
        >
          All Users
        </Button>
        <Button
          onClick={() => {
            setVisibleAddUser(!visibleAddUser);
            if (visibleAllUsers) setVisibleAllUsers(!visibleAllUsers);
          }}
        >
          Add User
        </Button>
      </Flex>

      <br />
      {visibleAllUsers && <AllUsers setVisibleAllUsers={setVisibleAllUsers} />}
      {visibleAddUser && (
        <AddUser
          setVisibleAddUser={setVisibleAddUser}
          visibleAddUser={visibleAddUser}
          setVisibleAllUsers={setVisibleAllUsers}
          visibleAllUsers={visibleAllUsers}
        />
      )}
    </>
  );
}

export default manageUsers;
