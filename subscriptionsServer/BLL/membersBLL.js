const membersDAL = require("../DAL/membersDAL");
const membersWS = require("../DAL/membersWS");

// Load members data to DB
const membersLoadData = async () => {
  const members = await membersDAL.getAllMembers();

  if (members.length === 0) {
    const { data: members } = await membersWS.getAllMembers();

    members.forEach((member) => {
      const obj = {
        name: member.name,
        email: member.email,
        city: member.address.city,
      };

      membersDAL.addMember(obj);
    });
  }
};

module.exports = {
  membersLoadData, 
};
