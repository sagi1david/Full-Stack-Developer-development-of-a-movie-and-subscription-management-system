import { useEffect, useState } from "react";
import AllMembers from "./allMembers";
import AddMember from "./addMember";
import EditMember from "./editMember";
import { useDispatch, useSelector } from "react-redux";

const urlMembers = "http://localhost:4000/members";

function movies() {
  const userOnline = useSelector((state) => state.userOnline);

  const [visibleAddMemberButton, setVisibleAddMemberButton] = useState(true);
  const [visibleAllMembersButton, setVisibleAllMembersButton] = useState(true);
  const [visibleAllMembers, setVisibleAllMembers] = useState(true);
  const [visibleAddMember, setVisibleAddMember] = useState(true);
  const [visibleEditMember, setVisibleEditMember] = useState(true);

  const accessToken = sessionStorage["accessToken"];

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      userOnline.permissions.forEach((permission) => {
        if (permission === "Create Subscriptions")
          setVisibleAddMemberButton(false);
        if (permission === "View Subscriptions")
          setVisibleAllMembersButton(false);
      });

      const resp = await fetch(urlMembers, {
        method: "GET",
        headers: {
          "x-access-token": accessToken,
        },
      });

      const data = await resp.json();

      dispatch({ type: "Laod_Members", payload: data.members });
    };
    fetchData();
  }, [visibleAllMembers, visibleAddMember, visibleEditMember]);

  return (
    <div>
      <h3>Subscriptions</h3>

      <div hidden={!visibleEditMember}>
        <button
          hidden={visibleAllMembersButton}
          onClick={() => {
            setVisibleAllMembers(!visibleAllMembers);
            if (!visibleAddMember) setVisibleAddMember(!visibleAddMember);
          }}
        >
          All Members
        </button>
        <button
          hidden={visibleAddMemberButton}
          onClick={() => {
            setVisibleAddMember(!visibleAddMember);
            if (!visibleAllMembers) setVisibleAllMembers(!visibleAllMembers);
          }}
        >
          Add Member
        </button>

        <div hidden={visibleAllMembers}>
          <AllMembers
            setVisibleEditMember={setVisibleEditMember}
            visibleEditMember={visibleEditMember}
            setVisibleAllMembers={setVisibleAllMembers}
          />
        </div>
        <div hidden={visibleAddMember}>
          <AddMember
            setVisibleAddMember={setVisibleAddMember}
            visibleAddMember={visibleAddMember}
            setVisibleAllMembers={setVisibleAllMembers}
            visibleAllMembers={visibleAllMembers}
          />
        </div>
      </div>
      <div hidden={visibleEditMember}>
        <EditMember
          setVisibleEditMember={setVisibleEditMember}
          visibleEditMember={visibleEditMember}
        />
      </div>
    </div>
  );
}

export default movies;
