import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentD: [],
};

export const StudentSlice = createSlice({
  name: "Student",
  initialState,
  reducers: {
    StudentData: (state, action) => {
  
    //    console.log(action.payload);
      const { id, name, physics, chemistry, math, percentage } = action.payload;

      state.studentD.push({
        id: id,
        name: name,
        physics: physics,
        chemistry: chemistry,
        math: math,
        percentage: percentage,
      });
    },
    DeleteStudent: (state, action) => {
      //    console.log(action.payload);
      const id = action.payload;
      state.studentD = state.studentD.filter((item) => item.id !== id);
    },
    EditStudent: (state, action) => {
      const { id, name, math, physics, chemistry, percentage } = action.payload;

      const StuIndex = state.studentD.findIndex((item) => item.id === id);

      //console.log(studentIndex);

      if (StuIndex >= 0) {
        state.studentD[StuIndex] = {
          ...state.studentD[StuIndex],
          name: name,
          math: math,
          physics: physics,
          chemistry: chemistry,
          percentage: percentage,
        };
      }
    },
  },
});


export const { StudentData, DeleteStudent, EditStudent } = StudentSlice.actions;

export default StudentSlice.reducer;
