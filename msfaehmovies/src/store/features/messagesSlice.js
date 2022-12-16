import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  messages: [],
  showMessages: false,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage(state, payload) {
      state.showMessages = true;
      state.messages.push(payload);
    },
    showMessages(state) {
      state.messages.forEach((message) => {
        toast.error(message.text);
      });
      state.showMessages = false;
      state.messages = [];
    },
  },
});

export default messagesSlice.reducer;
export const { addMessage, showMessages } = messagesSlice.actions;

export const getShowMessages = (store) => store.messages.showMessages;
