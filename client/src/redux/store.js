import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import TourReducer from "./features/tourSlice";
import reactotron from "./config/ReactotronConfig";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    tour: TourReducer,
  },
  ...(process.env.NODE_ENV !== "production" && {
    enhancers: [reactotron.createEnhancer()],
  }),
});
