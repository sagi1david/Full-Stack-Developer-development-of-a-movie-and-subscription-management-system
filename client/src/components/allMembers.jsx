import { useSelector } from "react-redux";
import Member from "./member";

function AllMembers(props) {
  const members = useSelector((state) => state.members);

  return (
    <div>
      {props.memberId.memberId &&
        members
          .filter((member) => member._id.includes(props.memberId.memberId))
          .map((member) => (
            <Member
              member={member}
              key={member._id}
              setVisibleEditMember={props.setVisibleEditMember}
              visibleEditMember={props.visibleEditMember}
            />
          ))}
      {!props.memberId.memberId &&
        members.map((member) => (
          <Member
            member={member}
            key={member._id}
            setVisibleEditMember={props.setVisibleEditMember}
            visibleEditMember={props.visibleEditMember}
          />
        ))}
    </div>
  );
}

export default AllMembers;
