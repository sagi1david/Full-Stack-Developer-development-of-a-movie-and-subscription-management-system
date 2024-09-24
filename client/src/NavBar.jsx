import { Container, Flex, TabNav, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { MdLocalMovies } from "react-icons/md";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const userId = localStorage.getItem("userOnline");

function NavBar() {
  const [visibleMovies, setVisibleMovies] = useState(false);
  const [visibleSubscriptions, setVisibleSubscriptions] = useState(false);
  const [visibleManageUsers, setVisibleManageUsers] = useState(false);
  const [login, setLogin] = useState(false);

  const users = useSelector((state) => state.users);
  const navigator = useNavigate();
  const location = useLocation();

  const userOnline = users.find((user) => {
    return user.id === userId;
  });

  useEffect(() => {
    const fetchData = async () => {
      if (userOnline !== undefined) {
        setLogin(true);
        userOnline.permissions?.forEach((permission) => {
          if (permission === "View Subscriptions")
            setVisibleSubscriptions(true);

          if (permission === "View Movies") setVisibleMovies(true);
        });
        if (userOnline.userName === "admin") setVisibleManageUsers(true);
      }
    };
    fetchData();
  }, [userOnline]);

  const getUserData = (username) => {
    return JSON.parse(localStorage.getItem(username));
  };

  const updateUserConnection = (username, remainingTime) => {
    const userData = {
      lastConnection: Date.now(),
      connectionTime: remainingTime,
    };
    localStorage.setItem(username, JSON.stringify(userData));
  };

  const userDisconnect = (username) => {
    const userData = getUserData(username);

    if (userData) {
      const remainingTime =
        userData.connectionTime - (Date.now() - userData.lastConnection);

      updateUserConnection(username, remainingTime);
      localStorage.setItem("userOnline", undefined);
    }
  };

  return (
    <nav>
      <Container>
        <Flex gap="1" justify="between">
          <TabNav.Root>
            <MdLocalMovies size="35" />
            {userOnline && (
              <Text mx="3" my="2" size="3">
                Hello {userOnline.firstName}
              </Text>
            )}
            {visibleMovies && (
              <TabNav.Link
                onClick={() => navigator("/movies")}
                active={location.pathname === "/movies"}
              >
                Movies
              </TabNav.Link>
            )}
            {visibleSubscriptions && (
              <TabNav.Link
                onClick={() => navigator("/subscriptions")}
                active={location.pathname === "/subscriptions"}
              >
                Subscriptions
              </TabNav.Link>
            )}
            {visibleManageUsers && (
              <TabNav.Link
                onClick={() => navigator("/manageUsers")}
                active={location.pathname === "/manageUsers"}
              >
                User Management
              </TabNav.Link>
            )}
          </TabNav.Root>

          <Flex>
            <TabNav.Root>
              {!login && (
                <TabNav.Link onClick={() => navigator("/")}>Login</TabNav.Link>
              )}
              {login && (
                <TabNav.Link
                  href="/"
                  onChange={userDisconnect(userOnline.userName)}
                >
                  Log Out
                </TabNav.Link>
              )}
            </TabNav.Root>
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
}

export default NavBar;
