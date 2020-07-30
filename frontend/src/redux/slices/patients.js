import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patientList: [],
  index: -1,
  data: {},
};

const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setPatientList(state, action) {
      state.patientList = action.payload;
    },
    setIndex(state, action) {
      state.index = action.payload;
    },
    setData(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setPatientList, setIndex, setData } = patientsSlice.actions;

export default patientsSlice.reducer;
