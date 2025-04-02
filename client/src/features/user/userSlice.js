import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  username: "",
  displayName: "",
  avatar: "",
  friends: [],
  friendRequests: [],
  chats: [],
  chatCards: [],
};

// Add more reducers

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.displayName = action.payload.displayName;
      state.avatar = action.payload.avatar;
      state.friends = action.payload.friends || [];
      state.friendRequests = action.payload.friendRequests || [];
      state.chatCards = action.payload.chats || [];
    },
    setChatText: (state, action) => {
      state.chats = [...state.chats, action.payload];
    },
    setChatTextMsg: (state, action) => {
      const chat = state.chats.find((chat) => {
        // Check if every participant in action.payload.participants exists in chat.participants
        return action.payload.participants.every((participant) =>
          chat.participants.includes(participant)
        );
      });

      if (chat) {
        chat.messages.push(action.payload.msg);
      } else {
        state.chats.push({
          participants: action.payload.participants,
          messages: [action.payload.msg],
        });
      }
    },
    setFriends: (state, action) => {
      state.friends = [...action.payload];
    },
    setFriendRequests: (state, action) => {
      state.friendRequests = [...action.payload];
    },
    removeFriendRequest: (state, action) => {
      state.friendRequests = state.friendRequests.filter(
        (request) => request.username !== action.payload.username
      );
    },
    updateUserInfo: (state, action) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.displayName = action.payload.displayName;
      state.avatar = action.payload.avatar;
    },
  },
});

export const {
  setUserInfo,
  updateUserInfo,
  setFriendRequests,
  removeFriendRequest,
  setChatText,
  setChatTextMsg,
  setFriends,
} = userSlice.actions;

export default userSlice.reducer;
