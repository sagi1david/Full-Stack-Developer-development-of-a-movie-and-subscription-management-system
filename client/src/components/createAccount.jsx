import { useState } from "react";
import { useNavigate } from "react-router-dom";

const loginUrl = "http://localhost:4000/auth/create";

function CreateAccount() {
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const Create = async () => {
    const { data } = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    setMessage(data);

    console.log(data);
  };

  return (
    <div>
      <h3>Create an Account</h3>
      <h4>{message}</h4>
      User name:{" "}
      <input
        type="text"
        onInput={(e) => setUser({ ...user, username: e.target.value })}
      />
      <br />
      Password:{" "}
      <input
        type="password"
        onInput={(e) => setUser({ ...user, password: e.target.value })}
      />
      <br />
      <button onClick={Create}>Create</button>
      <br />
    </div>
  );
}

export default CreateAccount;
