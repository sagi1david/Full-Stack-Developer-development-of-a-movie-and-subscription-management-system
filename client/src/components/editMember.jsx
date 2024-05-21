import { useState } from "react";
import { useSelector } from "react-redux";

function editMember(props) {
  const member = useSelector((state) => state.member);

  const [mem, setMember] = useState({
    id: member._id,
    name: member.name,
    email: member.email,
    city: member.city,
  });

  const update = async () => {
    const urlMembers = "http://localhost:4000/members";

    const resp = await fetch(`${urlMembers}/${member._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mem),
    });

    props.setVisibleEditMember(!props.visibleEditMember);
  };

  return (
    <div>
      <h3>Edit Member: {member.name}</h3>
      Name:
      <input
        type="text"
        defaultValue={member.name}
        onInput={(e) => setMember({ ...mem, name: e.target.value })}
      />
      <br />
      Email:
      <input
        type="text"
        defaultValue={member.email}
        onInput={(e) => setMember({ ...mem, email: e.target.value })}
      />
      <br />
      City
      <input
        type="text"
        defaultValue={member.city}
        onInput={(e) => setMember({ ...mem, city: e.target.value })}
      />
      <br />
      <button type="submit" onClick={update}>
        update
      </button>
      <button
        type="submit"
        onClick={() => props.setVisibleEditMember(!props.visibleEditMember)}
      >
        cancel
      </button>
    </div>
  );
}

export default editMember;
