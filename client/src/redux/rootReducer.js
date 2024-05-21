const initialState = {
  userOnline: {},
  movie: {},
  member: {},
  user: {},
  movies: [],
  members: [],
  users: [],
  subscriptions: [],
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "Laod_Movies": {
      return { ...state, movies: action.payload };
    }

    case "Laod_Members": {
      return { ...state, members: action.payload };
    }

    case "Laod_Users": {
      return { ...state, users: action.payload };
    }

    case "Laod_Subscriptions": {
      return { ...state, subscriptions: action.payload };
    }

    case "Send_Movie": {
      return { ...state, movie: action.payload };
    }

    case "Send_Member": {
      return { ...state, member: action.payload };
    }

    case "Send_User": {
      return { ...state, user: action.payload };
    }

    case "User_Online": {
      console.log(action.payload)
      return { ...state, userOnline: action.payload };
    }

    default:
      return state;
  }
};

export default Reducer;
