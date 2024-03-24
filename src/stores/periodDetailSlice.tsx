import { createSlice } from "@reduxjs/toolkit";
import { dashboardSampleV0_4MealDetailData } from "../data/sampledata_meal_detail";

const periodDetailSlice = createSlice({
  name: "periodDetail",
  initialState: dashboardSampleV0_4MealDetailData,
  reducers: {
    getPeriodDetail: (state, action) => {
      //   state.push(action.payload);
      console.log(action);
    },
  },
});
export const { getPeriodDetail } = periodDetailSlice.actions;
export default periodDetailSlice.reducer;
