import { createSlice } from "@reduxjs/toolkit";
import { reservationForecastData } from "../data/ReservationForecastData";

const reservationForecastSlice = createSlice({
  name: "reservationForecast",
  initialState: reservationForecastData,
  reducers: {
    getForecast: (state, action) => {
      //   state.push(action.payload);
      console.log(action);
    },
  },
});
export const { getForecast } = reservationForecastSlice.actions;
export default reservationForecastSlice.reducer;
