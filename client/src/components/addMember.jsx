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
    <div>
      <h3>Add new Member</h3>
      Name:
      <input
        type="text"
        onInput={(e) => setMember({ ...member, name: e.target.value })}
        placeholder="Name"
      />
      <br />
      Email:
      <input
        type="text"
        onInput={(e) => setMember({ ...member, email: e.target.value })}
        placeholder="Email"
      />
      <br />
      City:
      <input
        type="text"
        onInput={(e) => setMember({ ...member, city: e.target.value })}
        placeholder="City"
      />
      <br />
      <button type="submit" onClick={addMember}>
        Save
      </button>
      <button
        type="submit"
        onClick={() => props.setVisibleAddMember(!props.visibleAddMember)}
      >
        Cancel
      </button>
    </div>
  );
}

export default addMovie;
