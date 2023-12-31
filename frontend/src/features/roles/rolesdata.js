import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userid:"",
    role:"",
 
};

export const rolesdata = createSlice({
  name: "rolesdata",
  initialState,
  reducers: {
    rolesstore: (state, action) => {
      state.userid=action.payload.teacherid;
      state.role=action.payload.role;
    },
    
  
  },
});

// Action creators are generated for each case reducer function
export const {rolesstore} =
  rolesdata.actions;

export default rolesdata.reducer;
