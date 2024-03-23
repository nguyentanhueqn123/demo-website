import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import hotelReducer from "./hotelSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    hotel: hotelReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
