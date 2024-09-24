import { Button, Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddMember from "./addMember";
import AllMembers from "./allMembers";
import { useParams } from "react-router-dom";

const userId = localStorage.getItem("userOnline");

function Subscriptions() {
  const [visibleAddMemberButton, setVisibleAddMemberButton] = useState(true);
  const [visibleAllMembers, setVisibleAllMembers] = useState(true);
  const [visibleAddMember, setVisibleAddMember] = useState(false);

  const users = useSelector((state) => state.users);
  const memberId = useParams();

  const userOnline = users.find((user) => {
    return user.id === userId;
  });

  useEffect(() => {
    const fetchData = async () => {
      if (userOnline != "undefined") {
        userOnline?.permissions.forEach((permission) => {
          if (permission === "Create Subscriptions")
            setVisibleAddMemberButton(false);
        });
      }
    };
    fetchData();
  }, [userOnline]);

  return (
    <>
      <h3>Subscriptions</h3>

      <Flex gap="1" mb="3">
        <Button
          onClick={() => {
            setVisibleAllMembers(!visibleAllMembers);
            if (visibleAddMember) setVisibleAddMember(!visibleAddMember);
          }}
        >
          All Members
        </Button>
        <div hidden={visibleAddMemberButton}>
          <Button
            onClick={() => {
              setVisibleAddMember(!visibleAddMember);
              if (visibleAllMembers) setVisibleAllMembers(!visibleAllMembers);
            }}
          >
            Add Member
          </Button>
        </div>
      </Flex>
      {visibleAllMembers && (
        <AllMembers memberId={memberId} />
      )}
      {visibleAddMember && (
        <AddMember
          setVisibleAddMember={setVisibleAddMember}
          visibleAddMember={visibleAddMember}
          setVisibleAllMembers={setVisibleAllMembers}
          visibleAllMembers={visibleAllMembers}
        />
      )}
    </>
  );
}

export default Subscriptions;
