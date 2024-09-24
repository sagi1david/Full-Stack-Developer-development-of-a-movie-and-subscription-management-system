import { useSelector } from "react-redux";
import User from "./user";

function AllUsers() {
  const users = useSelector((state) => state.users);

  return (
    <div>
      {users.slice(1).map((user) => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}

export default AllUsers;
