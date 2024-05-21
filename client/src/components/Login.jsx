import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const loginUrl = "http://localhost:4000/auth/login";

function Login() {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const Login = async () => {
    const resp = await fetch(loginUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await resp.json();
console.log(data.user)
    dispatch({ type: "User_Online", payload: data.user });
    sessionStorage["accessToken"] = data.accessToken;
    navigator("/main");
  };

  return (
    <div>
      <h3>Log in Page</h3>
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
      <button onClick={Login}>Login</button>
      <br />
      New User ? : <Link to="/createAccount">Create Account</Link>
    </div>
  );
}

export default Login;
