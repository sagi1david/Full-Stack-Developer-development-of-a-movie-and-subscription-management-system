import { useDispatch } from "react-redux";

function User(props) {
  const dispatch = useDispatch();

  const deleteUser = async () => {
    const urlUsers = "http://localhost:4000/users";

    props.setVisibleAllUser(true)

    const resp = await fetch(`${urlUsers}/${props.user.id}`, {
      method: "DELETE",
    });

    props.setVisibleAllUser(false)
  };

  return (
    <div>
      Name: {props.user.firstName} {props.user.lastName}
      <br />
      User Name: {props.user.userName}
      <br />
      Session time out (Minutes): {props.user.sessionTimeOut}
      <br />
      Created data: {props.user.createdDate}
      <br />
      Permissions:{" "}
      {props.user.permissions.map((permission) => {
        return permission + ", ";
      })}
      <br />
      <br />
      <button
        onClick={() => {
          props.setVisibleEditUser(!props.visibleEditUser);
          dispatch({ type: "Send_User", payload: props.user });
        }}
      >
        Edit
      </button>
      <button onClick={deleteUser}>Delete</button>
      <br />
      <br />
    </div>
  );
}

export default User;
