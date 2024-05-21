const userDAL = require("../DAL/userDAL");
const permissionsFile = require("../DAL/permissionsFile");
const userFile = require("../DAL/userFile");

//Get all users Data
const getAllUsersData = async () => {
  const users = await userDAL.getAllUsers();
  const usersData = await userFile.getUsers();
  const usersPermissions = await permissionsFile.getPermissions();

  const allUsersData = [];

  users.splice(1).map((user) => {
    const userData = usersData.find((userData) => userData.id === user.id);

    const userPermissions = usersPermissions.find(
      (userPermissions) => userPermissions.id === user.id
    );

    const allUserData = {
      id: user._id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      userName: user.userName,
      createdDate: userData.createdDate,
      sessionTimeOut: userData.sessionTimeOut,
      permissions: userPermissions.permissions,
    };

    allUsersData.push(allUserData);
  });

  return allUsersData;
};

//Get all user data by id
const getAllUserDataById = async (id) => {
  const user = await userDAL.getUserById(id);
  const usersData = await userFile.getUsers();
  const usersPermissions = await permissionsFile.getPermissions();

  const userData = usersData.find((userData) => userData.id === id);

  const userPermissions = usersPermissions.find(
    (userPermissions) => userPermissions.id === id
  );

  const allUserData = {
    id: id,
    firstName: userData.firstName,
    lastName: userData.lastName,
    userName: user.userName,
    createdDate: userData.createdDate,
    sessionTimeOut: userData.sessionTimeOut,
    permissions: userPermissions.permissions,
  };

  return allUserData;
};

//Create a new user
const createNewUser = async (obj) => {
  const date = new Date().toLocaleDateString();
  const user = { id: obj.id, userName: obj.userName };

  const userId = await userDAL.addUser(user);

  const userData = {
    id: userId,
    firstName: obj.firstName,
    lastName: obj.lastName,
    createdDate: date,
    sessionTimeOut: obj.sessionTimeOut,
  };
  const userPermissions = { id: userId, permissions: obj.permissions };

  const usersData = await userFile.getUsers();
  const usersPermissions = await permissionsFile.getPermissions();

  usersData.push(userData);
  usersPermissions.push(userPermissions);

  userFile.setUsers(usersData);
  permissionsFile.setPermissions(usersPermissions);

  return "Created!";
};

//Update a user
const updateUser = async (id, obj) => {
  const user = { id: id, userName: obj.userName };

  await userDAL.updateUser(id, user);

  const userData = {
    id: id,
    firstName: obj.firstName,
    lastName: obj.lastName,
    createdDate: obj.createdDate,
    sessionTimeOut: obj.sessionTimeOut,
  };
  const userPermissions = { id: id, permissions: obj.permissions };

  const usersData = await userFile.getUsers();
  const usersPermissions = await permissionsFile.getPermissions();

  const indexUserData = usersData.findIndex((userData) => userData.id === id);

  const indexUserPermissions = usersPermissions.findIndex(
    (userPermissions) => userPermissions.id === id
  );

  const arrayUsersData = usersData.slice(0, indexUserData);
  arrayUsersData.push(userData);

  if (usersData.length > indexUserData + 1)
    arrayUsersData.push(usersData.slice(indexUserData + 1));

  const arrayUsersPermissions = usersPermissions.slice(0, indexUserPermissions);
  arrayUsersPermissions.push(userPermissions);

  if (usersPermissions.length > indexUserPermissions + 1)
    arrayUsersPermissions.push(
      usersPermissions.slice(indexUserPermissions + 1)
    );

    console.log(arrayUsersData)
    console.log(arrayUsersPermissions)

  //userFile.setUsers(arrayUsersData);
  //permissionsFile.setPermissions(arrayUsersPermissions);

  return "Updated!";
};

//Delete a user
const deleteUser = async (id) => {
  await userDAL.deleteUser(id);

  const usersData = await userFile.getUsers();
  const usersPermissions = await permissionsFile.getPermissions();

  const indexUserData = usersData.findIndex((userData) => userData.id === id);

  const indexUserPermissions = usersPermissions.findIndex(
    (userPermissions) => userPermissions.id === id
  );

  const arrayUsersData = usersData.slice(0, indexUserData);

  if (usersData.length > indexUserData + 1)
    arrayUsersData.push(usersData.slice(indexUserData + 1));

  const arrayUsersPermissions = usersPermissions.slice(0, indexUserPermissions);

  if (usersPermissions.length > indexUserPermissions + 1)
    arrayUsersPermissions.push(
      usersPermissions.slice(indexUserPermissions + 1)
    );

  userFile.setUsers(arrayUsersData);
  permissionsFile.setPermissions(arrayUsersPermissions);

  return "Deleted!";
};

module.exports = {
  getAllUsersData,
  getAllUserDataById,
  createNewUser,
  updateUser,
  deleteUser,
};
