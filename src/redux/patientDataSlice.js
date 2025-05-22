import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

const patientDataSlice = createSlice({
  name: 'patientData',
  initialState,
  reducers: {
    setPatientData: (state, action) => {
      state.data = action.payload;
    },
    clearPatientData: state => {
      state.data = null;
    },
  },
});

export const { setPatientData, clearPatientData } = patientDataSlice.actions;
export default patientDataSlice.reducer;
