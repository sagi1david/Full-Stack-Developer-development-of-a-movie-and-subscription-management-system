import { useSelector } from "react-redux";
import Member from "./member";

function AllMovies(props) {
  const members = useSelector((state) => state.members);

  return (
    <div>
      {members.map((member) => (
        <Member
          member={member}
          key={member._id}
          setVisibleEditMember={props.setVisibleEditMember}
          visibleEditMember={props.visibleEditMember}
          setVisibleAllMembers={props.setVisibleAllMembers}
        />
      ))}
    </div>
  );
}

export default AllMovies;
