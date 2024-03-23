import { createSlice } from "@reduxjs/toolkit";
import { hotelData } from "../data/hotelData";

const hotelSlice = createSlice({
  name: "hotel",
  initialState: hotelData,
  reducers: {
    getHotel: (state, action) => {
      //   state.push(action.payload);
      console.log(action);
    },
  },
});
export const { getHotel } = hotelSlice.actions;
export default hotelSlice.reducer;
