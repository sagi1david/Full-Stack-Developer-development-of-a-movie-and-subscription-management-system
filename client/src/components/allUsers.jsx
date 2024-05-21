import { useSelector } from "react-redux";
import User from "./user";

function AllUsers(props) {
  const users = useSelector((state) => state.users);

  return (
    <div>
      {users.map((user) => (
        <User
          user={user}
          key={user.id}
          setVisibleEditUser={props.setVisibleEditUser}
          visibleEditUser={props.visibleEditUser}
          setVisibleAllUsers={props.setVisibleAllUsers}
        />
      ))}
    </div>
  );
}

export default AllUsers;
