import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import hotelReducer from "./hotelSlice";
import reservationForecastReducer from "./reservationForecastSlice";
import periodDetailReducer from "./periodDetailSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    hotel: hotelReducer,
    reservationForecast: reservationForecastReducer,
    periodDetail: periodDetailReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
