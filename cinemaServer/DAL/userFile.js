const jf = require("jsonfile");

const file = "Data/users.json";

// read from a json file
const getUsers = () => {
  return jf.readFile(file);
};

// write to a json file
const setUsers =  (data) => {
   jf.writeFileSync(file, data );
  return "ok";
};

module.exports = { getUsers, setUsers };
