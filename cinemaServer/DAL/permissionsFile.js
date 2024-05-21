const jf = require("jsonfile");

const file = "Data/permissions.json";

// read from a json file
const getPermissions = () => {
  return jf.readFile(file);
};

// write to a json file
const setPermissions =  (data) => {
   jf.writeFileSync(file, data );
  return "ok";
};

module.exports = { getPermissions, setPermissions };
