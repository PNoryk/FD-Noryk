import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    {
      id: 0,
      lastName: "Иванов",
      firstName: "Иван",
      sureName: "Иванович",
      balance: 200,
    },
    {
      id: 1,
      lastName: "Сидоров",
      firstName: "Сидор",
      sureName: "Сидорович",
      balance: 250,
    },
    {
      id: 2,
      lastName: "Петров",
      firstName: "Пётр",
      sureName: "Петрович",
      balance: 180,
    },
    {
      id: 3,
      lastName: "Григорьев",
      firstName: "Григорий",
      sureName: "Григорьевич",
      balance: -220,
    },
  ],
};

export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    add: (state, action) => {
      let newId = Math.max(Math.max(...state.data.map(({ id }) => id)), -1) + 1;
      state.data.push({ ...action.payload, id: newId });
    },
    edit: (state, action) => {
      let elementToAdd = action.payload;
      state.data = state.data.map((el) =>
        el.id === elementToAdd.id ? elementToAdd : el
      );
    },
    remove: (state, action) => {
      state.data = state.data.filter(({ id }) => id !== action.payload);
    },
  },
});

export const { add, edit, remove } = clientsSlice.actions;

export default clientsSlice.reducer;
